import React, { useState, useRef, useEffect } from "react";
import main from "./gemini";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


//theme from github
const whiteSyntaxTheme = {
  'pre[class*="language-"]': {
    color: "#3b1f5e",
    background: "#ffffff",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
    lineHeight: "1.7",
    margin: 0,
    padding: 0,
  },
  'code[class*="language-"]': {
    color: "#3b1f5e",
    background: "#ffffff",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
  },
  comment: { color: "#c4a0e8", fontStyle: "italic" },
  prolog: { color: "#c4a0e8" },
  doctype: { color: "#c4a0e8" },
  cdata: { color: "#c4a0e8" },
  punctuation: { color: "#9d74c4" },
  property: { color: "#9333ea" },
  tag: { color: "#ec4899" },
  boolean: { color: "#db2777" },
  number: { color: "#db2777" },
  constant: { color: "#db2777" },
  symbol: { color: "#db2777" },
  selector: { color: "#a855f7" },
  "attr-name": { color: "#9333ea" },
  string: { color: "#ec4899" },
  char: { color: "#ec4899" },
  builtin: { color: "#a855f7" },
  operator: { color: "#7e22ce" },
  entity: { color: "#9333ea", cursor: "help" },
  url: { color: "#ec4899" },
  "language-css .token.string": { color: "#ec4899" },
  "style .token.string": { color: "#ec4899" },
  "attr-value": { color: "#ec4899" },
  keyword: { color: "#a855f7", fontWeight: "600" },
  regex: { color: "#f472b6" },
  important: { color: "#f472b6", fontWeight: "600" },
  function: { color: "#9333ea", fontWeight: "500" },
  "class-name": { color: "#7c3aed" },
  variable: { color: "#4c1d7a" },
  parameter: { color: "#6d28d9" },
  inserted: { color: "#16a34a" },
  deleted: { color: "#dc2626" },
};

const TestingPage = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const lineNumRef = useRef(null);
  const textareaRef = useRef(null);

  const lines = code.split("\n").length;

  useEffect(() => {
    const ta = textareaRef.current;
    const ln = lineNumRef.current;
    if (!ta || !ln) return;
    const handler = () => { ln.scrollTop = ta.scrollTop; };
    ta.addEventListener("scroll", handler);
    return () => ta.removeEventListener("scroll", handler);
  }, []);

  const sendToAI = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setOutput(null);
    try {
      const result = await main(code);
      setOutput(result);
    } catch {
      setOutput(" Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput(null);
  };

  return (
    <div
      className="min-h-screen mt-16 p-8"
      style={{ background: "#faf8ff", fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex items-center gap-3 mb-6 max-w-6xl mx-auto">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base shrink-0"
          style={{ background: "linear-gradient(135deg, #c084fc, #f472b6)" }}
        >
          ⚡
        </div>
        <h1
          className="text-xl font-extrabold tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif", color: "#3b1f5e" }}
        >
          CodeReview AI
        </h1>
        <span
          className="text-[10px] px-2 py-1 rounded-full uppercase tracking-widest"
          style={{ background: "#f5e8ff", border: "1px solid #e0c4fd", color: "#9333ea" }}
        >
          Gemini-Powered
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-6xl mx-auto">

        <div
          className="rounded-2xl flex flex-col overflow-hidden"
          style={{
            border: "1px solid #e9d5f7",
            background: "#fff",
            boxShadow: "0 1px 8px rgba(168,85,247,0.08)",
            height: "calc(100vh - 220px)",
            minHeight: "420px",
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 shrink-0"
            style={{ background: "#fdf8ff", borderBottom: "1px solid #f3e8ff" }}
          >
            <span className="w-3 h-3 rounded-full bg-[#fc8181]" />
            <span className="w-3 h-3 rounded-full bg-[#f6ad55]" />
            <span className="w-3 h-3 rounded-full bg-[#68d391]" />
            <span className="ml-2 text-[10px] uppercase tracking-widest" style={{ color: "#c084fc" }}>
              code_input.js
            </span>
          </div>

          <div className="flex flex-1 min-h-0 overflow-hidden" style={{ background: "#fdf5ff" }}>
            {/* //line no.  */}
            <div
              ref={lineNumRef}
              className="shrink-0 select-none overflow-hidden"
              style={{
                width: "36px",
                background: "#f5eaff",
                borderRight: "1px solid #ead9fb",
                paddingTop: "14px",
                paddingBottom: "14px",
              }}
            >
              {Array.from({ length: Math.max(lines, 1) }, (_, i) => (
                <div
                  key={i}
                  className="text-center text-[11px]"
                  style={{ color: "#c4a0e8", height: "22.2px", lineHeight: "22.2px" }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <textarea
              ref={textareaRef}
              className="flex-1 bg-transparent border-none outline-none resize-none overflow-y-auto"
              style={{
                padding: "14px 12px",
                fontSize: "12px",
                lineHeight: "1.85",
                color: "#4c1d7a",
                caretColor: "#a855f7",
                fontFamily: "'JetBrains Mono', monospace",
              }}
              placeholder={"// Paste your code here for review...\n// Supports JS, Python, TypeScript & more"}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ borderTop: "1px solid #f3e8ff", background: "#fff" }}
          >
            <button
              onClick={sendToAI}
              disabled={loading || !code.trim()}
              className="flex items-center gap-2 text-white px-5 py-2 rounded-lg text-xs font-medium tracking-wide transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", flexShrink: 0 }}
            >
              ▶ Review Code
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg text-xs transition-all shrink-0"
              style={{ border: "1px solid #e9d5f7", color: "#c084fc" }}
            >
              Clear
            </button>
            <span className="ml-auto text-[10px]" style={{ color: "#d8b4fe" }}>
              {code.length} chars
            </span>
          </div>
        </div>

        <div
          className="rounded-2xl flex flex-col overflow-hidden"
          style={{
            border: "1px solid #e9d5f7",
            background: "#fff",
            boxShadow: "0 1px 8px rgba(168,85,247,0.08)",
            height: "calc(100vh - 220px)",
            minHeight: "420px",
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 shrink-0"
            style={{ background: "#fdf8ff", borderBottom: "1px solid #f3e8ff" }}
          >
            <span className="w-3 h-3 rounded-full bg-[#fc8181]" />
            <span className="w-3 h-3 rounded-full bg-[#f6ad55]" />
            <span className="w-3 h-3 rounded-full bg-[#68d391]" />
            <span className="ml-2 text-[10px] uppercase tracking-widest" style={{ color: "#c084fc" }}>
              ai_review.md
            </span>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {!output && !loading && (
              <div className="h-full flex flex-col items-center justify-center gap-3 p-8">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                  style={{ background: "#fdf0ff", border: "1.5px dashed #e9d5f7" }}
                >
                  🔍
                </div>
                <p className="text-xs text-center leading-7" style={{ color: "#c4a0e8" }}>
                  Paste your code on the left
                  <br />
                  and click <strong style={{ color: "#9333ea" }}>Review Code</strong>
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center gap-3">
                <div
                  className="w-7 h-7 rounded-full border-2 animate-spin"
                  style={{ borderColor: "#f3e8ff", borderTopColor: "#a855f7" }}
                />
                <p className="text-xs animate-pulse" style={{ color: "#c084fc" }}>
                  Analyzing your code...
                </p>
              </div>
            )}

            {output && !loading && (
              <div className="p-5 text-xs leading-7" style={{ color: "#3b1f5e" }}>
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: "16px",
                          fontWeight: 800,
                          color: "#3b1f5e",
                          margin: "16px 0 7px",
                        }}
                      >
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#5b2d8e",
                          borderBottom: "1px solid #f3e8ff",
                          paddingBottom: "5px",
                          margin: "14px 0 7px",
                        }}
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#a855f7",
                          margin: "12px 0 5px",
                        }}
                      >
                        {children}
                      </h3>
                    ),
                    strong: ({ children }) => (
                      <strong style={{ color: "#5b2d8e", fontWeight: 600 }}>{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em style={{ color: "#c084fc" }}>{children}</em>
                    ),
                    ul: ({ children }) => (
                      <ul style={{ paddingLeft: "16px", marginBottom: "10px" }}>{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li style={{ marginBottom: "3px", color: "#4c1d7a" }}>{children}</li>
                    ),
                    p: ({ children }) => (
                      <p style={{ marginBottom: "9px" }}>{children}</p>
                    ),
                    hr: () => (
                      <hr style={{ border: "none", borderTop: "1px solid #f3e8ff", margin: "14px 0" }} />
                    ),
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={whiteSyntaxTheme}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            background: "#ffffff",
                            border: "1px solid #e9d5f7",
                            borderLeft: "3px solid #a855f7",
                            borderRadius: "8px",
                            padding: "14px 16px",
                            margin: "10px 0",
                            fontSize: "11px",
                            lineHeight: "1.7",
                            overflowX: "auto",
                          }}
                          codeTagProps={{
                            style: {
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "11px",
                            },
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          style={{
                            background: "#fdf0ff",
                            color: "#9333ea",
                            padding: "1px 5px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {output}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TestingPage;
