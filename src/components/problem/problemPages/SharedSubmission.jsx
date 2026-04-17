import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "../../../context/ThemeContext";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Code2,
  Zap,
  MemoryStick,
  Calendar,
  ArrowLeft,
  Copy,
  Check,
  Share2,
  ZapIcon,
} from "lucide-react";
import { EnhancedNavbar } from "../../Navbar";
import TestingPage from "../../../../AIService/TestingPage";

const STATUS_CONFIG = {
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    textColor: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700 border-green-300",
    heroBg: "from-green-50 to-emerald-50",
    heroBorder: "border-green-200",
    dot: "bg-green-500",
  },
  WRONG_ANSWER: {
    label: "Wrong Answer",
    icon: XCircle,
    textColor: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700 border-red-300",
    heroBg: "from-red-50 to-rose-50",
    heroBorder: "border-red-200",
    dot: "bg-red-500",
  },
  TIME_LIMIT_EXCEEDED: {
    label: "Time Limit Exceeded",
    icon: Clock,
    textColor: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
    heroBg: "from-yellow-50 to-amber-50",
    heroBorder: "border-yellow-200",
    dot: "bg-yellow-500",
  },
  COMPILATION_ERROR: {
    label: "Compilation Error",
    icon: AlertTriangle,
    textColor: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700 border-orange-300",
    heroBg: "from-orange-50 to-amber-50",
    heroBorder: "border-orange-200",
    dot: "bg-orange-500",
  },
};

const LANG_LABELS = {
  python: "Python",
  "c++": "C++",
  cpp: "C++",
  javascript: "JavaScript",
  js: "JavaScript",
  java: "Java",
};

const LANG_COLORS = {
  python: "bg-blue-100 text-blue-700 border-blue-200",
  "c++": "bg-purple-100 text-purple-700 border-purple-200",
  cpp: "bg-purple-100 text-purple-700 border-purple-200",
  javascript: "bg-yellow-100 text-yellow-700 border-yellow-200",
  js: "bg-yellow-100 text-yellow-700 border-yellow-200",
  java: "bg-orange-100 text-orange-700 border-orange-200",
};

const StatPill = ({
  icon: Icon,
  label,
  value,
  iconClass = "text-gray-400",
}) => (
  <div className="flex flex-col items-center gap-1 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm min-w-[100px]">
    <Icon size={20} className={iconClass} />
    <span className="text-xl font-extrabold text-gray-800 dark:text-slate-100">{value ?? "—"}</span>
    <span className="text-xs text-gray-400 dark:text-slate-500 uppercase tracking-wide">
      {label}
    </span>
  </div>
);

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <EnhancedNavbar />
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-12 flex flex-col gap-6 animate-pulse">
      <div className="h-40 rounded-2xl bg-gray-200" />
      <div className="flex gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 flex-1 rounded-2xl bg-gray-200" />
        ))}
      </div>
      <div className="h-[55vh] rounded-2xl bg-gray-200" />
    </div>
  </div>
);

const ErrorState = () => (
  <div className="min-h-screen bg-gray-50">
    <EnhancedNavbar />
    <div className="max-w-5xl mx-auto px-4 pt-32 flex flex-col items-center gap-4 text-center">
      <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
        <XCircle size={40} className="text-red-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800">Submission Not Found</h1>
      <p className="text-gray-500 max-w-sm">
        This link may have expired or the submission does not exist. Check the
        URL and try again.
      </p>
      <Link
        to="/problem"
        className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Problems
      </Link>
    </div>
  </div>
);

const SharedSubmission = () => {
  const { slug } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { resolvedTheme } = useTheme();
  const syntaxTheme = resolvedTheme === "dark" ? vscDarkPlus : materialLight;
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [codeReview, setcodeReview] = useState(false)


  
  useEffect(() => {
    const fetchSharedCode = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/submission/getSharedSubmission/${slug}`,
        );
        // console.log(response.data)
        setSubmission(response.data.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSharedCode();
  }, [slug]);

//   console.log(submission);
  if (loading) return <LoadingSkeleton />;
  if (error || !submission) return <ErrorState />;

  const cfg = STATUS_CONFIG[submission.status] || STATUS_CONFIG.WRONG_ANSWER;
  const StatusIcon = cfg.icon;
  const langLabel = LANG_LABELS[submission.language] || submission.language;
  const langColor =
    LANG_COLORS[submission.language] ||
    "bg-gray-100 text-gray-600 border-gray-200";

  const formattedDate = submission.submittedAt
    ? new Date(submission.submittedAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const rawLang = (submission?.language || "javascript").toLowerCase();

  const MONACO_LANG_MAP = {
    "c++": "cpp",
    cpp: "cpp",
    javascript: "javascript",
    js: "javascript",
    python: "python",
    py: "python",
    java: "java",
  };

  const monacoLang = MONACO_LANG_MAP[rawLang] || rawLang;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(submission.userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1120]">
      <EnhancedNavbar />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-6">
        <div>
          <Link
            to="/problem"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Problems
          </Link>
        </div>
        <div
          className={`rounded-2xl border ${cfg.heroBorder} bg-linear-to-br ${cfg.heroBg} p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${cfg.dot} animate-pulse`}
              />
              <StatusIcon size={26} className={cfg.textColor} />
              <h1 className={`text-2xl font-extrabold ${cfg.textColor}`}>
                {cfg.label}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link
                to={`/profile/${submission.username}`}
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <User size={14} />
                {submission.username}
              </Link>

              <span className="text-gray-300">·</span>

              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${langColor}`}
              >
                <Code2 size={11} />
                {langLabel}
              </span>

              <span className="text-gray-300">·</span>

              <span className="inline-flex items-center gap-1.5 text-gray-500">
                <Calendar size={13} />
                {formattedDate}
              </span>
            </div>
          </div>
          <Link
            to={`/problem/${submission.problemId}`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all text-sm"
          >
            Try this Problem →
          </Link>
        </div>

        <div className="flex flex-wrap gap-10">
          <StatPill
            icon={Zap}
            label="Runtime"
            value={submission.time != null ? `${submission.time} ms` : null}
            iconClass="text-yellow-500"
          />
          <StatPill
            icon={MemoryStick}
            label="Memory"
            value={
              submission.memory != null
                ? `${parseFloat(submission.memory / 1024).toFixed(2)} MB`
                : null
            }
            iconClass="text-purple-400"
          />
          <StatPill
            icon={Code2}
            label="Language"
            value={langLabel}
            iconClass="text-blue-400"
          />

          <StatPill
            icon={Calendar}
            label="Submitted"
            value={
              submission.submittedAt
                ? new Date(submission.submittedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : null
            }
            iconClass="text-gray-400"
          />
          <button className="px-4 py-2 flex  border-purple-500 items-center h-10 my-8 rounded-2xl border  cursor-pointer bg-purple-100"
          onClick={()=>{
            setcodeReview(!codeReview);
          }}
          >
            <ZapIcon className="text-purple-400"/>
            <p className="font-bold text-lg text-brand-gradient">Ai Code Review</p>
          </button>
        </div>

        {codeReview && 
        <TestingPage submittedCode={submission.userCode} autoExecute={true} />
      }

        <div className={`rounded-2xl border ${resolvedTheme === 'dark' ? 'border-slate-800 bg-[#0f172a] shadow-lg' : 'border-gray-200 bg-[#FAFAFA] shadow-md'} overflow-hidden`}>
          <div className={`flex items-center justify-between px-5 py-3 border-b ${resolvedTheme === 'dark' ? 'border-slate-800 bg-[#0b1120]' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className={`ml-3 text-xs font-mono opacity-80 ${resolvedTheme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                {langLabel} · read-only
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer px-3 py-1.5 rounded-lg ${resolvedTheme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-black hover:bg-slate-100'}`}
              >
                {linkCopied ? (
                  <>
                    <Check size={12} className="text-green-500" />
                    <span className="text-green-500">Link copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={12} />
                    Share
                  </>
                )}
              </button>

              <button
                onClick={handleCopyCode}
                className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer px-3 py-1.5 rounded-lg ${resolvedTheme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-black hover:bg-slate-100'}`}
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto h-[58vh]">
            <SyntaxHighlighter
              language={monacoLang}
              style={syntaxTheme}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                fontSize: '15px',
                lineHeight: '1.6',
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                background: 'transparent',
                minHeight: '100%'
              }}
              wrapLines={true}
              wrapLongLines={false}
            >
              {submission.userCode}
            </SyntaxHighlighter>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Shared via{" "}
          <span className="font-semibold text-brand-gradient bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Code Arena
          </span>{" "}
          · This code is read-only
        </p>
      </div>

      
    </div>

   
  );
};

export default SharedSubmission;
