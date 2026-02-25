import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
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
} from "lucide-react";
import axios from "axios";

const STATUS_CONFIG = {
    ACCEPTED: {
        label: "Accepted",
        icon: CheckCircle2,
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        badge: "bg-green-100 text-green-700 border-green-300",
        glow: "shadow-green-100",
    },
    WRONG_ANSWER: {
        label: "Wrong Answer",
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-50",
        border: "border-red-200",
        badge: "bg-red-100 text-red-700 border-red-300",
        glow: "shadow-red-100",
    },
    TIME_LIMIT_EXCEEDED: {
        label: "Time Limit Exceeded",
        icon: Clock,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
        glow: "shadow-yellow-100",
    },
    COMPILATION_ERROR: {
        label: "Compilation Error",
        icon: AlertTriangle,
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
        badge: "bg-orange-100 text-orange-700 border-orange-300",
        glow: "shadow-orange-100",
    },
};

const LANG_COLORS = {
    python: "bg-blue-100 text-blue-700 border-blue-200",
    "c++": "bg-purple-100 text-purple-700 border-purple-200",
    js: "bg-yellow-100 text-yellow-700 border-yellow-200",
    java: "bg-orange-100 text-orange-700 border-orange-200",
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
        }
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

                {/* Expand toggle */}
                <button
                    onClick={() => setExpanded((p) => !p)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                >
                    {expanded ? "Hide code" : "View code"}
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>

            <div className="bg-white px-5 py-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-100">
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
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors"
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
                        {submission.memory} MB
                    </span>
                )}
            </div>

            {expanded && (
                <div className="bg-slate-200 relative rounded-xl">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
                        <span className="text-xs text-black font-mono">
                            {langLabel}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleShareLink}
                                className="flex items-center gap-1.5 text-xs text-black hover:text-black transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/10"
                            >
                                {linkCopied ? (
                                    <>
                                        <Check size={13} className="text-green-400" />
                                        <span className="text-green-400">Link copied!</span>
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
                                    className="flex items-center gap-1.5 text-xs text-black hover:text-blue-600 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/10"
                                >
                                    <BookOpenCheck size={13} />
                                    Open
                                </Link>
                            )}

                            {/* Copy code */}
                            <button
                                onClick={handleCopyCode}
                                className="flex items-center gap-1.5 text-xs text-black hover:text-black transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/10"
                            >
                                {copied ? (
                                    <>
                                        <Check size={13} className="text-green-400" />
                                        <span className="text-green-400">Copied!</span>
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


                    <Editor
                        height="50vh"
                        value={submission.userCode}
                        // value={currentCode}
                        language={submission.language === "c++" ? "cpp" : submission.language}
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
            )}
        </div>
    );
};



const Submission = ({ id }) => {
    const [filter, setFilter] = useState("ALL");

    const [submissions, setSubmissions] = useState([]);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/submissions/problem/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setSubmissions(response.data)
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSubmissions();
    }, [id]);

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
    const accepted = submissions.filter(
        (s) => s.status === "ACCEPTED"
    ).length;
    const rate = total > 0 ? Math.round((accepted / total) * 100) : 0;

    return (
        <div className="py-6 px-1 flex flex-col gap-5">
            <div className="rounded-2xl bg-linear-to-r from-blue-500 via-purple-600 to-pink-500 p-px shadow-lg">
                <div className="rounded-[calc(1rem-1px)] bg-white px-6 py-4 flex flex-wrap items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">
                            Total Submissions
                        </span>
                        <span className="text-3xl font-extrabold text-gray-900">
                            {total}
                        </span>
                    </div>
                    <div className="w-px h-10 bg-gray-100 hidden sm:block" />
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">
                            Accepted
                        </span>
                        <span className="text-3xl font-extrabold text-green-600">
                            {accepted}
                        </span>
                    </div>
                    <div className="w-px h-10 bg-gray-100 hidden sm:block" />
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
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
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
                            className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${isActive
                                    ? cfg
                                        ? `${cfg.badge} shadow-sm`
                                        : "bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-transparent shadow-sm"
                                    : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400"
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
