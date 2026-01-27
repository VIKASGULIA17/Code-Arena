import React, { useState } from "react";
import { problemApproaches, problemSolutions } from "../../../data/solution";
import { Button } from "../../ui/button";
import { Clock, Copy, Cpu, TrendingUp } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Editor } from "@monaco-editor/react";
import { ToastContainer, toast } from "react-toastify";

const formatText = (text) => {
  // Splits by backticks, single quotes, or double quotes
  const parts = text.split(/(`[^`]+`|'[^']+'|"[^"]+")/g);

  return parts.map((part, index) => {
    // Check if the part starts/ends with quotes
    if (
      (part.startsWith("`") && part.endsWith("`")) ||
      (part.startsWith("'") && part.endsWith("'")) ||
      (part.startsWith('"') && part.endsWith('"'))
    ) {
      return (
        <code
          key={index}
          className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono mx-1 border border-gray-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const Solution = ({ id }) => {
  const problemInfo = problemApproaches[id]; // solution explanation object
  const problemCode = problemSolutions[id]; //code solution of current problem


  if (!problemInfo || !problemCode) { //returning early if solutoin is not there
    return <div className="p-10 text-center">Problem Solution not found!</div>; 
  }
  const [active, setactive] = useState("javascript"); // this is to select language of the code solution 
  const [currentCode, setcurrentCode] = useState(problemCode[active]); // this is the code which will be displayed on the code editor 

  const copyToClipboard = () => { // copy to clipboard (code solution )
    const text = currentCode;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Code Copied");
        // alert("Code copied");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to Copy text");

        // alert("Failed to copy text."); // Handle errors
      });
  };

  return (
    <div className="py-5 h-screen overflow-scroll">
      <div>
        <Button className="bg-pink-100 border-pink-600 py-1 rounded-full text-pink-500 cursor-auto">
          Official Solution
        </Button>

        <h1 className="text-3xl font-medium py-4">{problemInfo.title}</h1>

        <h3 className="text-xl font-semibold py-3">Approach</h3>
        <p className="text-gray-500">{formatText(problemInfo.description)}</p>
        <div className="bg-gray-100 rounded-2xl px-6 py-9 my-8">
          <div className="flex gap-4 pb-4 font-bold">
            <TrendingUp className="text-purple-500" />
            <h1>Key Algorithm Steps</h1>
          </div>
          {problemInfo.algorithm.map((obj, idx) => {
            return (
              <div key={idx} className="flex items-center py-2 gap-5">
                <p className="rounded-full h-10 text-center w-10 flex items-center justify-center border bg-white px-2 ">
                  {" "}
                  {idx + 1}
                </p>
                <p className="text-gray-600">{formatText(obj)}</p>
              </div>
            );
          })}
        </div>
        <h1 className="capitalize font-semibold text-xl">
          Complexity analysis
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 py-4">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-blue-600" />
                <h1 className="capitalize">Time complexity</h1>
              </CardTitle>
              <CardDescription className="text-3xl font-bold font-mono text-black">
                <h3>{problemInfo.timeComplexity.value}</h3>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>{problemInfo.timeComplexity.explanation}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="text-pink-600" />
                <h1 className="capitalize">Space complexity</h1>
              </CardTitle>
              <CardDescription className="text-3xl font-bold font-mono text-black">
                <h3>{problemInfo.spaceComplexity.value}</h3>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>{problemInfo.spaceComplexity.explanation}</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <h1 className="font-bold text-xl">Implementation</h1>
          <div className="py-2 flex justify-between gap-3">
            <div className="flex gap-5">
              {Object.keys(problemCode).map((obj, idx) => {
                const isActive = obj === active;
                return (
                  <Button
                    key={idx}
                    onClick={() => {
                      (setactive(obj), setcurrentCode(problemCode[obj]));
                    }}
                    className={`border capitalize text-black  ${isActive ? " bg-black text-white " : ""} `}
                  >
                    {obj}
                  </Button>
                );
              })}
            </div>
            <div className="cursor-pointer" onClick={copyToClipboard}>
              <Kbd variant="outline" size="md">
                <Copy size={25} />
              </Kbd>
            </div>
          </div>
          <Editor
            height="44vh"
            defaultValue={problemCode[active]}
            value={currentCode}
            language={active}
            theme=""
            options={{
              fontSize: 14,
              letterSpacing: 1,
              fontFamily: "sans-sarif",
              readOnly: true,
              domReadOnly: true,
              minimap: {
                enabled: false,
              },
              scrollbar: false,
            }}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Solution;
