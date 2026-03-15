import React, { useState } from "react";
import main from "./gemini";

const TestingPage = () => {

    const [code,setCode] = useState("");
    const [output,setOutput] = useState(null);

    const sendToAI = async () => {
        const AIoutput = await main(code);
        setOutput(AIoutput);
    }

    // console.log(code);

  return (
    <>
      <div className="h-auto p-24 w-screen bg-blue-400">
        <div className="flex flex-col gap-3 items-center p-3 ">
            <textarea onChange={(e)=>setCode(e.target.value)} 
            value={code} className="border-2 rounded-2xl p-3 border-black" placeholder="paste your code submission here !" rows={30} cols={100}>

        </textarea>
        <button onClick={sendToAI} className="self-start bg-green-600 text-white hover:bg-green-800 duration-300 ease-in-out px-3 rounded-2xl py-2">Send to AI</button>
        </div>
        <div>
            {output}
        </div>
      </div>
    </>
  );
};

export default TestingPage;
