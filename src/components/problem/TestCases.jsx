import React, { useState } from "react";
import { Button } from "../ui/button";
import { CloudUpload, Play, CheckCircle, XCircle } from "lucide-react";
import { useTestRunner } from '../../hooks/useTestRunner';
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const TestCases = ({ Language, value, problemId, Output, setOutput, isContest,setcurrentTopBar,testcaseData, problemMeta }) => {
  const { isJwtExist } = useAppContext();

  const [isActive, setIsActive] = useState(0);
  const {
    runCode,
    submitCode,
    isLoading,
    isSubmitting,
    isError,
    submissionStatus,
    setSubmissionStatus,
    firstFailedTestCase,
    executionStats,
    visibleTestCases,
    hiddenTestCases
  } = useTestRunner(problemId, Language, value, setOutput, setcurrentTopBar, testcaseData, problemMeta);

  // data variables
  const testcases = testcaseData || [];

  const currentResult = Output && Output[isActive] ? Output[isActive] : null;

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-3 border-y-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <h1 className="font-bold text-gray-700 dark:text-slate-200">TestCases</h1>
        <div className="flex gap-4">
          <Button
            onClick={runCode}
            disabled={isLoading || isSubmitting}
            className="border border-slate-200 dark:border-slate-600 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-slate-700"
          >
            <Play className="text-gray-800 dark:text-slate-200 w-4 h-4 mr-2" />
            <p>{isLoading ? "Running..." : "Run"}</p>
          </Button>
          <Button
            onClick={() => {
              if (!isJwtExist) {
                toast.error("Please login to submit code!", { position: "top-right" });
                return;
              }
              submitCode();
            }}
            disabled={isLoading || isSubmitting}
            className="border rounded-xl bg-brand-gradient text-white disabled:opacity-70"
          >
            <CloudUpload className="w-4 h-4 mr-2" />
            <p>{isSubmitting ? "Submitting..." : "Submit"}</p>
          </Button>
        </div>
      </div>

      {/* BODY */}
      <div className="px-10 py-6 overflow-y-auto flex-1 bg-white dark:bg-slate-900">

        {submissionStatus ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 animate-in fade-in zoom-in duration-300">
            {submissionStatus === "ACCEPTED" ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h2 className="text-3xl font-bold text-green-600">Accepted</h2>
                <p className="text-gray-500 dark:text-slate-400">All hidden test cases passed!</p>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-red-500" />
                <h2 className="text-3xl font-bold text-red-600">
                  {submissionStatus?.replace(/_/g, " ")}
                </h2>

                {firstFailedTestCase && hiddenTestCases && (
                  <div className="w-full max-w-2xl bg-gray-50 dark:bg-slate-800 rounded-xl border border-red-100 dark:border-red-500/20 p-6 shadow-sm">
                    <h3 className="text-red-600 dark:text-red-400 font-bold mb-4 flex items-center gap-2">
                      <XCircle size={18} /> Failed Test Case
                    </h3>

                    {/* INPUT */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">
                        Input
                      </p>
                      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-3 rounded-lg font-mono text-sm text-gray-700 dark:text-slate-300">
                        {hiddenTestCases[firstFailedTestCase.id - 1] ? (
                          Object.entries(
                            hiddenTestCases[firstFailedTestCase.id - 1].input
                          ).map(([key, val]) => (
                            <div key={key}>
                              <span className="text-gray-500 dark:text-slate-500">{key} = </span>
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
                        <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">
                          Output
                        </p>
                        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-3 rounded-lg font-mono text-sm text-red-700 dark:text-red-400">
                          {JSON.stringify(firstFailedTestCase.actual)}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">
                          Expected
                        </p>
                        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 p-3 rounded-lg font-mono text-sm text-green-700 dark:text-green-400">
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
              className="mt-4 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
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
                let tabColorClass = isActive === idx
                  ? "bg-slate-900 dark:bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300";

                // Status Indicator Logic
                const statusColor =
                  Output && Output[idx]?.status === "Passed"
                    ? "text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-500/20 border-green-400 dark:border-green-500/30"
                    : Output && Output[idx]?.status === "Failed"
                      ? "text-red-500 dark:text-red-400 bg-red-200 dark:bg-red-500/20 border-red-400 dark:border-red-500/30"
                      : "";

                return (
                  <Button
                    onClick={() => setIsActive(idx)}
                    key={idx}
                    className={`${tabColorClass} border border-slate-200 dark:border-slate-600 ${statusColor} relative min-w-[100px]`}
                  >
                    Case {idx + 1}
                    {isActive === idx && (
                      <span className="absolute top-0 right-0 -mt-2 -mr-1 text-xs font-bold text-indigo-500 dark:text-indigo-400">
                        ●
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* INPUT DISPLAY */}
            <div className="py-2">
              <h1 className="font-semibold uppercase text-xs text-gray-500 dark:text-slate-400">
                Input
              </h1>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg my-2 py-3 px-4 font-mono text-sm text-gray-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                {visibleTestCases.length > 0 ? (
                  Object.entries(visibleTestCases[isActive].input).map(
                    ([key, val], i) => (
                      <div key={i} className="mb-1 font-mono">
                        <span className="text-gray-500 dark:text-slate-500">{key} = </span>
                        <span className="font-mono">
                          {" "}
                          {JSON.stringify(val)}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-slate-400">No test cases available</div>
                )}
              </div>
            </div>

            {/* EXPECTED OUTPUT DISPLAY */}
            <div className="py-2">
              <h1 className="font-semibold uppercase text-xs text-gray-500 dark:text-slate-400">
                Expected Output
              </h1>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg my-2 py-3 px-4 font-mono text-sm text-gray-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                {visibleTestCases[isActive]?.output != null || visibleTestCases[isActive]?.expected != null
                  ? JSON.stringify(visibleTestCases[isActive].output ?? visibleTestCases[isActive].expected)
                  : <span className="text-gray-400 dark:text-slate-500 italic">Not available</span>
                }
              </div>
            </div>

            {/* ACTUAL OUTPUT DISPLAY (Only after Run) */}
            {currentResult && (
              <div className="py-2 animate-in slide-in-from-top-2">
                <div className="flex justify-between items-end">
                  <h1 className="font-semibold uppercase text-xs text-gray-500 dark:text-slate-400">Actual Output</h1>
                  
                  {/* NEW: Display Judge0 Stats on individual Run test cases */}
                  {!isError && currentResult.status !== "Error" && (
                    <div className="flex gap-2 text-xs font-mono text-gray-500 dark:text-slate-400">
                      <span className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded border border-transparent dark:border-slate-700">Time: {(executionStats.time * 1000).toFixed(0)} ms</span>
                      <span className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded border border-transparent dark:border-slate-700">Mem: {(executionStats.memory / 1024).toFixed(1)} MB</span>
                    </div>
                  )}
                </div>

                <div className={`rounded-lg my-2 py-3 px-4 font-mono text-sm border 
                  ${currentResult.status === "Passed" ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-900 dark:text-green-300"
                    : currentResult.status === "Failed" ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-900 dark:text-red-300"
                    : "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20 text-yellow-900 dark:text-yellow-300"
                  }`}>
                  {currentResult.status === "Error" || isError ? (
                    <span className="text-red-600 dark:text-red-400 whitespace-pre-wrap">{currentResult.error}</span>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <span className={`font-bold ${currentResult.status === "Passed" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {currentResult.status}
                      </span>
                      {currentResult.actual !== undefined && (
                        <span className="font-mono">{JSON.stringify(currentResult.actual)}</span>
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