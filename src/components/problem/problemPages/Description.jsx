import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  ArrowLeft,
  Code,
  FileQuestion,
  Tag,
  ChevronDown,
} from "lucide-react";

const Description = ({ description, basicInfo }) => {
  // State to manage the visibility of the tags dropdown
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const isAvailable = description !== undefined && description !== "";

  // Helper function to dynamically color the difficulty badge
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-500/15 border-emerald-200 dark:border-emerald-500/20";
      case "medium":
        return "text-amber-600 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-500/15 border-amber-200 dark:border-amber-500/20";
      case "hard":
        return "text-rose-600 dark:text-rose-400 bg-rose-100/80 dark:bg-rose-500/15 border-rose-200 dark:border-rose-500/20";
      default:
        return "text-gray-600 dark:text-slate-400 bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600";
    }
  };

  if (!isAvailable) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50/50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 p-8 m-4 transition-all">
        <div className="w-16 h-16 bg-white dark:bg-slate-800 shadow-sm rounded-full flex items-center justify-center mb-5 text-gray-400 dark:text-slate-500 border border-gray-100 dark:border-slate-700 relative">
          <FileQuestion size={32} />
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-400 rounded-full border-2 border-white dark:border-slate-800"></div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-2">
          Description Not Yet Available
        </h2>
        <p className="text-gray-500 dark:text-slate-400 max-w-sm text-center mb-6 text-sm leading-relaxed">
          We haven't published the official Description for this problem yet or
          there might be a Network issue. Check back later!
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mx-3 mt-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-4">
          {basicInfo?.sno ? `${basicInfo.sno}. ` : ""}
          {basicInfo?.title || "Problem Title"}
        </h1>

        {/* Badges Row (Difficulty + Tags) */}
        <div className="flex items-center gap-3 mb-2 relative">
          {/* Difficulty Badge */}
          {basicInfo?.difficulty && (
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getDifficultyColor(
                basicInfo.difficulty
              )}`}
            >
              {basicInfo.difficulty}
            </span>
          )}

          {/* Tags Dropdown Button */}
          {basicInfo?.topicTags && typeof basicInfo.topicTags === "string" && basicInfo.topicTags.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsTagsOpen(!isTagsOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 dark:border-slate-700 text-xs font-semibold bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100 transition-all cursor-pointer"
              >
                <Tag size={12} />
                Tags
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isTagsOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isTagsOpen && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-xl dark:shadow-black/40 rounded-xl z-10 w-64 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="w-full text-xs font-semibold text-gray-400 dark:text-slate-500 mb-1">
                    Related Topics
                  </p>

                  {basicInfo.topicTags.split(',').map((tag, index) => {
                    return (
                      <button
                        key={index}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs font-medium rounded-md hover:bg-blue-50 dark:hover:bg-indigo-500/15 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {tag.trim()}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Markdown Description */}
      <div
        className="mt-6 text-gray-700 dark:text-slate-300 mx-3 mb-10 font-sans 
        [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 dark:[&>h1]:text-slate-50 [&>h1]:mb-6
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-800 dark:[&>h2]:text-slate-100 [&>h2]:mt-8 [&>h2]:mb-4
        [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-800 dark:[&>h3]:text-slate-100 [&>h3]:mt-6 [&>h3]:mb-3
        [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:whitespace-pre-line
        [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6
        [&>li]:mb-2 [&>li]:marker:text-gray-400 dark:[&>li]:marker:text-slate-500
        [&>pre]:bg-gray-100 dark:[&>pre]:bg-slate-800 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:border [&>pre]:border-gray-200 dark:[&>pre]:border-slate-700
        [&_code]:bg-gray-100 dark:[&_code]:bg-slate-800 [&_code]:text-gray-800 dark:[&_code]:text-slate-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-sm
        [&>strong]:font-semibold [&>strong]:text-gray-900 dark:[&>strong]:text-slate-100
      "
      >
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Description;