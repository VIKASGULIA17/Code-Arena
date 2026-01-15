import React, { useState } from "react";
import { Button } from "../ui/button";
import { Cloud, CloudUpload, Play } from "lucide-react";
import { executeCode } from "../../api/api";

const TestCases = ({ Language, value }) => {

    const [Output, setOutput] = useState([])
    const [isError, setisError] = useState(false)
  const runCode = async () => {
    const sourceCode = value;
    if (!sourceCode) return;
    try {
      const data = await executeCode(Language, value);
      const error=data.run.stderr;
      const tempOutput=data.run.output.split("\n")
      setOutput(tempOutput)
      if(error!=""){
          setisError(true);
      } else{
        setisError(false)
      }
      console.log(data)
    } catch (error) {}
  };

  return (
    <div>
      <div className="flex items-center justify-between px-6 pb-3 border-b-2 ">
        {/* buttons  */}
        <h1>TestCases</h1>
        <div className="flex gap-4">
          <Button
            onClick={runCode}
            className="border rounded-xl  bg-gray-100 text-gray-800"
          >
            <Play className="text-gray-800" />
            <p>Run</p>
          </Button>
          <Button className="border rounded-xl bg-brand-gradient">
            <CloudUpload />
            <p>Submit</p>
          </Button>
        </div>
      </div>
      <div className="px-10 py-6">
        {/* include all the testcases  */}
        {Output.map((obj,idx)=>{
            return <p key={idx} className={`${isError?'text-red-500':'text-gray-800'}`} >{obj}</p>
        })}
      </div>
    </div>
  );
};

export default TestCases;
