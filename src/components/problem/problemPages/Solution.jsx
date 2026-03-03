import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Clock, Copy, Cpu, TrendingUp } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Editor } from "@monaco-editor/react";
import { ToastContainer, toast } from "react-toastify";
import { FileQuestion, Code2, ArrowLeft } from "lucide-react";

// const formatText = (text) => {
//   // Splits by backticks, single quotes, or double quotes
//   const parts = text.split(/(`[^`]+`|'[^']+'|"[^"]+")/g);

//   return parts.map((part, index) => {
//     // Check if the part starts/ends with quotes
//     if (
//       (part.startsWith("`") && part.endsWith("`")) ||
//       (part.startsWith("'") && part.endsWith("'")) ||
//       (part.startsWith('"') && part.endsWith('"'))
//     ) {
//       return (
//         <code
//           key={index}
//           className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono mx-1 border border-gray-200"
//         >
//           {part.slice(1, -1)}
//         </code>
//       );
//     }
//     return <span key={index}>{part}</span>;
//   });
// };

const Solution = ({ implementation, editorial,setcurrentTopBar }) => {


  if (!implementation || !editorial) { 
    return <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 p-8 m-4 transition-all">
      
      <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-5 text-gray-400 border border-gray-100 relative">
        <FileQuestion size={32} />
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Solution Not Yet Available
      </h2>
      <p className="text-gray-500 max-w-sm text-center mb-6 text-sm leading-relaxed">
        We haven't published the official editorial and implementation for this problem yet. Check back later or try cracking it yourself!
      </p>

      <div className="flex items-center gap-3 mt-2">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
        
        <button 
            onClick={() => setcurrentTopBar("Description")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
          >
            <Code2 size={16} />
            Write Code
          </button>
      </div>
      
    </div>
  }
  const [active, setactive] = useState("javascript"); // this is to select language of the code solution 
  const [currentCode, setcurrentCode] = useState(implementation[active]); // this is the code which will be displayed on the code editor 
  // console.log(currentCode)
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

        <div className="mt-10 text-gray-700 mx-3 text-justify mb-10 font-sans 
                [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mt-8 [&>h3]:mb-4
                [&>p]:mb-4 [&>p]:leading-relaxed
                [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6
                [&>li]:mb-2 [&>li]:marker:text-gray-400
                [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:border [&>pre]:border-gray-200
                [&_code]:bg-gray-100 [&_code]:text-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-sm
                [&>strong]:font-semibold [&>strong]:text-gray-900
              ">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {editorial}
          </ReactMarkdown>
        </div>

        <div>
          <h1 className="font-bold text-xl">Implementation</h1>
          <div className="py-2 flex justify-between gap-3">
            <div className="flex gap-5">
              {Object.keys(implementation).map((obj, idx) => {
                const isActive = obj === active;
                return (
                  <Button
                    key={idx}
                    onClick={() => {
                      (setactive(obj), setcurrentCode(implementation[obj]));
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
            defaultValue={implementation[active]}
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
