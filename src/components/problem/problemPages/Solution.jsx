import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button"; 
import { Copy, FileQuestion, Code2, ArrowLeft } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "../../../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";

const Solution = ({ 
  editorial, 
  algorithmSteps,
  timeComplexity,
  spaceComplexity,
  implementation, 
  setcurrentTopBar 
}) => {
  const { resolvedTheme } = useTheme();
  const syntaxTheme = resolvedTheme === "dark" ? vscDarkPlus : materialLight;

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
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50/50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-800 p-8 m-4 transition-all">
        <div className="w-16 h-16 bg-white dark:bg-slate-800 shadow-sm rounded-full flex items-center justify-center mb-5 text-gray-400 dark:text-slate-500 border border-gray-100 dark:border-slate-700 relative">
          <FileQuestion size={32} />
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-400 rounded-full border-2 border-white dark:border-slate-800"></div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-2">
          Solution Not Yet Available
        </h2>
        <p className="text-gray-500 dark:text-slate-400 max-w-sm text-center mb-6 text-sm leading-relaxed">
          We haven't published the official editorial and implementation for this
          problem yet. Check back later or try cracking it yourself!
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <button
            onClick={() => setcurrentTopBar("Description")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 dark:hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
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
          className="bg-pink-50 dark:bg-pink-500/10 hover:bg-pink-50 dark:hover:bg-pink-500/10 border-pink-200 dark:border-pink-500/20 text-pink-600 dark:text-pink-400 py-1 rounded-full cursor-auto shadow-none mb-6"
        >
          Official Solution
        </Button>

        {hasAnyEditorial && (
          <div className="text-gray-700 dark:text-slate-300 font-sans mb-10">
            {hasMarkdownEditorial && (
              <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{editorial}</ReactMarkdown>
              </div>
            )}

            {!hasMarkdownEditorial && hasStructuredEditorial && (
              <div className="space-y-8">
                {algorithmSteps && algorithmSteps.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Approach</h2>
                    <ul className="list-decimal ml-6 space-y-3">
                      {algorithmSteps.map((step, index) => (
                        <li key={index} className="text-gray-700 dark:text-slate-300 leading-relaxed marker:text-gray-400 dark:marker:text-slate-500 marker:font-semibold">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(timeComplexity || spaceComplexity) && (
                  <div className="bg-gray-50/80 dark:bg-slate-900/50 rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">Complexity Analysis</h2>
                    <div className="space-y-4">
                      {timeComplexity && (
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2">
                            Time Complexity: 
                            <span className="font-mono text-sm bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 px-2 py-0.5 rounded-md">
                              {timeComplexity.value}
                            </span>
                          </h3>
                          <div className="text-sm text-gray-600 dark:text-slate-400 mt-1 leading-relaxed prose dark:prose-invert">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{timeComplexity.explanation}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                      
                      {spaceComplexity && (
                        <div className="pt-2">
                          <h3 className="font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2">
                            Space Complexity: 
                            <span className="font-mono text-sm bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 px-2 py-0.5 rounded-md">
                              {spaceComplexity.value}
                            </span>
                          </h3>
                          <div className="text-sm text-gray-600 dark:text-slate-400 mt-1 leading-relaxed prose dark:prose-invert">
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
            <h2 className="font-bold text-2xl text-gray-900 dark:text-slate-100 mb-4">Implementation</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2 flex-wrap">
                {availableLangs.map((lang) => {
                  const isActive = active === lang;
                  return (
                    <Button
                      key={lang}
                      variant="outline"
                      onClick={() => setActive(lang)}
                      className={`capitalize rounded-lg px-4 ${isActive ? "bg-black dark:bg-indigo-600 text-white border-transparent" : "dark:text-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800"}`}
                    >
                      {lang}
                    </Button>
                  );
                })}
              </div>
              <div onClick={copyToClipboard} className="cursor-pointer">
                <Kbd className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                  <Copy size={16} className="text-gray-600 dark:text-slate-400" />
                </Kbd>
              </div>
            </div>
            
            <div className={`rounded-xl border ${resolvedTheme === 'dark' ? 'border-slate-800 bg-[#0f172a] shadow-lg' : 'border-gray-200 bg-[#FAFAFA] shadow-sm'} overflow-hidden`}>
              <div className={`flex items-center gap-2 px-4 py-3 border-b ${resolvedTheme === 'dark' ? 'border-slate-800 bg-[#0b1120]' : 'border-gray-200 bg-gray-100'}`}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
                <span className={`ml-2 text-xs font-mono opacity-60 ${resolvedTheme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>{active}.{editorLanguage}</span>
              </div>
              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  language={editorLanguage}
                  style={syntaxTheme}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    background: 'transparent',
                  }}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {currentCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Solution;