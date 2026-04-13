"use client";

import { useEffect, useState, useRef } from "react";


import { Button } from "@/components/ui/button";
import {
  ArrowRight, Code2, Users, Zap, BarChart3,
  Sparkles, Award, ChevronRight, CheckCircle2,
  Clock, Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";

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

/* ─── typing speed (chars/frame at ~60fps) ─────────── */
const CHAR_DELAY  = 30;   // ms per character
const LINE_PAUSE  = 120;  // ms between lines
const DONE_PAUSE  = 2200; // ms showing result before cycling

/* flatten a line into a plain string for char counting */
const lineText = (tokens) => tokens.map((t) => t.v).join("");

/* ─── CodeTypewriter component ─────────────────────── */
function CodeTypewriter() {
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
      const slice = tok.v.slice(0, chars - used);
      used += tok.v.length;
      return (
        <span key={ti} style={{ color: tokenColor[tok.t] || tokenColor.plain }}>
          {slice}
        </span>
      );
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-black/40 bg-slate-900 select-none">
      {/* ── title bar ── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700/50">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
        </div>

        {/* language tabs - naturally circular */}
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
            <span className="select-none text-slate-600 w-6 mr-4 text-right flex-shrink-0 text-[11px] mt-0.5">
              {li + 1}
            </span>
            <span>{renderTokens(lang.lines[li], Infinity)}</span>
          </div>
        ))}

        {/* currently typing line */}
        {lang?.lines && !showResult && currentLine < lang.lines.length && !isTransitioning && (
          <div className="flex">
            <span className="select-none text-slate-600 w-6 mr-4 text-right flex-shrink-0 text-[11px] mt-0.5">
              {currentLine + 1}
            </span>
            <span>
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

/* ─── rotating words for headline ── */
const ROTATING_WORDS = ["Algorithms", "Data Structures", "System Design", "Dynamic Programming"];

/* ─── HeroSection ───────────────────────────────────── */
export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
        setFade(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Submissions",  value: "1.2M+",  icon: Code2,  color: "text-indigo-600 bg-indigo-50"  },
    { label: "Active Users", value: "50K+",   icon: Users,  color: "text-purple-600 bg-purple-50"  },
    { label: "Problems",     value: "2,400+", icon: Zap,    color: "text-pink-600   bg-pink-50"    },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Problem Archive",
      description: "Practice with 2000+ problems curated by difficulty, company, and tags with detailed analytics.",
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: Sparkles,
      title: "Live Contests",
      description: "Join weekly contests, compete in real time, and climb the global leaderboard.",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: Zap,
      title: "Algorithm Visualizer",
      description: "Interactive visualizers for sorting, searching, dynamic programming, and more.",
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  const pills = [
    { icon: Code2,    label: "2,400+ Problems" },
    { icon: Users,    label: "50K+ Developers" },
    { icon: Sparkles, label: "Weekly Contests"  },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-indigo-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative section-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Left ── */}
            <div className="space-y-7">

              {/* Live contest badge */}
              <div className="flex items-center gap-3">
                <a
                  href="/contest"
                  className="inline-flex items-center gap-2 bg-white border border-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 group"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                  </span>
                  Weekly Contest #352 is Live
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                <span className="text-xs text-slate-400 font-medium">Ends in <span className="text-slate-600 font-semibold">2h 14m</span></span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-[3.75rem] font-extrabold text-slate-900 leading-[1.06] tracking-tight">
                  Master
                  <span
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 transition-opacity duration-300"
                    style={{ opacity: fade ? 1 : 0 }}
                  >
                    {ROTATING_WORDS[wordIdx]}.
                  </span>
                </h1>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-400 leading-tight">
                  Ace the Interview.
                </h2>
              </div>

              {/* Sub-text */}
              <p className="text-base text-slate-500 max-w-md leading-relaxed">
                The sharpest platform to practice DSA, compete in global contests,
                and land your dream tech job — all in one place.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {pills.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-[12px] font-medium px-3 py-1 rounded-full shadow-sm"
                  >
                    <Icon size={12} className="text-indigo-500" />
                    {label}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/problem">
                  <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-7 h-12 rounded-xl shadow-lg shadow-indigo-300/40 hover:shadow-indigo-300/60 transition-all duration-200 text-sm">
                    Start Solving
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link to="/algovisualizer">
                  <button className="group inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 h-12 rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 text-sm">
                    <Sparkles size={15} className="text-purple-500 group-hover:rotate-12 transition-transform" />
                    Explore Visualizer
                  </button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-1 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {[1, 29, 3, 4, 5].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc?img=${i}`}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="#f59e0b">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="ml-1 text-xs font-semibold text-slate-700">4.9</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Trusted by <span className="font-semibold text-slate-600">1M+ developers</span> worldwide</p>
                </div>
              </div>

            </div>

            {/* ── Right: animated code card ── */}
            <div className="hidden lg:block relative z-10">
              <CodeTypewriter />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="px-6 pb-20 section-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card-elevated p-6 flex items-center gap-5 hover-lift">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Daily Challenge ─── */}
      <section className="px-6 pb-20 section-wrapper">
        <div className="card-elevated p-0 overflow-hidden hover-lift">
          <div className="flex flex-col md:flex-row items-center gap-6 p-8">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Daily Challenge
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-600 rounded-full">NEW</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Reverse Linked List II</h4>
              <p className="text-slate-500 text-sm max-w-lg mb-3">
                Given the head of a singly linked list and two integers left and right, reverse the nodes from position left to position right.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge-warning">Medium</span>
                <span className="badge-info">Linked List</span>
                <span className="badge-info">Recursion</span>
              </div>
            </div>
            <Link to="/problem/1" className="shrink-0">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm shadow-indigo-200/50 h-11 px-5 text-sm font-semibold transition-all duration-200">
                Solve Now <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="px-6 py-24 section-wrapper">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Everything you need to grow
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            From beginner concepts to advanced competitive programming, modern tools to help you succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card-elevated p-8 hover-lift group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-24 section-wrapper">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Join{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                50,000+ developers
              </span>
              <br />
              sharpening their skills
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Whether you're preparing for a technical interview or improving problem-solving skills, Code Arena is the place for you.
            </p>
            <Link to="/problem">
              <Button
                size="lg"
                className="bg-white hover:bg-slate-100 text-slate-900 rounded-full h-12 px-8 text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                Get Started for Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}