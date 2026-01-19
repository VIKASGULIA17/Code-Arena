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
import { problemInfo } from "../../data/dsaProblem";
import { Button } from "../ui/button";
import CodeEditor from "./CodeEditor";
import Description from "./problemPages/Description";
import Solution from "./problemPages/Solution";
import Discussion from "./problemPages/Discussion";

const ProblemDetails = () => {
  const { id } = useParams();

  const problem = problemInfo[id];
  const [currentTopBar, setcurrentTopBar] = useState("Solution");


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
    <div className="flex h-auto md:h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 px-3 md:px-5 md:h-screen md:overflow-y-auto">
        {/* left  */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-2 min-h-10 sticky top-0 z-10">
          <div className="flex items-center gap-1 overflow-x-auto">
            <TabButton
              label="Description"
              icon={FileText}
            />

            <TabButton
              label="Solution"
              icon={Lightbulb}
            />

            <TabButton
              label="Discussion"
              icon={MessagesSquare}
            />
          </div>
        </div>

        {currentTopBar == "Description" ? (
          <Description id={id}/>
        ) : (
          (currentTopBar==='Solution'
            ?
            <Solution id={id}/>
            :<Discussion id={id}/>
          )
        )}
      </div>

      <div className="w-full md:w-1/2 md:border-l border-t md:border-t-0 h-auto md:h-screen md:overflow-y-auto">
        {/* right  */}
        <CodeEditor problemId={id} />
      </div>
    </div>
  );
};

export default ProblemDetails;
