import React, { useState } from "react";
import { Button } from "../ui/button";
import { CloudUpload, Play, CheckCircle, XCircle } from "lucide-react";
import { executeCode } from "../../api/api";
import { testCases } from "../../data/testCases";
import { userCode } from "../../data/UserCodeTemplate";
import { driverCodeTemplate } from "../../data/driverCode";
import { dsaProblems } from "../../data/dsaProblem";


const TestCases = ({ Language, value, problemId, Output, setOutput, isContest }) => {


  // data variables
  const [isError, setisError] = useState(false); // for any error in execution ,so that i can show it in red or green 
  const [isActive, setIsActive] = useState(0); //to display current testcase info 
  const [isLoading, setIsLoading] = useState(false); // when clicked on submit button 
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submit loading
  const [submissionStatus, setSubmissionStatus] = useState(null); // To show "Accepted" or "Wrong Answer"

  const [firstFailedTestCase, setfirstFailedTestCase] = useState([])

  const currentProblemTestcases = testCases[problemId] || { //just in case there are no testcases 
    visible: [],
    hidden: [],
  };
  const visibleTestCases = currentProblemTestcases.visible; // for run
  const hiddenTestCases = currentProblemTestcases.hidden; //for submit

  const type=dsaProblems[problemId-1].type;
  // console.log(type)
  // console.log(driverCodeTemplate[type][Language[0]])

  // RUN CODE (Visible Cases)
  const runCode = async () => {
    const userCode = value;
    const lang = Language[0];
    const type=dsaProblems[problemId-1].type;
    const fnName=dsaProblems[problemId-1].fnName;



    if (!userCode) return;
    setIsLoading(true);
    setisError(false);
    setOutput(null);
    setSubmissionStatus(null); // Clear previous submission status

    try {
      const driverCode = driverCodeTemplate[type][lang];
      console.log(driverCode)

      if (!driverCode) {
        setisError(true);
        setOutput([{ status: "Error", error: "Runtime Environment not Found" }]);
        return;
      }

      // 1. Generate code using VISIBLE cases
      const fullSourceCode = driverCode(fnName,userCode, visibleTestCases);
      // this will get data from the api
      const data = await executeCode(Language, fullSourceCode);

      if (data.run.stderr) {
        setisError(true);
        setOutput([{ status: "Error", error: data.run.stderr }]);
        return;
      }

      try {
        const outputLines = data.run.output.trim().split("\n");
        const lastLine = outputLines[outputLines.length - 1];
        const parsedOutput = JSON.parse(lastLine);
        setOutput(parsedOutput);
        setisError(false);
      } catch (err) {
        setisError(true);
        setOutput([{ status: "Error", error: "Output Parse Failed" }]);
      }
    } catch (error) {
      setisError(true);
      setOutput([{ status: "Error", error: "Server Connection Failed" }]);
    } finally {
      setIsLoading(false);
    }
  };

  //  SUBMIT CODE (Hidden Cases)
  const submitCode = async () => {
    const userCode = value;
    const lang = Language[0];
    const type=dsaProblems[problemId-1].type;
    const fnName=dsaProblems[problemId-1].fnName;

    if (!userCode) return;

    setIsSubmitting(true);
    setisError(false);
    setOutput(null);
    setSubmissionStatus(null);

    try {
      const driverCode = driverCodeTemplate[type][lang];
      console.log(driverCode)

      if (!driverCode) {
        setisError(true);
        setSubmissionStatus("Runtime Environment Not Found");
        return;
      }

      // 1.  HIDDEN cases
      const fullSourceCode = driverCode(fnName,userCode, hiddenTestCases);

      // 2. Execute 
      const data = await executeCode(Language, fullSourceCode);

      // 3. Handle Compilation Errors
      if (data.run.stderr) {
        setisError(true);
        setSubmissionStatus("Runtime Error");
        console.error("Submission Error:", data.run.stderr);
        return;
      }

      // 4. Parse Hidden Results
      try {
        const outputLines = data.run.output.trim().split("\n");
        const lastLine = outputLines[outputLines.length - 1];
        const parsedHiddenResults = JSON.parse(lastLine);

        console.log("Hidden Test Case Results:", parsedHiddenResults);

        // 5. Calculate Final Status
        // Check if every single test case passed
        const allPassed = parsedHiddenResults.every(
          (res) => res.status === "Passed"
        );

        if (allPassed) {
          setSubmissionStatus("Accepted");
        } else {
          //  first failure to display if needed
          const firstFail = parsedHiddenResults.find(
            (res) => res.status === "Failed"
          );
          setSubmissionStatus(`Wrong Answer`);
          setfirstFailedTestCase(firstFail)
          console.log("Failed at input:", firstFail);
        }
      } catch (err) {
        setisError(true);
        setSubmissionStatus("Format Error");
      }
    } catch (error) {
      setSubmissionStatus("Network Error");
    } finally {
      setIsSubmitting(false);
    }
  };


  const currentResult = Output && Output[isActive] ? Output[isActive] : null;

  return (
    <div className="h-[45vh] flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-3 border-y-2 bg-white">
        <h1 className="font-bold text-gray-700">TestCases</h1>
        <div className="flex gap-4">
          <Button
            onClick={runCode}
            disabled={isLoading || isSubmitting}
            className="border rounded-xl bg-gray-100 text-gray-800 disabled:opacity-50 hover:bg-gray-200"
          >
            <Play className="text-gray-800 w-4 h-4 mr-2" />
            <p>{isLoading ? "Running..." : "Run"}</p>
          </Button>
          <Button
            onClick={submitCode}
            disabled={isLoading || isSubmitting}
            className="border rounded-xl bg-brand-gradient text-white disabled:opacity-70"
          >
            <CloudUpload className="w-4 h-4 mr-2" />
            <p>{isSubmitting ? "Submitting..." : "Submit"}</p>
          </Button>
        </div>
      </div>

      {/* BODY */}
      <div className="px-10 py-6 overflow-y-auto flex-1">

        {/* VIEW 1: SUBMISSION RESULT ( when Submission Status exists) */}
        {submissionStatus ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 animate-in fade-in zoom-in duration-300">
            {submissionStatus === "Accepted" ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h2 className="text-3xl font-bold text-green-600">Accepted</h2>
                <p className="text-gray-500">All hidden test cases passed!</p>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-red-500" />
                <h2 className="text-3xl font-bold text-red-600">
                  {submissionStatus === "Accepted" && "Accepted"}
                </h2>

                {firstFailedTestCase && hiddenTestCases && (
                  <div className="w-full max-w-2xl bg-gray-50 rounded-xl border border-red-100 p-6 shadow-sm">
                    <h3 className="text-red-600 font-bold mb-4 flex items-center gap-2">
                      <XCircle size={18} /> Failed Test Case
                    </h3>

                    {/* INPUT */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                        Input
                      </p>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg font-mono text-sm text-gray-700">
                        {hiddenTestCases[firstFailedTestCase.id - 1] ? (
                          Object.entries(
                            hiddenTestCases[firstFailedTestCase.id - 1].input
                          ).map(([key, val]) => (
                            <div key={key}>
                              <span className="text-gray-500">{key} = </span>
                              <span>{JSON.stringify(val)}</span>
                            </div>
                          ))
                        ) : (
                          <span>Hidden Input</span>
                        )}
                      </div>
                    </div>

                    {/* OUTPUTS GRID */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                          Output
                        </p>
                        <div className="bg-red-50 border border-red-200 p-3 rounded-lg font-mono text-sm text-red-700">
                          {JSON.stringify(firstFailedTestCase.actual)}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                          Expected
                        </p>
                        <div className="bg-green-50 border border-green-200 p-3 rounded-lg font-mono text-sm text-green-700">
                          {JSON.stringify(firstFailedTestCase.expected)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <Button
              variant="outline"
              onClick={() => setSubmissionStatus(null)}
              className="mt-4"
            >
              Back to Test Cases
            </Button>
          </div>
        ) : (
          /* VIEW 2: VISIBLE TEST CASES (Standard View) */
          <>
            {/* Test Case Tabs */}
            <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
              {visibleTestCases.map((_, idx) => {
                let tabColorClass = "bg-gray-100 text-black";
                if (isActive === idx) tabColorClass = "bg-black text-white";

                // Status Indicator Logic
                const statusColor =
                  Output && Output[idx]?.status === "Passed"
                    ? "text-green-700 bg-green-200 border-green-400"
                    : Output && Output[idx]?.status === "Failed"
                      ? "text-red-500 bg-red-200 border-red-400"
                      : "";

                return (
                  <Button
                    onClick={() => setIsActive(idx)}
                    key={idx}
                    className={`${tabColorClass} border ${statusColor} relative min-w-[100px]`}
                  >
                    Case {idx + 1}
                    {isActive === idx && (
                      <span className="absolute top-0 right-0 -mt-2 -mr-1 text-xs font-bold text-black">
                        ●
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* INPUT DISPLAY */}
            <div className="py-2">
              <h1 className="font-semibold uppercase text-xs text-gray-500">
                Input
              </h1>
              <div className="bg-gray-50 rounded-lg my-2 py-3 px-4 font-mono text-sm border">
                {visibleTestCases.length > 0 ? (
                  Object.entries(visibleTestCases[isActive].input).map(
                    ([key, val], i) => (
                      <div key={i} className="mb-1 font-mono">
                        <span className="text-gray-500">{key} = </span>
                        <span className="font-mono">
                          {" "}
                          {JSON.stringify(val)}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <div>No test cases available</div>
                )}
              </div>
            </div>

            {/* EXPECTED OUTPUT DISPLAY */}
            <div className="py-2">
              <h1 className="font-semibold uppercase text-xs text-gray-500">
                Expected Output
              </h1>
              <div className="bg-gray-50 rounded-lg my-2 py-3 px-4 font-mono text-sm border">
                {JSON.stringify(visibleTestCases[isActive].expected)}
              </div>
            </div>

            {/* ACTUAL OUTPUT DISPLAY (Only after Run) */}
            {currentResult && (
              <div className="py-2 animate-in slide-in-from-top-2">
                <h1 className="font-semibold uppercase text-xs text-gray-500">
                  Actual Output
                </h1>

                <div
                  className={`rounded-lg my-2 py-3 px-4 font-mono text-sm border 
                  ${currentResult.status === "Passed"
                      ? "bg-green-50 border-green-200 text-green-900"
                      : currentResult.status === "Failed"
                        ? "bg-red-50 border-red-200 text-red-900"
                        : "bg-yellow-50 border-yellow-200 text-yellow-900"
                    }`}
                >
                  {currentResult.status === "Error" ? (
                    <span className="text-red-600 whitespace-pre-wrap">
                      {currentResult.error}
                    </span>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <span
                        className={`font-bold ${currentResult.status === "Passed"
                          ? "text-green-600"
                          : "text-red-600"
                          }`}
                      >
                        {currentResult.status}
                      </span>
                      {currentResult.actual !== undefined && (
                        <span className="font-mono">
                          {JSON.stringify(currentResult.actual)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TestCases;