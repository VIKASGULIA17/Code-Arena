import React, { useState, useEffect } from "react";
import { CircleCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ResultSection = ({ filters, filteredProblems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const startElement = (currentPage - 1) * itemsPerPage;
  const lastElement = startElement + itemsPerPage;
  const TotalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const currElements = filteredProblems.slice(startElement, lastElement);

  const difficultyStyle = {
    Easy: "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
    Medium: "bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-500/20",
    Hard: "bg-red-50 dark:bg-red-500/15 text-red-700 dark:text-red-400 border-red-100 dark:border-red-500/20",
  };

  return (
    <div className="card-elevated overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-3.5 px-6 bg-gray-50 dark:bg-slate-800/60 border-b border-gray-200 dark:border-slate-700/50">
        <div className="flex items-center gap-8">
          <span className="w-8">Status</span>
          <span>Title</span>
        </div>
        <div className="hidden sm:flex items-center gap-10">
          <span>Acceptance</span>
          <span className="w-20 text-center">Difficulty</span>
        </div>
      </div>

      {/* Rows */}
      {currElements.length > 0 ? (
        currElements.map((obj, idx) => (
          <div
            key={obj.sno || idx}
            className={`flex items-center justify-between py-3.5 px-6 transition-colors hover:bg-gray-50/80 dark:hover:bg-slate-700/30 ${
              idx !== currElements.length - 1 ? "border-b border-gray-100 dark:border-slate-700/30" : ""
            }`}
          >
            <div className="flex items-center gap-8 min-w-0">
              <div className="w-8 flex-shrink-0">
                {obj.status === true ? (
                  <CircleCheck size={20} className="text-emerald-500 fill-emerald-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-slate-600" />
                )}
              </div>
              <div className="min-w-0">
                <Link
                  to={`/problem/${obj.id}`}
                  className="text-sm font-medium text-gray-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1"
                >
                  {obj.sno}. {obj.title}
                </Link>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {(obj.topicTags ?? []).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 px-2 py-0.5 rounded-md text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-10 flex-shrink-0">
              <span className="text-sm text-gray-500 dark:text-slate-400 font-medium">{obj.acceptanceRate}</span>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border w-20 text-center ${
                  difficultyStyle[obj.difficulty] || "bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-slate-400"
                }`}
              >
                {obj.difficulty}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-400 dark:text-slate-500 text-lg font-medium">No problems match your filters.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredProblems.length > 0 && (
        <div className="py-3.5 px-6 bg-gray-50 dark:bg-slate-800/60 border-t border-gray-200 dark:border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
            Showing <span className="text-gray-700 dark:text-slate-200">{startElement + 1}</span> to{" "}
            <span className="text-gray-700 dark:text-slate-200">{Math.min(lastElement, filteredProblems.length)}</span> of{" "}
            <span className="text-gray-700 dark:text-slate-200">{filteredProblems.length}</span> results
          </p>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 transition-colors text-gray-600 dark:text-slate-300"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
            >
              1
            </button>

            {TotalPages > 1 && (
              <>
                {currentPage > 3 && (
                  <span className="px-1.5 text-gray-400 dark:text-slate-500 text-sm">…</span>
                )}
                {currentPage !== 1 && currentPage !== TotalPages && (
                  <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 text-white">
                    {currentPage}
                  </button>
                )}
                {currentPage < TotalPages - 2 && (
                  <span className="px-1.5 text-gray-400 dark:text-slate-500 text-sm">…</span>
                )}
                <button
                  onClick={() => setCurrentPage(TotalPages)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === TotalPages
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                >
                  {TotalPages}
                </button>
              </>
            )}

            <button
              disabled={currentPage === TotalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, TotalPages))}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 transition-colors text-gray-600 dark:text-slate-300"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultSection;
