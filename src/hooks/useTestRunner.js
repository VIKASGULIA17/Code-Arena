import { useState } from "react";
import { executeCode } from "../api/api";
import { driverCodeTemplate } from "../data/driverCode";
import axios from "axios";

export const useTestRunner = (problemId, Language, value, setOutput, setcurrentTopBar, testcaseData, problemMeta) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [firstFailedTestCase, setFirstFailedTestCase] = useState(null);
  
  const [executionStats, setExecutionStats] = useState({ time: "0", memory: "0" });

  // Parse backend input string "nums = [2,7,11,15], target = 9" → { nums: [...], target: 9 }
  const parseInputString = (inputStr) => {
    if (typeof inputStr !== "string") return inputStr; // already an object
    const result = {};
    let depth = 0;
    let current = "";
    const parts = [];

    for (let i = 0; i < inputStr.length; i++) {
      const ch = inputStr[i];
      if (ch === "[" || ch === "(" || ch === "{") depth++;
      else if (ch === "]" || ch === ")" || ch === "}") depth--;

      if (ch === "," && depth === 0) {
        parts.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    if (current.trim()) parts.push(current.trim());

    for (const part of parts) {
      const eqIdx = part.indexOf("=");
      if (eqIdx !== -1) {
        const key = part.slice(0, eqIdx).trim();
        const valStr = part.slice(eqIdx + 1).trim();
        try {
          result[key] = JSON.parse(valStr);
        } catch {
          result[key] = valStr; // keep as string if unparseable
        }
      }
    }
    return result;
  };

  // Normalize backend testcases:
  // - parse `input` string → object
  // - map `output` → `expected`
  // - map `hidden` → split logic (hidden:false = visible)
  const normalizeTestCase = (tc) => ({
    ...tc,
    input: parseInputString(tc.input),
    expected: tc.expected !== undefined ? tc.expected : tc.output,
  });

  const allCases = Array.isArray(testcaseData) ? testcaseData.map(normalizeTestCase) : [];

  // Backend uses `hidden: true/false`; visible = !hidden
  const hasHiddenFlag = allCases.length > 0 && allCases[0].hidden !== undefined;
  const visibleCases = hasHiddenFlag
    ? allCases.filter((tc) => !tc.hidden)
    : allCases.slice(0, 3);
  const hiddenCases = hasHiddenFlag
    ? allCases.filter((tc) => tc.hidden)
    : allCases.slice(3);

  const cases = { visible: visibleCases, hidden: hiddenCases };

  // Remap problemMeta fields to what driver code expects.
  // Backend sends `functionName` (not `fnName`) and no `type` field.
  // Infer `type` from `inputType` string ("int[] nums, int target" → "Array")
  const inferType = (inputType = "") => {
    if (/ListNode/i.test(inputType)) return "LinkedList";
    if (/TreeNode/i.test(inputType)) return "Tree";
    return "Array"; // default
  };

  const currentProblem = problemMeta
    ? {
        ...problemMeta,
        fnName: problemMeta.fnName || problemMeta.functionName,
        type: problemMeta.type || inferType(problemMeta.inputType),
      }
    : {};

  const timeoutPromise = (ms) => new Promise((_, reject) => {
    setTimeout(() => reject(new Error("TIMEOUT")), ms);
  });

  const runCode = async () => {
    if (!value) return;
    setIsLoading(true);
    setIsError(false);
    setOutput(null);
    setSubmissionStatus(null);
    setExecutionStats({ time: "0", memory: "0" }); 

    try {
      const driver = driverCodeTemplate[currentProblem.type][Language[0]];
      const fullCode = driver(currentProblem.fnName, value, cases.visible, currentProblem);
      
      const data = await Promise.race([
        executeCode(Language[0], fullCode),
        timeoutPromise(10000)
      ]);
      console.log("JDoodle Response:", data);

      // Save JDoodle stats (JDoodle uses cpuTime instead of time)
      setExecutionStats({ time: data.cpuTime || "0", memory: data.memory || "0" });

      // JDoodle Error Check: statusCode !== 200 means Compile/Runtime Error
      if (data.statusCode !== 200 || !data.output) {
        setIsError(true);
        setOutput([{ status: "Error", error: data.error || data.output || "Execution Failed" }]);
        return;
      }

      // Check for JDoodle's internal timeout message
      if (data.output.includes("Time Limit Exceeded")) {
        setIsError(true);
        setOutput([{ status: "Error", error: "Time Limit Exceeded" }]);
        return;
      }

      // Parse from JDoodle's 'output' (driver code prints the JSON array on the last line)
      const outputLines = data.output.trim().split("\n");
      const parsed = JSON.parse(outputLines[outputLines.length - 1]);
      setOutput(parsed);
      
    } catch (error) {
      setIsError(true);
      // Check if it was our 10-second timeout that triggered the error
      if (error.message === "TIMEOUT") {
        setOutput([{ status: "Error", error: "Time Limit Exceeded (Infinite Loop Detected)" }]);
      } else {
        setOutput([{ status: "Error", error: "Execution Failed or Server Offline" }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitCode = async () => {
    if (!value) return;
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setExecutionStats({ time: "0", memory: "0" }); 
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    let finalStatus = "Runtime Error";
    let executionData = { cpuTime: null, memory: null };

    try {
      const driver = driverCodeTemplate[currentProblem.type][Language[0]];
      const fullCode = driver(currentProblem.fnName, value, cases.hidden, currentProblem);
      
      // 1. Execute code via JDoodle
      const data = await Promise.race([
        executeCode(Language[0], fullCode),
        timeoutPromise(10000)
      ]);

      executionData = data;
      setExecutionStats({ time: data.cpuTime || "0", memory: data.memory || "0" });

      // 2. Determine the final status
      if (data.statusCode !== 200) {
        finalStatus = "Runtime Error";
        setSubmissionStatus("Runtime Error");
      } else if (data.output && data.output.includes("Time Limit Exceeded")) {
        finalStatus = "Time Limit Exceeded";
        setSubmissionStatus("Time Limit Exceeded");
      } else {
        // Code ran successfully, now grade the test cases
        const outputLines = data.output.trim().split("\n");
        const results = JSON.parse(outputLines[outputLines.length - 1]);
        
        const allPassed = results.every(res => res.status === "Passed");

        if (allPassed) {
          finalStatus = "ACCEPTED";
          setSubmissionStatus("ACCEPTED");
        } else {
          finalStatus = "WRONG_ANSWER";
          setSubmissionStatus("WRONG_ANSWER");
          setFirstFailedTestCase(results.find(res => res.status === "Failed"));
        }
      }

    } catch (error) {
      if (error.message === "TIMEOUT") {
        finalStatus = "TIME_LIMIT_EXCEEDED";
        setSubmissionStatus("TIME_LIMIT_EXCEEDED");
      } else {
        finalStatus = "COMPILATION_ERROR";
        setSubmissionStatus("COMPILATION_ERROR");
      }
    } finally {
      // 3. Save to Spring Boot Database (Now runs no matter what, even on timeout!)
      try {
        await axios.post(`${BACKEND_URL}/submission/create`, {
          problemId: problemId,  // use the prop, not currentProblem.id (problemDTO has no id field)
          language: Language[0] === "cpp" ? "c++" : Language[0], 
          userCode: value,
          status: finalStatus, // Matches exactly what the Java entity expects
          time: executionData.cpuTime ? parseFloat(executionData.cpuTime) : 0.0,
          memory: executionData.memory ? parseFloat(executionData.memory) : 0.0
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
          }
        });
        console.log("Submission successfully saved to database!");
      } catch (dbError) {
        console.error("Execution finished, but saving to DB failed:", dbError);
      }

      setcurrentTopBar("Submissions");
      setIsSubmitting(false);
    }
  };

  return {
    runCode,
    submitCode,
    isLoading,
    isSubmitting,
    isError,
    submissionStatus,
    setSubmissionStatus,
    firstFailedTestCase,
    executionStats, 
    visibleTestCases: cases.visible,
    hiddenTestCases: cases.hidden
  };
};