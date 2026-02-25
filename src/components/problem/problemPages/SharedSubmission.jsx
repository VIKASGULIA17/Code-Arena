import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
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
} from "lucide-react";
import Navbar from "../../Navbar";

// ─── Status config ─────────────────────────────────────────────────────────
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

// ─── Stat Pill ──────────────────────────────────────────────────────────────
const StatPill = ({ icon: Icon, label, value, iconClass = "text-gray-400" }) => (
    <div className="flex flex-col items-center gap-1 px-6 py-4 bg-white rounded-2xl border border-gray-200 shadow-sm min-w-[100px]">
        <Icon size={20} className={iconClass} />
        <span className="text-xl font-extrabold text-gray-800">{value ?? "—"}</span>
        <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
    </div>
);

// ─── Loading skeleton ───────────────────────────────────────────────────────
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
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

// ─── Error state ─────────────────────────────────────────────────────────────
const ErrorState = () => (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 pt-32 flex flex-col items-center gap-4 text-center">
            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle size={40} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Submission Not Found</h1>
            <p className="text-gray-500 max-w-sm">
                This link may have expired or the submission does not exist. Check the URL and try again.
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

// ─── Main Component ───────────────────────────────────────────────────────────
const SharedSubmission = () => {
    const { slug } = useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    useEffect(() => {
        const fetchSharedCode = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/public/shared/${slug}`
                );
                setSubmission(response.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchSharedCode();
    }, [slug]);

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

    const monacoLang =
        submission.language === "c++" ? "cpp" : submission.language;

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
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-6">

                {/* ── Back button ── */}
                <div>
                    <Link
                        to="/problem"
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft size={15} />
                        Back to Problems
                    </Link>
                </div>

                {/* ── Hero banner ── */}
                <div
                    className={`rounded-2xl border ${cfg.heroBorder} bg-linear-to-br ${cfg.heroBg} p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm`}
                >
                    <div className="flex flex-col gap-3">
                        {/* Status */}
                        <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${cfg.dot} animate-pulse`} />
                            <StatusIcon size={26} className={cfg.textColor} />
                            <h1 className={`text-2xl font-extrabold ${cfg.textColor}`}>
                                {cfg.label}
                            </h1>
                        </div>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            {/* Author */}
                            <Link
                                to={`/profile/${submission.username}`}
                                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                            >
                                <User size={14} />
                                {submission.username}
                            </Link>

                            <span className="text-gray-300">·</span>

                            {/* Language */}
                            <span
                                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${langColor}`}
                            >
                                <Code2 size={11} />
                                {langLabel}
                            </span>

                            <span className="text-gray-300">·</span>

                            {/* Date */}
                            <span className="inline-flex items-center gap-1.5 text-gray-500">
                                <Calendar size={13} />
                                {formattedDate}
                            </span>
                        </div>
                    </div>

                    {/* CTA */}
                    <Link
                        to={`/problem/${submission.problemId}`}
                        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all text-sm"
                    >
                        Try this Problem →
                    </Link>
                </div>

                {/* ── Stat pills ── */}
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
                        value={submission.memory != null ? `${submission.memory} MB` : null}
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
                </div>

                {/* ── Code editor card ── */}
                <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-700">
                        <div className="flex items-center gap-2">
                            {/* Traffic lights */}
                            <span className="h-3 w-3 rounded-full bg-red-500" />
                            <span className="h-3 w-3 rounded-full bg-yellow-400" />
                            <span className="h-3 w-3 rounded-full bg-green-500" />
                            <span className="ml-3 text-xs text-gray-600 font-mono">
                                {langLabel} · read-only
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Share link */}
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-black transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/10"
                            >
                                {linkCopied ? (
                                    <>
                                        <Check size={12} className="text-green-600" />
                                        <span className="text-green-600">Link copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 size={12} />
                                        Share
                                    </>
                                )}
                            </button>

                            {/* Copy code */}
                            <button
                                onClick={handleCopyCode}
                                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-black transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/10"
                            >
                                {copied ? (
                                    <>
                                        <Check size={12} className="text-green-400" />
                                        <span className="text-green-400">Copied!</span>
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

                    {/* Monaco editor */}
                    <div className="h-[58vh]">
                        <Editor
                            height="100%"
                            language={monacoLang}
                            value={submission.userCode}
                            theme="vs-white"
                            options={{
                                readOnly: true,
                                domReadOnly: true,
                                minimap: { enabled: false },
                                fontSize: 15,
                                lineHeight: 24,
                                padding: { top: 16, bottom: 16 },
                                scrollBeyondLastLine: false,
                                letterSpacing: 0.5,
                            }}
                        />
                    </div>
                </div>

                {/* ── Footer note ── */}
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