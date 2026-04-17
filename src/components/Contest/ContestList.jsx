import {
  CalendarDays,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import SearchBar from "../others/SearchBar";
import { Button } from "../ui/button";
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ContestList = ({ contestData = [] }) => {
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
      const matchSearches = contest.contestName
        ?.toLowerCase()
        ?.includes(filters.search.toLowerCase());

      const status = contest.contestStatus || "UPCOMING";
      const matchedStatus =
        filters.status === "All" ||
        !filters.status ||
        status.toLowerCase() === filters.status.toLowerCase();

      return matchSearches && matchedStatus;
    });
  }, [filters, contestData]);

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
      <div className="flex justify-between items-center">
        <h1 className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 font-medium text-3xl">
          All Contests
        </h1>
        <div className="flex gap-5 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-sm border border-transparent dark:border-slate-700">
          <Grid3X3
            onClick={() => setselected("grid")}
            className={` ${selected === "grid" ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-slate-500"} cursor-pointer hover:text-blue-500 transition-colors`}
          />
          <CalendarDays
            onClick={() => setselected("calendar")}
            className={` ${selected === "calendar" ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-slate-500"} cursor-pointer hover:text-blue-500 transition-colors`}
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
                ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-transparent"
                : "bg-white dark:bg-slate-800 text-black dark:text-slate-200 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
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
          <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-dashed border-gray-300 dark:border-slate-700">
            <p className="text-gray-500 dark:text-slate-400 text-lg mb-4">
              No contests found matching your criteria.
            </p>
            <Button
              onClick={clearFilters}
              className="flex gap-2 items-center bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
            >
              <RotateCcw size={16} />
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Contest list */}
            {currentData.map((obj, idx) => {
              const startDate = new Date(obj.startTime);
              const month = startDate.toLocaleString('en-US', { month: 'short' });
              const date = startDate.getDate();
              const formattedTime = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
              const status = obj.contestStatus || "UPCOMING";
              
              const colorClass = status.toUpperCase() === "ONGOING" ? "from-green-500 to-emerald-600" :
                                 status.toUpperCase() === "FINISHED" ? "from-gray-500 to-gray-600" :
                                 "from-blue-500 to-indigo-600";
              
              const prize = "$5000"; 
              
              return (
              <div key={obj.contestId || idx} className="my-4">
                <div className="w-full flex flex-col lg:flex-row gap-10 items-center justify-between h-auto rounded-2xl shadow-lg bg-white dark:bg-slate-800 border dark:border-slate-700 py-7 px-8 hover:scale-[1.01] transition-transform">
                  <div className="flex">
                    <div className="bg-gray-100 dark:bg-slate-900 w-18 h-18 text-center pt-2 rounded-2xl flex flex-col justify-center px-4">
                      <p className="font-medium text-gray-600 dark:text-slate-400 uppercase text-xs">
                        {month}
                      </p>
                      <p className="font-bold text-xl text-gray-900 dark:text-slate-50">{date}</p>
                    </div>
                    <div className="ml-4">
                      <div className="flex gap-5 py-1 items-center flex-wrap">
                        <h1 className="text-2xl font-medium text-gray-700 dark:text-slate-200">
                          {obj.contestName}
                        </h1>
                        <span
                          className={`px-4 py-1 rounded-full text-xs text-white font-bold bg-linear-to-b ${colorClass}`}
                        >
                          {status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="text-gray-500 dark:text-slate-400 text-sm">
                          {status.toUpperCase() === "ONGOING" ? "Ends in " : "Starts at "}
                          <span className="font-medium text-gray-700 dark:text-slate-300">
                            {formattedTime}
                          </span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
                        <h4 className="text-gray-500 dark:text-slate-400 text-sm">
                          {obj.duration} Hours
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="text-center sm:text-right mr-0 sm:mr-4 hidden sm:block">
                      <p className="text-xs text-gray-400 dark:text-slate-500 uppercase">
                        Prize Pool
                      </p>
                      <p className="font-bold text-orange-600 dark:text-orange-400">{prize}</p>
                    </div>

                    {status.toUpperCase() === "FINISHED" ? (
                      <div className="flex gap-2">
                        <Link to={`/contestRankings/${obj.contestId || obj.contestName}`}>
                          <Button variant="outline" className="px-6 font-bold cursor-pointer border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 dark:bg-slate-800">
                            Rankings
                          </Button>
                        </Link>
                        <Link to={`/contest/${obj.contestId || obj.contestName}`} state={{ contest: obj }}>
                          <Button className="px-8 bg-brand-gradient font-bold cursor-pointer">
                            Virtual
                          </Button>
                        </Link>
                      </div>
                    ) : status.toUpperCase() === "ONGOING" ? (
                      <Link to={`/contest/${obj.contestId || obj.contestName}`} state={{ contest: obj }}>
                        <Button className="px-8 bg-brand-gradient font-bold cursor-pointer">
                          Enter
                        </Button>
                      </Link>
                    ) : (
                      <Link to='registration' state={{ contest: obj }}>
                        <Button className="px-8 bg-brand-gradient font-bold cursor-pointer">
                          Register
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )})}

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
                        ? "bg-blue-600 text-white border-transparent"
                        : "bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
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
