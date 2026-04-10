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
        return "text-emerald-600 bg-emerald-100/80 border-emerald-200";
      case "medium":
        return "text-amber-600 bg-amber-100/80 border-amber-200";
      case "hard":
        return "text-rose-600 bg-rose-100/80 border-rose-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  if (!isAvailable) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 p-8 m-4 transition-all">
        <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-5 text-gray-400 border border-gray-100 relative">
          <FileQuestion size={32} />
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Description Not Yet Available
        </h2>
        <p className="text-gray-500 max-w-sm text-center mb-6 text-sm leading-relaxed">
          We haven't published the official Description for this problem yet or
          there might be a Network issue. Check back later!
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
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
          {basicInfo?.topicTags && basicInfo.topicTags.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsTagsOpen(!isTagsOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-xs font-semibold bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer"
              >
                <Tag size={12} />
                Tags
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isTagsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Tags Dropdown Panel */}
              {isTagsOpen && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-100 shadow-xl rounded-xl z-10 w-64 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="w-full text-xs font-semibold text-gray-400 mb-1">
                    Related Topics
                  </p>
                  {basicInfo.topicTags.map((tag, index) => {
                    // Handles both string arrays and object arrays (e.g. {name: "Array"})
                    const tagName = typeof tag === "object" ? tag.name : tag;
                    return (
                      <button
                        key={index}
                        className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {tagName}
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
        className="mt-6 text-gray-700 mx-3 mb-10 font-sans 
        [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-6
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-800 [&>h2]:mt-8 [&>h2]:mb-4
        [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mt-6 [&>h3]:mb-3
        [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:whitespace-pre-line
        [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6
        [&>li]:mb-2 [&>li]:marker:text-gray-400
        [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:border [&>pre]:border-gray-200
        [&_code]:bg-gray-100 [&_code]:text-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-sm
        [&>strong]:font-semibold [&>strong]:text-gray-900
      "
      >
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Description;