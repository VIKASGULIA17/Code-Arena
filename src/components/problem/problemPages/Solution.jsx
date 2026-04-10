import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button"; 
import { Copy, FileQuestion, Code2, ArrowLeft } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Editor } from "@monaco-editor/react";
import { ToastContainer, toast } from "react-toastify";

const Solution = ({ 
  editorial, 
  algorithmSteps,
  timeComplexity,
  spaceComplexity,
  implementation, 
  setcurrentTopBar 
}) => {
  
  const hasMarkdownEditorial = typeof editorial === "string" && editorial.trim() !== "";
  
  const hasStructuredEditorial = 
    (algorithmSteps && algorithmSteps.length > 0) || 
    timeComplexity || 
    spaceComplexity;

  const hasAnyEditorial = hasMarkdownEditorial || hasStructuredEditorial;

  const hasImplementation = 
    implementation && 
    typeof implementation === "object" && 
    Object.keys(implementation).length > 0;

  const availableLangs = hasImplementation ? Object.keys(implementation) : [];

  const [active, setActive] = useState("");

  useEffect(() => {
    if (availableLangs.length > 0 && (!active || !availableLangs.includes(active))) {
      setActive(availableLangs[0]);
    }
  }, [implementation, availableLangs, active]);

  const currentCode = (hasImplementation && active) ? implementation[active] : "";

  if (!hasAnyEditorial && !hasImplementation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 p-8 m-4 transition-all">
        <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-5 text-gray-400 border border-gray-100 relative">
          <FileQuestion size={32} />
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Solution Not Yet Available
        </h2>
        <p className="text-gray-500 max-w-sm text-center mb-6 text-sm leading-relaxed">
          We haven't published the official editorial and implementation for this
          problem yet. Check back later or try cracking it yourself!
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
    );
  }

  const copyToClipboard = () => {
    if (!currentCode) return;
    navigator.clipboard
      .writeText(currentCode)
      .then(() => toast.success("Code Copied"))
      .catch(() => toast.error("Failed to Copy text"));
  };

  const editorLanguage = active === "c++" || active === "cpp" ? "cpp" : (active || "javascript").toLowerCase();

  return (
    <div className="py-5 h-screen overflow-y-auto no-scrollbar pb-32">
      <div className="mx-3">
        <Button 
          variant="outline" 
          className="bg-pink-50 hover:bg-pink-50 border-pink-200 text-pink-600 py-1 rounded-full cursor-auto shadow-none mb-6"
        >
          Official Solution
        </Button>

        {hasAnyEditorial && (
          <div className="text-gray-700 font-sans mb-10">
            {hasMarkdownEditorial && (
              <div className="prose max-w-none">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{editorial}</ReactMarkdown>
              </div>
            )}

            {!hasMarkdownEditorial && hasStructuredEditorial && (
              <div className="space-y-8">
                {algorithmSteps && algorithmSteps.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Approach</h2>
                    <ul className="list-decimal ml-6 space-y-3">
                      {algorithmSteps.map((step, index) => (
                        <li key={index} className="text-gray-700 leading-relaxed marker:text-gray-400 marker:font-semibold">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(timeComplexity || spaceComplexity) && (
                  <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Complexity Analysis</h2>
                    <div className="space-y-4">
                      {timeComplexity && (
                        <div>
                          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            Time Complexity: 
                            <span className="font-mono text-sm bg-pink-100 text-pink-700 px-2 py-0.5 rounded-md">
                              {timeComplexity.value}
                            </span>
                          </h3>
                          <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{timeComplexity.explanation}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                      
                      {spaceComplexity && (
                        <div className="pt-2">
                          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            Space Complexity: 
                            <span className="font-mono text-sm bg-pink-100 text-pink-700 px-2 py-0.5 rounded-md">
                              {spaceComplexity.value}
                            </span>
                          </h3>
                          <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{spaceComplexity.explanation}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {hasImplementation && (
          <div className="mt-8">
            <h2 className="font-bold text-2xl text-gray-900 mb-4">Implementation</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2 flex-wrap">
                {availableLangs.map((lang) => {
                  const isActive = active === lang;
                  return (
                    <Button
                      key={lang}
                      variant={isActive ? "default" : "outline"} 
                      onClick={() => setActive(lang)}
                      className={`capitalize rounded-lg px-4 ${active === lang ? "bg-black text-white" : ""}`}
                    >
                      {lang}
                    </Button>
                  );
                })}
              </div>
              <div onClick={copyToClipboard} className="cursor-pointer">
                <Kbd className="bg-gray-50 border border-gray-200 p-2 hover:bg-gray-100 transition-colors">
                  <Copy size={16} className="text-gray-600" />
                </Kbd>
              </div>
            </div>
            
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
               <Editor
                  height="50vh"
                  value={currentCode}
                  language={editorLanguage}
                  theme="light"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 20 },
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    scrollbar: { vertical: "visible", horizontal: "visible" },
                  }}
                />
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Solution;