import React, { useState } from "react";
import { problemApproaches, problemSolutions } from "../../../data/solution";
import { Button } from "../../ui/button";
import { Clock, Cpu, TrendingUp } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const problemInfo = problemApproaches[id];

  return (
    <div className="py-5">
      <div>
        <Button className="bg-pink-100 border-pink-600 py-1 rounded-full text-pink-500">
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
              <div className="flex py-2 gap-5">
                <p className="rounded-full border bg-white px-2 "> {idx + 1}</p>
                <p className="text-gray-600">{formatText(obj)}</p>
              </div>
            );
          })}
        </div>
        <h1 className="capitalize font-semibold text-xl">
          Complexity analysis
        </h1>
        <div className="flex gap-4 py-4">
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-blue-600"/>
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
              <Cpu className="text-pink-600"/>
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
      </div>
    </div>
  );
};

export default Solution;
