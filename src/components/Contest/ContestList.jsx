import {
  CalendarDays,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import SearchBar from "../others/SearchBar";
import { Button } from "../ui/button";
import { contestData } from "../../data/ContestData";
import { useMemo, useState, useEffect } from "react";

const ContestList = () => {
  const [selected, setselected] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filters, setfilters] = useState({
    search: "",
    status: "All",
  });

  const updateQuery = (key, value) => {
    setfilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setfilters({ search: "", status: "All" });
  };

  // Filter Logic
  const filteredContest = useMemo(() => {
    return contestData.filter((contest) => {
      const matchSearches = contest.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchedStatus =
        filters.status === "All" ||
        !filters.status ||
        contest.status.toLowerCase() === filters.status.toLowerCase();

      return matchSearches && matchedStatus;
    });
  }, [filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredContest.length / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContest.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContest, currentPage]);

  return (
    <div className="my-10">
      <div className="flex justify-between">
        <h1 className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 font-medium text-3xl">
          All Contests
        </h1>
        <div className="flex gap-5 bg-white px-4 py-3 rounded-xl shadow-sm">
          <Grid3X3
            onClick={() => setselected("grid")}
            className={` ${selected === "grid" ? "text-blue-600" : "text-gray-400"} cursor-pointer `}
          />
          <CalendarDays
            onClick={() => setselected("calendar")}
            className={` ${selected === "calendar" ? "text-blue-600" : "text-gray-400"} cursor-pointer `}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 my-5">
        <SearchBar
          value={filters.search}
          onChange={(val) => updateQuery("search", val)}
        />
        <div className="flex">
          {["All", "Ongoing", "Upcoming", "Finished"].map((status) => (
            <Button
              key={status}
              onClick={() => {
                if (status === "All") updateQuery("status", "All");
                else
                  updateQuery(
                    "status",
                    filters.status === status ? "All" : status,
                  );
              }}
              className={`rounded-3xl transition-all ${filters.status === status
                  ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
                  : "bg-white text-black border border-gray-200 hover:bg-gray-50"
                } text-center px-5 py-6 flex gap-2`}
            >
              {status === "Ongoing" && (
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              )}
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="min-h-[50vh]">
        {/* Empty State Logic */}
        {filteredContest.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg mb-4">
              No contests found matching your criteria.
            </p>
            <Button
              onClick={clearFilters}
              className="flex gap-2 items-center bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <RotateCcw size={16} />
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Contest list */}
            {currentData.map((obj, idx) => (
              <div key={idx} className="my-4">
                <div className="w-full flex flex-col lg:flex-row gap-10 items-center justify-between h-auto rounded-2xl shadow-lg bg-white py-7 px-8 hover:scale-[1.01] transition-transform">
                  <div className="flex">
                    <div className="bg-gray-100 w-18 h-18 text-center pt-2 rounded-2xl flex flex-col justify-center px-4">
                      <p className="font-medium text-gray-600 uppercase text-xs">
                        {obj.month}
                      </p>
                      <p className="font-bold text-xl">{obj.date}</p>
                    </div>
                    <div className="ml-4">
                      <div className="flex gap-5 py-1 items-center">
                        <h1 className="text-2xl font-medium text-gray-700">
                          {obj.name}
                        </h1>
                        <span
                          className={`px-4 py-1 rounded-full text-xs text-white font-bold bg-linear-to-b ${obj.color}`}
                        >
                          {obj.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="text-gray-500 text-sm">
                          {obj.status === "Ongoing" ? "Ends in " : "Starts at "}
                          <span className="font-medium text-gray-700">
                            {obj.startTime}
                          </span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <h4 className="text-gray-500 text-sm">
                          {obj.duration} Duration
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right mr-4">
                      <p className="text-xs text-gray-400 uppercase">
                        Prize Pool
                      </p>
                      <p className="font-bold text-orange-600">{obj.prize}</p>
                    </div>

                    {obj.status === "Finished" ? (
                      <Button className="px-8 bg-brand-gradient font-bold">
                        Virtual
                      </Button>
                    ) : obj.status === "Ongoing" ? (
                      <Button className="px-8 bg-brand-gradient font-bold">
                        Enter
                      </Button>
                    ) : (
                      <Button className="px-8 bg-brand-gradient font-bold">
                        Register
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="rounded-full p-2"
                >
                  <ChevronLeft size={20} />
                </Button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full ${currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-600 border hover:bg-gray-50"
                        }`}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="rounded-full p-2"
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContestList;
