import React, { useState, useMemo, useEffect } from "react";

import { CircleCheck } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { dsaProblems } from "../../data/dsaProblem";
import Problems from "../../Pages/Problems";

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

  return (
    <div className="w-full mt-10 rounded-t-xl h-auto overflow-x-auto shadow-2xl">
      <div className="flex min-w-[500px] lg:w-full lg:gap-10 justify-between text-xl text-black/50 font-semibold py-4 px-10 bg-black/10">
        <div className="flex gap-10">
          <h3 className="">Status</h3>
          <h2>Title</h2>
        </div>
        <div className="flex gap-10">
          <h2>Acceptance</h2>
          <h2>Difficulty</h2>
        </div>
      </div>
      {currElements.length > 0 ? (
        currElements.map((obj, idx) => (
          <div
            key={obj.id || idx}
            className="flex gap-10 justify-between min-w-[500px] font-semibold py-4 px-10"
          >
            <div className="flex gap-10 ">
              {obj.status === true ? (
                <CircleCheck className="bg-green-500 min-w-7 min-h-7 rounded-full text-white" />
              ) : (
                <CircleCheck className="bg-transparent rounded-full text-transparent" />
              )}

              <div className="">
                <h2>
                  <Link
                    to={`/problem/${obj.id}`}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {obj.id}. {obj.title}
                  </Link>
                </h2>
                <div
                  className=" 

                grid grid-rows-2 items-center text-center
                lg:flex gap-3 mt-1"
                >
                  {obj.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="bg-black/5 rounded-2xl text-gray-400 px-3 py-1 text-sm font-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-10 justify-end">
              <h2 className="text-gray-500">{obj.acceptance}</h2>
              <div>
                <h2
                  className={`${
                    obj.difficulty === "Easy"
                      ? "bg-green-300 text-green-700"
                      : obj.difficulty === "Medium"
                      ? "bg-yellow-200 text-yellow-600"
                      : "bg-red-200 text-red-700"
                  } px-3 py-1 w-20 text-center rounded-2xl`}
                >
                  {obj.difficulty}
                </h2>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex text-start lg:text-center px-10 flex-col py-20 min-w-[500px] bg-white">
          <p className="text-gray-500 text-xl font-medium">
            No problems match your filters.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-start px-20 lg:text-center text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
      {filteredProblems.length > 0 && (
        <div className="py-4 min-w-[500px] px-4 bg-black/5 rounded-b-xl flex justify-between items-center">
          
          {/* 1. Dynamic Results Label */}
          <h2 className="px-7 font-semibold text-gray-600 ">
            Showing <span>{startElement + 1}</span> to{" "}
            <span>{Math.min(lastElement, filteredProblems.length)}</span> of{" "}
            <span>{filteredProblems.length}</span> results
          </h2>

          {/* 2. Pagination Buttons */}
          <div className="flex gap-3">
            {/* Previous Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="border border-black/10 p-2 rounded-lg hover:bg-white disabled:opacity-50 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Page 1 */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`border border-black/10 px-3 rounded-lg transition-colors ${
                currentPage === 1
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              1
            </button>

            {/* Middle Logic: Only show if there are more than 1 page */}
            {TotalPages > 1 && (
              <>
                {/* Ellipsis if current page is far from start */}
                {currentPage > 3 && (
                  <span className="px-2 self-center text-gray-400">...</span>
                )}

                {/* Dynamic Middle Button */}
                {currentPage !== 1 && currentPage !== TotalPages && (
                  <button className="border border-black/10 px-3 rounded-lg bg-blue-600 text-white">
                    {currentPage}
                  </button>
                )}

                {/* Ellipsis if current page is far from end */}
                {currentPage < TotalPages - 2 && (
                  <span className="px-2 self-center text-gray-400">...</span>
                )}

                {/* Always Show Last Page */}
                <button
                  onClick={() => setCurrentPage(TotalPages)}
                  className={`border border-black/10 px-3 rounded-lg transition-colors ${
                    currentPage === TotalPages
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {TotalPages}
                </button>
              </>
            )}

            {/* Next Button */}
            <button
              disabled={currentPage === TotalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, TotalPages))
              }
              className="border border-black/10 p-2 rounded-lg hover:bg-white disabled:opacity-50 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultSection;
