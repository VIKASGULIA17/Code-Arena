import { useState } from "react";
import { executeCode } from "../api/api";
import { testCases } from "../data/testCases";
import { driverCodeTemplate } from "../data/driverCode";
import { dsaProblems } from "../data/dsaProblem";
import axios from "axios";

export const useTestRunner = (problemId, Language, value, setOutput) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [firstFailedTestCase, setFirstFailedTestCase] = useState(null);
  
  const [executionStats, setExecutionStats] = useState({ time: "0", memory: "0" });

  const currentProblem = dsaProblems.find(p => String(p.id) === String(problemId));
  const cases = testCases[problemId] || { visible: [], hidden: [] };


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
      console.log(data)

      // Save Judge0 stats
      setExecutionStats({ time: data.time, memory: data.memory });

      // Judge0 Error Check: ID > 3 means TLE, Runtime Error, Compile Error, etc.
      if (data.statusCode > 3 || data.stderr) {
        setIsError(true);
        setOutput([{ status: "Error", error: data.stderr || data.status }]);
        return;
      }

      // Parse from Judge0's stdout instead of Piston's data.run.output
      const parsed = JSON.parse(data.stdout.trim().split("\n").pop());
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

    try {
      const driver = driverCodeTemplate[currentProblem.type][Language[0]];
      const fullCode = driver(currentProblem.fnName, value, cases.hidden);
      
      // 1. Execute code via Judge0
      const data = await Promise.race([
        executeCode(Language[0], fullCode),
        timeoutPromise(10000)
      ]);

      setExecutionStats({ time: data.time, memory: data.memory });

      // 2. Determine the final status
      let finalStatus = "WRONG_ANSWER";
      let results = [];

      if (data.statusCode === 5) {
        finalStatus = "TIME_LIMIT_EXCEEDED";
        setSubmissionStatus("Time Limit Exceeded");
      } else if (data.statusCode > 3 || data.stderr) {
        finalStatus = "RUNTIME_ERROR"; // Or COMPILATION_ERROR depending on code
        setSubmissionStatus("Runtime Error");
      } else {
        // Code ran successfully, now grade the test cases
        results = JSON.parse(data.stdout.trim().split("\n").pop());
        const allPassed = results.every(res => res.status === "Passed");

        if (allPassed) {
          finalStatus = "ACCEPTED";
          setSubmissionStatus("Accepted");
        } else {
          finalStatus = "WRONG_ANSWER";
          setSubmissionStatus("Wrong Answer");
          setFirstFailedTestCase(results.find(res => res.status === "Failed"));
        }
      }

      // 3. Save to Spring Boot Database
      // We do this in a separate try/catch so that if the DB goes down, 
      // the user still sees their code execution results.
      try {
        await axios.post(`${BACKEND_URL}/submission/create`, {
          problemId: currentProblem.id,  // The string ID, e.g., '65cb9a1e...'
          language: Language[0] === "cpp" ? "c++" : Language[0], // Ensure it matches your UI config
          userCode: value,
          status: finalStatus,
          time: data.time ? parseFloat(data.time) : null,
          memory: data.memory ? parseFloat(data.memory) : null
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
          }
        });
        console.log("Submission successfully saved to database!");
      } catch (dbError) {
        console.error("Judge0 worked, but saving to DB failed:", dbError);
      }

    } catch (error) {
      if (error.message === "TIMEOUT") {
        setSubmissionStatus("Time Limit Exceeded");
      } else {
        setSubmissionStatus("Server Error");
      }
    } finally {
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