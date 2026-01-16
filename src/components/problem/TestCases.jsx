import React, { useState } from "react";
import { Button } from "../ui/button";
import { CloudUpload, Play } from "lucide-react";
import { executeCode } from "../../api/api";
import { testCases } from "../../data/testCases";
import { driverCode_Template } from "../../data/driveCodeTemplate";

const TestCases = ({ Language, value, problemId,Output ,setOutput }) => {
  // data variables
  
  const [isError, setisError] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentProblemTestcases = testCases[problemId] || {
    visible: [],
    expected: [],
  };
  const visibleTestCases = currentProblemTestcases.visible;

  // data functions
  const runCode = async () => {
    const userCode = value;
    const lang = Language[0];

    if (!userCode) return;

    setIsLoading(true);
    setisError(false);
    setOutput(null);

    try {
      const driverCode = driverCode_Template[problemId]?.[lang]?.driverCode;

      if (!driverCode) {
        setisError(true);
        setOutput([
          {
            status: "Error",
            error: "Runtime Environment for this problem not Found",
          },
        ]);
        setIsLoading(false);
        return;
      }

      // Generate the "Sandwich" code
      const fullSourceCode = driverCode(userCode, visibleTestCases);
      
      // Execute via Piston
      const data = await executeCode(Language, fullSourceCode);

      // 1. Handle Compile/Runtime Errors (stderr)
      if (data.run.stderr) {
        setisError(true);
        setOutput([{ status: "Error", error: data.run.stderr }]);
        setIsLoading(false);
        return;
      }

      // 2. Parse the JSON Output
      try {
        // FIX: Split output by lines and parse only the LAST line
        // This handles cases where user code has print() statements
        const outputLines = data.run.output.trim().split("\n");
        const lastLine = outputLines[outputLines.length - 1];
        
        const parsedOutput = JSON.parse(lastLine);
        
        setOutput(parsedOutput);
        setisError(false);
      } catch (err) {
        setisError(true);
        setOutput([
          {
            status: "Error",
            error: "Execution Success but Output Parse Failed. Did you print extra logs?",
          },
        ]);
      }
    } catch (error) {
      setisError(true);
      setOutput([{ status: "Error", error: "Server Connection Failed" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to safely get the current test case result
  const currentResult = Output && Output[isActive] ? Output[isActive] : null;

  return (
    <div className="h-60">
      <div className="flex items-center justify-between px-6 py-3 border-y-2">
        <h1>TestCases</h1>
        <div className="flex gap-4">
          <Button
            onClick={runCode}
            disabled={isLoading}
            className="border rounded-xl bg-gray-100 text-gray-800 disabled:opacity-50"
          >
            <Play className="text-gray-800 w-4 h-4 mr-2" />
            <p>{isLoading ? "Running..." : "Run"}</p>
          </Button>
          <Button className="border rounded-xl bg-brand-gradient">
            <CloudUpload className="w-4 h-4 mr-2" />
            <p>Submit</p>
          </Button>
        </div>
      </div>

      <div className="px-10 py-6">
        {/* Test Case Tabs */}
        <div className="flex gap-4 mb-4">
          {visibleTestCases.map((_, idx) => {
            // Determine color of the tab based on result status
            let tabColorClass = "bg-gray-100 text-black";
            if (isActive === idx) tabColorClass = "bg-black text-white ";

            // Optional: Add a dot/indicator if we have results
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
                className={`${tabColorClass} border ${statusColor} } relative`}
              >
                Testcase {idx + 1}
                {isActive===idx && (
                    <span
                      className={`absolute top-0 right-0 -mt-2 -mr-0.5 text-xs font-bold text-black`}
                    >
                      ●
                    </span>
                  )}
              </Button>
              // circle 
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
                    <span className="font-mono"> {JSON.stringify(val)}</span>
                  </div>
                ),
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

        {/* ACTUAL OUTPUT DISPLAY */}
        {currentResult && (
          <div className="py-2">
            <h1 className="font-semibold uppercase text-xs text-gray-500">
              Actual Output
            </h1>

            <div
              className={`rounded-lg my-2 py-3 px-4 font-mono text-sm border 
              ${
                currentResult.status === "Passed"
                  ? "bg-green-50 border-green-200 text-green-900"
                  : currentResult.status === "Failed"
                    ? "bg-red-50 border-red-200 text-red-900"
                    : "bg-yellow-50 border-yellow-200 text-yellow-900"
              }`}
            >
              {/* If Error */}
              {currentResult.status === "Error" ? (
                <span className="text-red-600 whitespace-pre-wrap">
                  {currentResult.error}
                </span>
              ) : (
                /* If Success/Fail */
                <div className="flex flex-col gap-1">
                  <span
                    className={`font-bold ${currentResult.status === "Passed" ? "text-green-600" : "text-red-600"}`}
                  >
                    {currentResult.status}
                  </span>
                  {/* Only show actual value if it's not a syntax error */}
                  {currentResult.actual !== undefined && (
                    <span className="font-mono  ">{JSON.stringify(currentResult.actual)}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCases;