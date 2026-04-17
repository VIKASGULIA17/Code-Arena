import { useRef, useEffect, useState } from "react";
import { Search, Shuffle, ChevronDown } from "lucide-react";

const SearchInterface = ({ filters, setfilters, onShuffle }) => {
  const FILTER_OPTIONS = {
    Difficulty: ["All", "Easy", "Medium", "Hard"],
    Topic: ["All", "Algorithms", "Data Structures", "Database", "Shell"],
    Tags: ["All", "Array", "String", "Tree", "Graph", "Hash Table", "DP", "Math", "Sorting"],
  };

  const popularTags = [
    { label: "Array", color: "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20" },
    { label: "String", color: "bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20" },
    { label: "DP", color: "bg-pink-50 dark:bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-100 dark:border-pink-500/20" },
    { label: "Hash Table", color: "bg-violet-50 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-500/20" },
  ];

  const [dropDownOpen, setdropDownOpen] = useState(null);
  const dropDownOpenRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownOpenRef.current && !dropDownOpenRef.current.contains(event.target)) {
        setdropDownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateQuery = (key, value) => {
    setfilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="card-elevated p-5 lg:p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-5">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateQuery("search", e.target.value)}
          placeholder="Search problems by title..."
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-800 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 dark:focus:border-indigo-500/50 transition-all"
        />
      </div>

      {/* Dropdowns + Shuffle */}
      <div ref={dropDownOpenRef} className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {Object.keys(FILTER_OPTIONS).map((obj) => {
            const selectedValue = filters[obj];
            const hasActiveFilter =
              selectedValue && selectedValue !== "All" &&
              (Array.isArray(selectedValue) ? selectedValue.length > 0 : selectedValue !== "");

            return (
              <div key={obj} className="relative">
                <button
                  onClick={() => setdropDownOpen(dropDownOpen === obj ? null : obj)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-xl text-sm font-medium transition-all ${
                    hasActiveFilter
                      ? "border-indigo-300 dark:border-indigo-500/40 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                      : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600"
                  }`}
                >
                  <span className="capitalize">{hasActiveFilter ? selectedValue : obj}</span>
                  <ChevronDown
                    size={15}
                    className={`text-gray-400 dark:text-slate-500 transition-transform duration-200 ${
                      dropDownOpen === obj ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropDownOpen === obj && (
                  <div className="absolute top-11 left-0 z-50 w-44 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl dark:shadow-black/40 py-1.5 animate-fade-in-up">
                    {FILTER_OPTIONS[obj].map((comp) => (
                      <button
                        key={comp}
                        onClick={() => {
                          updateQuery(obj, comp);
                          setdropDownOpen(null);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          selectedValue === comp
                            ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-500/15"
                            : "text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                        }`}
                      >
                        {comp}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onShuffle}
          className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all"
          title="Random problem"
        >
          <Shuffle size={18} />
        </button>
      </div>

      {/* Popular Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mr-1">
          Popular:
        </span>
        {popularTags.map((tag) => {
          const isSelected = filters.Tags === tag.label;
          return (
            <button
              key={tag.label}
              onClick={() => updateQuery("Tags", isSelected ? "" : tag.label)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${tag.color} ${
                isSelected ? "ring-2 ring-indigo-300 dark:ring-indigo-500/50 ring-offset-1 dark:ring-offset-slate-800" : "hover:ring-1 hover:ring-gray-200 dark:hover:ring-slate-600"
              }`}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchInterface;
