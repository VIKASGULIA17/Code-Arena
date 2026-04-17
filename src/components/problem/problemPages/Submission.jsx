import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Code2,
  Calendar,
  Zap,
  MemoryStick,
  Copy,
  Check,
  Share2,
  ChevronDown,
  ChevronUp,
  BookOpenCheck,
  Airplay,
  Upload,
  Bolt,
  ZapIcon,
} from "lucide-react";
import axios from "axios";
import { useAppContext } from "../../../context/AppContext";
import { useTheme } from "../../../context/ThemeContext";

const STATUS_CONFIG = {
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-500/10",
    border: "border-green-200 dark:border-green-500/20",
    badge: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/30",
    glow: "shadow-green-100 dark:shadow-none",
  },
  WRONG_ANSWER: {
    label: "Wrong Answer",
    icon: XCircle,
    color: "text-red-500 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-500/10",
    border: "border-red-200 dark:border-red-500/20",
    badge: "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-500/30",
    glow: "shadow-red-100 dark:shadow-none",
  },
  TIME_LIMIT_EXCEEDED: {
    label: "Time Limit Exceeded",
    icon: Clock,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-500/10",
    border: "border-yellow-200 dark:border-yellow-500/20",
    badge: "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-500/30",
    glow: "shadow-yellow-100 dark:shadow-none",
  },
  COMPILATION_ERROR: {
    label: "Compilation Error",
    icon: AlertTriangle,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-200 dark:border-orange-500/20",
    badge: "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-500/30",
    glow: "shadow-orange-100 dark:shadow-none",
  },
};

const LANG_COLORS = {
  python: "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  "c++": "bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
  js: "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20",
  java: "bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20",
};

const LANG_LABELS = {
  python: "Python",
  "c++": "C++",
  js: "JavaScript",
  java: "Java",
};

const SubmissionCard = ({ submission }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const syntaxTheme = resolvedTheme === "dark" ? vscDarkPlus : materialLight;

  const cfg = STATUS_CONFIG[submission.status] || STATUS_CONFIG.WRONG_ANSWER;
  const StatusIcon = cfg.icon;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(submission.userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}/submission/${submission.slug}`;
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const formattedDate = new Date(submission.submittedAt).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const langColor =
    LANG_COLORS[submission.language] ||
    "bg-gray-100 text-gray-700 border-gray-200";
  const langLabel = LANG_LABELS[submission.language] || submission.language;

  return (
    <div
      className={`rounded-2xl border ${cfg.border} ${cfg.glow} shadow-md overflow-hidden transition-all duration-300`}
    >
      <div className={`${cfg.bg} px-5 py-4 flex items-center justify-between`}>
        {/* Status */}
        <div className="flex items-center gap-2">
          <StatusIcon size={22} className={cfg.color} />
          <span className={`font-bold text-base ${cfg.color}`}>
            {cfg.label}
          </span>
        </div>
        <div className="flex gap-6">
          {submission.slug && submission.slug !== "null" && (
            <Link
              to={`/submission/${submission.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors cursor-pointer px-3 py-1 border border-pink-300 dark:border-pink-500/20 rounded-2xl font-semibold bg-pink-100 dark:bg-pink-500/10"
            >
              Ai Review
              <ZapIcon size={15} />
            </Link>
          )}

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded((p) => !p)}
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            {expanded ? "Hide code" : "View code"}
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 px-5 py-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-100 dark:border-slate-800">
        {/* Language */}
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${langColor}`}
        >
          <Code2 size={12} />
          {langLabel}
        </span>

        {/* User */}
        <Link
          to={`/profile/${submission.username}`}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <User size={12} />
          <span className="font-medium">{submission.username}</span>
        </Link>

        {/* Date */}
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar size={12} />
          {formattedDate}
        </span>

        {/* Time */}
        {submission.time != null && submission.time > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
            <Zap size={12} className="text-yellow-500" />
            {submission.time} ms
          </span>
        )}

        {/* Memory */}
        {submission.memory != null && submission.memory > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
            <MemoryStick size={12} className="text-purple-400" />
            {parseFloat(submission.memory / 1024).toFixed(2)} MB
          </span>
        )}
      </div>

      {expanded && (
        <div className={`relative rounded-xl overflow-hidden mt-1 mx-1 mb-1 ${resolvedTheme === 'dark' ? 'bg-[#0f172a] shadow-inner' : 'bg-[#FAFAFA] border border-slate-200'}`}>
          {/* Toolbar */}
          <div className={`flex items-center justify-between px-4 py-2 border-b ${resolvedTheme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
            <span className={`text-xs font-mono font-semibold ${resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{langLabel}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareLink}
                className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer px-2 py-1 rounded-md ${resolvedTheme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-black hover:bg-slate-200'}`}
              >
                {linkCopied ? (
                  <>
                    <Check size={13} className="text-green-500" />
                    <span className="text-green-500">Link copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={13} />
                    Share
                  </>
                )}
              </button>
              {submission.slug && submission.slug !== "null" && (
                <Link
                  to={`/submission/${submission.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer px-2 py-1 rounded-md ${resolvedTheme === 'dark' ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-800' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200'}`}
                >
                  <BookOpenCheck size={13} />
                  Open
                </Link>
              )}

              {/* Copy code */}
              <button
                onClick={handleCopyCode}
                className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer px-2 py-1 rounded-md ${resolvedTheme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-black hover:bg-slate-200'}`}
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <SyntaxHighlighter
              language={submission.language === "c++" ? "cpp" : submission.language}
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
              {submission.userCode}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};

const Submission = ({ id }) => {
  const [filter, setFilter] = useState("ALL");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [submissions, setSubmissions] = useState([]);
  const handleReverse = () => {
    setSubmissions((prevSubmissions) => [...prevSubmissions].reverse());
  };
  const { jwtToken } = useAppContext();
  // const value="two-sum-101";
  const fetchSubmissions = async () => {
    const token = jwtToken || localStorage.getItem("jwtToken");
    if (!token) {
      console.warn("No auth token — skipping submission fetch.");
      setSubmissions([]);
      return;
    }
    try {
      const response = await axios.get(`${BACKEND_URL}/submission/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setSubmissions(response.data);
        handleReverse();
      } else {
        console.warn("Backend did not return an array. Defaulting to empty.");
        setSubmissions([]);
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
      setSubmissions([]);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [id, jwtToken]); // re-fetch when token becomes available

  const statusOptions = [
    { value: "ALL", label: "All" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "WRONG_ANSWER", label: "Wrong Answer" },
    { value: "TIME_LIMIT_EXCEEDED", label: "TLE" },
    { value: "COMPILATION_ERROR", label: "CE" },
  ];

  const filtered =
    filter === "ALL"
      ? submissions
      : submissions.filter((s) => s.status === filter);

  // Stats
  const total = submissions.length;
  const accepted = submissions.filter((s) => s.status === "ACCEPTED").length;
  const rate = total > 0 ? Math.round((accepted / total) * 100) : 0;

  return (
    <div className="py-6 px-1 flex flex-col gap-5">
      <div className="rounded-2xl bg-linear-to-r from-blue-500 via-purple-600 to-pink-500 p-px shadow-lg dark:shadow-purple-900/10">
        <div className="rounded-[calc(1rem-1px)] bg-white dark:bg-slate-900 px-6 py-4 flex flex-wrap items-center gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Total Submissions
            </span>
            <span className="text-3xl font-extrabold text-gray-900 dark:text-slate-100">
              {total}
            </span>
          </div>
          <div className="w-px h-10 bg-gray-100 dark:bg-slate-800 hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Accepted
            </span>
            <span className="text-3xl font-extrabold text-green-600 dark:text-green-500">
              {accepted}
            </span>
          </div>
          <div className="w-px h-10 bg-gray-100 dark:bg-slate-800 hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Acceptance Rate
            </span>
            <span className="text-3xl font-extrabold text-brand-gradient bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {rate}%
            </span>
          </div>

          <div className="ml-auto flex-1 min-w-[120px] max-w-[200px]">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Accepted / Total</span>
              <span>{rate}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700"
                style={{ width: `${rate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusOptions.map((opt) => {
          const isActive = filter === opt.value;
          const cfg = opt.value !== "ALL" ? STATUS_CONFIG[opt.value] : null;
          return (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                isActive
                  ? cfg
                    ? `${cfg.badge} shadow-sm dark:shadow-none`
                    : "bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-transparent shadow-sm dark:shadow-none"
                  : "bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
          <Code2 size={40} className="opacity-30" />
          <p className="text-sm">No submissions found for this filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((sub) => (
            <SubmissionCard key={sub.slug} submission={sub} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Submission;
