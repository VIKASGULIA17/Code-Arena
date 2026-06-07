import React, { useEffect, useState, useRef } from "react";
import { CheckCircle2, Clock, Cpu } from "lucide-react";

/* ─── language definitions ─────────────────────────── */
const LANGUAGES = [
  {
    id: "python",
    label: "Python",
    filename: "solution.py",
    color: "#3b82f6",
    badge: "bg-blue-500",
    lines: [
      [{ t: "keyword", v: "def " }, { t: "fn", v: "twoSum" }, { t: "plain", v: "(nums, target):" }],
      [{ t: "comment", v: '    """Find two numbers that add up to target"""' }],
      [{ t: "plain", v: "    seen = " }, { t: "number", v: "{}" }],
      [{ t: "keyword", v: "    for " }, { t: "plain", v: "i, num " }, { t: "keyword", v: "in " }, { t: "fn", v: "enumerate" }, { t: "plain", v: "(nums):" }],
      [{ t: "plain", v: "        complement = target " }, { t: "op", v: "-" }, { t: "plain", v: " num" }],
      [{ t: "keyword", v: "        if " }, { t: "plain", v: "complement " }, { t: "keyword", v: "in " }, { t: "plain", v: "seen:" }],
      [{ t: "keyword", v: "            return " }, { t: "plain", v: "[seen[complement], i]" }],
      [{ t: "plain", v: "    seen[num] " }, { t: "op", v: "=" }, { t: "plain", v: " i" }],
    ],
  },
  {
    id: "javascript",
    label: "JavaScript",
    filename: "solution.js",
    color: "#f59e0b",
    badge: "bg-amber-400",
    lines: [
      [{ t: "keyword", v: "function " }, { t: "fn", v: "twoSum" }, { t: "plain", v: "(nums, target) {" }],
      [{ t: "plain", v: "  " }, { t: "keyword", v: "const " }, { t: "plain", v: "map = " }, { t: "keyword", v: "new " }, { t: "fn", v: "Map" }, { t: "plain", v: "();" }],
      [{ t: "keyword", v: "  for " }, { t: "plain", v: "(" }, { t: "keyword", v: "let " }, { t: "plain", v: "i = 0; i < nums.length; i++) {" }],
      [{ t: "keyword", v: "    const " }, { t: "plain", v: "comp = target " }, { t: "op", v: "-" }, { t: "plain", v: " nums[i];" }],
      [{ t: "keyword", v: "    if " }, { t: "plain", v: "(map." }, { t: "fn", v: "has" }, { t: "plain", v: "(comp))" }],
      [{ t: "keyword", v: "      return " }, { t: "plain", v: "[map." }, { t: "fn", v: "get" }, { t: "plain", v: "(comp), i];" }],
      [{ t: "plain", v: "    map." }, { t: "fn", v: "set" }, { t: "plain", v: "(nums[i], i);" }],
      [{ t: "plain", v: "  }" }],
      [{ t: "plain", v: "}" }],
    ],
  },
  {
    id: "java",
    label: "Java",
    filename: "Solution.java",
    color: "#ef4444",
    badge: "bg-red-500",
    lines: [
      [{ t: "keyword", v: "public int" }, { t: "plain", v: "[] " }, { t: "fn", v: "twoSum" }, { t: "plain", v: "(int[] nums, int target) {" }],
      [{ t: "plain", v: "  Map<Integer,Integer> map " }, { t: "op", v: "=" }, { t: "keyword", v: " new " }, { t: "fn", v: "HashMap" }, { t: "plain", v: "<>();" }],
      [{ t: "keyword", v: "  for " }, { t: "plain", v: "(int i = 0; i < nums.length; i++) {" }],
      [{ t: "keyword", v: "    int " }, { t: "plain", v: "comp = target " }, { t: "op", v: "-" }, { t: "plain", v: " nums[i];" }],
      [{ t: "keyword", v: "    if " }, { t: "plain", v: "(map." }, { t: "fn", v: "containsKey" }, { t: "plain", v: "(comp))" }],
      [{ t: "keyword", v: "      return new int" }, { t: "plain", v: "[]{map." }, { t: "fn", v: "get" }, { t: "plain", v: "(comp), i};" }],
      [{ t: "plain", v: "    map." }, { t: "fn", v: "put" }, { t: "plain", v: "(nums[i], i);" }],
      [{ t: "plain", v: "  }" }],
      [{ t: "plain", v: "}" }],
    ],
  },
  {
    id: "cpp",
    label: "C++",
    filename: "solution.cpp",
    color: "#8b5cf6",
    badge: "bg-violet-500",
    lines: [
      [{ t: "plain", v: "vector<int> " }, { t: "fn", v: "twoSum" }, { t: "plain", v: "(vector<int>& nums, int target) {" }],
      [{ t: "plain", v: "  unordered_map<int,int> map;" }],
      [{ t: "keyword", v: "  for " }, { t: "plain", v: "(int i = 0; i < nums." }, { t: "fn", v: "size" }, { t: "plain", v: "(); i++) {" }],
      [{ t: "keyword", v: "    int " }, { t: "plain", v: "comp = target " }, { t: "op", v: "-" }, { t: "plain", v: " nums[i];" }],
      [{ t: "keyword", v: "    if " }, { t: "plain", v: "(map." }, { t: "fn", v: "count" }, { t: "plain", v: "(comp))" }],
      [{ t: "keyword", v: "      return " }, { t: "plain", v: "{map[comp], i};" }],
      [{ t: "plain", v: "    map[nums[i]] = i;" }],
      [{ t: "plain", v: "  }" }],
      [{ t: "plain", v: "}" }],
    ],
  },
];

const RUNTIME = ["4ms", "8ms", "2ms", "6ms"];
const MEMORY  = ["15.2MB", "42.3MB", "38.1MB", "20.7MB"];

/* token color map */
const tokenColor = {
  keyword: "#c084fc",   // purple
  fn:      "#fbbf24",   // amber
  comment: "#6b7280",   // gray
  number:  "#34d399",   // green
  op:      "#94a3b8",   // slate
  plain:   "#e2e8f0",   // off-white
};

/* typing speed (chars/frame) */
const CHAR_DELAY  = 30;   // ms per character
const LINE_PAUSE  = 120;  // ms between lines
const DONE_PAUSE  = 2200; // ms showing result before cycling

/* flatten a line into a plain string for char counting */
const lineText = (tokens) => tokens.map((t) => t.v || "").join("");

export default function CodeTypewriter() {
  const [langIdx, setLangIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]); // fully revealed lines
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [blink, setBlink] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const autoplayRef = useRef(null);

  const lang = LANGUAGES[langIdx];

  /* cursor blink */
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  /* typing engine */
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setVisibleLines([]);
      setCurrentLine(0);
      setCurrentChar(0);
      setShowResult(false);
      setIsTransitioning(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [langIdx]);

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (showResult) {
      if (autoPlay) {
        autoplayRef.current = setTimeout(() => {
          setLangIdx((i) => (i + 1) % LANGUAGES.length);
        }, DONE_PAUSE);
      }
      return;
    }

    if (isTransitioning) return;

    const lines = lang.lines;
    if (currentLine >= lines.length) {
      timerRef.current = setTimeout(() => setShowResult(true), LINE_PAUSE);
      return;
    }

    const fullText = lineText(lines[currentLine]);

    if (currentChar < fullText.length) {
      timerRef.current = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, CHAR_DELAY);
    } else {
      timerRef.current = setTimeout(() => {
        setVisibleLines((prev) => [...prev, currentLine]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, LINE_PAUSE);
    }

    return () => clearTimeout(timerRef.current);
  }, [currentLine, currentChar, showResult, langIdx, autoPlay, isTransitioning]);

  const handleManualLangChange = (index) => {
    setLangIdx(index);
    setAutoPlay(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(autoplayRef.current);
    };
  }, []);

  /* render a line's tokens up to `chars` characters visible */
  const renderTokens = (tokens, chars) => {
    if (!tokens || !Array.isArray(tokens)) return null;
    let used = 0;
    return tokens.map((tok, ti) => {
      if (used >= chars) return null;
      const text = tok.v || "";
      const slice = text.slice(0, chars - used);
      used += text.length;
      return (
        <span key={ti} style={{ color: tokenColor[tok.t] || tokenColor.plain }}>
          {slice}
        </span>
      );
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200/20 dark:border-slate-700/60 shadow-2xl shadow-black/40 bg-slate-900/90 backdrop-blur-xl select-none text-left">
      {/* ── title bar ── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
        </div>

        {/* language tabs */}
        <div className="flex gap-1 ml-3 flex-wrap">
          {LANGUAGES.map((l, i) => (
            <button
              key={l.id}
              onClick={() => handleManualLangChange(i)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all duration-200 whitespace-nowrap ${
                i === langIdx
                  ? "bg-slate-700 text-white shadow-inner ring-1 ring-slate-600"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-700/50"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${l.badge} shrink-0`} />
              {l.label}
            </button>
          ))}
        </div>

        <span className="ml-auto text-[11px] text-slate-500 font-mono shrink-0">
          {lang?.filename}
        </span>
      </div>

      {/* ── code area ── */}
      <div className={`p-5 font-mono text-[13px] leading-[1.75] min-h-[260px] transition-opacity duration-100 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        {/* fully typed lines */}
        {lang?.lines && visibleLines.map((li) => (
          <div key={li} className="flex">
            <span className="select-none text-slate-600 w-6 mr-4 text-right flex-shrink-0 text-[11px] mt-0.5 font-code">
              {li + 1}
            </span>
            <span className="font-code">{renderTokens(lang.lines[li], Infinity)}</span>
          </div>
        ))}

        {/* currently typing line */}
        {lang?.lines && !showResult && currentLine < lang.lines.length && !isTransitioning && (
          <div className="flex">
            <span className="select-none text-slate-600 w-6 mr-4 text-right flex-shrink-0 text-[11px] mt-0.5 font-code">
              {currentLine + 1}
            </span>
            <span className="font-code">
              {renderTokens(lang.lines[currentLine], currentChar)}
              <span
                className="inline-block w-0.5 h-3.5 align-middle ml-px rounded-sm"
                style={{
                  background: blink ? lang.color : "transparent",
                  transition: "background 0.1s",
                }}
              />
            </span>
          </div>
        )}

        {/* result row */}
        {showResult && (
          <div className="mt-3 pt-3 border-t border-slate-700/60 flex flex-wrap items-center gap-x-4 gap-y-1 animate-fade-in">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 size={14} />
              All test cases passed
            </span>
            <span className="flex items-center gap-1 text-slate-500 text-[12px]">
              <Clock size={11} />
              Runtime: {RUNTIME[langIdx]}
            </span>
            <span className="flex items-center gap-1 text-slate-500 text-[12px]">
              <Cpu size={11} />
              Memory: {MEMORY[langIdx]}
            </span>
          </div>
        )}
      </div>

      {/* ── bottom status bar ── */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-800/60 border-t border-slate-700/40 text-[10px] text-slate-500">
        <span
          className="font-semibold"
          style={{ color: lang.color }}
        >
          {lang.label}
        </span>
        <span className="flex items-center gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: lang.color }}
          />
          Code Arena IDE
        </span>
      </div>
    </div>
  );
}
