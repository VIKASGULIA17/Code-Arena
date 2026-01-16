import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Dock,
  File,
  FileText,
  Lightbulb,
  MessagesSquare,
} from "lucide-react";
import { dsaProblems } from "../../data/dsaProblem";
import { problemInfo } from "../../data/dsaProblem";
import { Button } from "../ui/button";
import CodeEditor from "./CodeEditor";
import Navbar from "../Navbar";

const ProblemDetails = () => {
  const { id } = useParams();

  const problem = problemInfo[id];
  const [currentTopBar, setcurrentTopBar] = useState("Description");

  if (!problem) {
    return <div className="p-10 text-center">Problem not found!</div>;
  }
  const TabButton = ({ label, icon: Icon }) => {
    const isActive = currentTopBar === label;
    return (
      <Button
        variant="ghost"
        onClick={() => setcurrentTopBar(label)}
        className={`relative rounded-none h-10 px-4 font-semibold hover:bg-transparent transition-all gap-2 ${
          isActive ? "text-gray-900" : "text-gray-500"
        }`}
      >
        <Icon size={16} />
        <h1>{label}</h1>
        {/* Gradient Underline */}
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-0.5  bg-linear-to-r from-blue-600 via-purple-600 to-pink-600" />
        )}
      </Button>
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2  px-5 ">
        {/* left  */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-2 min-h-10">
          <div className="flex items-center gap-1 duration-500d">
            <TabButton label="Description" icon={FileText} />
            <TabButton label="Solution" icon={Lightbulb} />
            <TabButton label="Discussion" icon={MessagesSquare} />
          </div>
        </div>
        <div className="py-7  flex flex-col gap-5">
          <h1 className="text-3xl font-semibold">
            {problem.id}. {problem.title}
          </h1>
          <div className="flex items-center">
            <Button
              className={`mr-3 border ${problem.difficulty === "Easy" ? "border-green-400 bg-green-200 text-green-600" : problem.difficulty === "Medium" ? "border-yellow-400 bg-yellow-100 text-yellow-600" : "border-red-400 bg-red-200 text-red-600"}`}
            >
              {problem.difficulty}
            </Button>
            {problem.tags.map((obj, idx) => {
              return (
                <Button
                  key={idx}
                  className="flex items-center ml-3 border h-8 border-purple-300 text-sm px-2 bg-purple-100 rounded-full"
                >
                  {obj}
                </Button>
              );
            })}
          </div>
        </div>
        <p className="text-gray-700 mx-3 text-justify mb-10">
          {problem.description}
        </p>
        {problem.examples.map((obj, idx) => {
          return (
            <div key={idx} className="mx-3 py-2">
              <div className="py-1">
                <h1 className="text-xl font-semibold text-gray-700">
                  Example {idx + 1}:
                </h1>
              </div>
              <div className="w-full border py-4 px-4 h-auto  bg-gray-100 rounded-2xl">
                <div className="flex gap-2">
                  <h3 className="capitalize text-gray-600 font-light">
                    Input:
                  </h3>
                  <p className="font-medium"> {obj.input}</p>
                </div>
                <div className="flex gap-2">
                  <h3 className="capitalize text-gray-600 font-light">
                    Output:
                  </h3>
                  <p className="font-medium"> {obj.output}</p>
                </div>
                {obj.explanation && (
                  <div className="flex gap-2">
                    <h3 className="capitalize text-gray-600 font-light">
                      Explanation:
                    </h3>
                    <p className=""> {obj.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="py-5 mx-4">
          <h3 className="font-semibold text-lg text-zinc-700 pb-3">
            Constraints
          </h3>
          <div className="mx-4 flex flex-col gap-2">
            {problem.constraints.map((obj, idx) => {
              return (
                <li key={idx} className="marker:text-purple-500 text-gray-500 ">
                  {obj}
                </li>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-1/2  border-l h-screen overflow-scroll">
        {/* right  */}
        <CodeEditor problemId={id} />
      </div>
    </div>
  );
};

export default ProblemDetails;
