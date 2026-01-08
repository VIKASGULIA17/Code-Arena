import React, { useState } from "react";

import { CircleCheck } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {dsaProblems} from '../../data/dsaProblem';

const ResultSection = () => {
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const startElement = (currentPage - 1) * itemsPerPage;
  const lastElement = startElement + itemsPerPage;

  const TotalPages = Math.ceil(dsaProblems.length / itemsPerPage);

  const currElements = dsaProblems.slice(startElement, lastElement);

  return (
    <div className="w-full mt-10 rounded-t-xl h-auto overflow-scroll shadow-2xl">
      <div className="flex justify-between text-xl text-black/50 font-semibold py-4 px-10 bg-black/10">
        <div className="flex gap-10">
          <h3>Status</h3>
          <h2>Title</h2>
        </div>
        <div className="flex gap-10">
          <h2>Acceptance</h2>
          <h2>Difficulty</h2>
        </div>
      </div>
      {currElements.map((obj, idx) => {
        return (
          <div
            key={idx}
            className="flex justify-between  font-semibold py-4 px-10 "
          >
            <div className="flex gap-10">
              {obj.status == true ? (
                <CircleCheck className="bg-green-500 rounded-full text-white" />
              ) : (
                <CircleCheck className="bg-transparent rounded-full text-transparent" />
              )}

              <div>
                <h2>
                  <Link
                    to={`/problem/${obj.id}`}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {obj.id}. {obj.title}
                  </Link>
                </h2>
                <h4 className="flex gap-3">
                  {obj.tags.map((object, idx) => {
                    return (
                      <h4
                        key={idx}
                        className="bg-black/5 rounded-2xl text-gray-400 px-3 py-1 text-sm"
                      >
                        {object}
                      </h4>
                    );
                  })}
                </h4>
              </div>
            </div>
            <div className="flex gap-10">
              <h2 className="text-gray-500">{obj.acceptance}</h2>
              <div>
                <h2
                  className={`${
                    obj.difficulty == "Easy"
                      ? "bg-green-300 text-green-700"
                      : obj.difficulty == "Medium"
                      ? "bg-yellow-200 text-yellow-600"
                      : "bg-red-200 text-red-700"
                  } px-3 py-1 w-20 text-center rounded-2xl`}
                >
                  {obj.difficulty}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
      <div className="py-4 px-4 bg-black/4 rounded-b-xl flex justify-between">
        <h2 className="px-7 font-semibold text-gray-600 pt-2">
          Showing <span>{startElement + 1}</span> to{" "}
          <span>{Math.min(lastElement, dsaProblems.length)}</span> of{" "}
          <span>{dsaProblems.length}</span> results
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            className="border border-black/10 p-1 rounded-lg"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => {
              setCurrentPage(1);
            }}
            disabled={currentPage === 1}
            className={`border border-black/10 px-3 rounded-lg ${
              currentPage === 1 ? "bg-blue-600 text-white" : ""
            } `}
          >
            1
          </button>
          {currentPage <= 2 ? null : (
            <button className="border border-black/10 px-3 rounded-lg">
              ...
            </button>
          )}
          <button
            onClick={() => {
              if (currentPage === 1) {
                setCurrentPage(2);
              } else if (currentPage === TotalPages) {
                setCurrentPage(TotalPages - 1);
              }
            }}
            className={`border border-black/10 px-3 rounded-lg ${
              currentPage != 1 && currentPage != TotalPages
                ? "bg-blue-600 text-white"
                : ""
            } `}
          >
            {currentPage === 1 ? (
              <div>{currentPage + 1}</div>
            ) : currentPage === TotalPages ? (
              <div>{currentPage - 1}</div>
            ) : (
              <div>{currentPage}</div>
            )}
          </button>

          {currentPage === TotalPages ? null : (
            <button className="border border-black/10 px-3 rounded-lg">
              ...
            </button>
          )}
          <button
            disabled={currentPage === TotalPages}
            onClick={() => {
              setCurrentPage(TotalPages);
            }}
            className={`border border-black/10 px-3 rounded-lg ${
              currentPage === TotalPages ? "bg-blue-600 text-white" : ""
            } `}
          >
            {TotalPages}
          </button>

          <button
            onClick={() => {
              if (currentPage < TotalPages) setCurrentPage(currentPage + 1);
            }}
            className="border border-black/10 p-1 rounded-lg"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
