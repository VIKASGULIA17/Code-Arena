import { useRef, useEffect, useState } from "react";
import { Search, Shuffle, ChevronDown } from "lucide-react";

const SearchInterface = ({ filters, setfilters }) => {
  const FILTER_OPTIONS = {
    Difficulty: ["All", "Easy", "Medium", "Hard"],
    Topic: ["All", "Algorithms", "Data Structures", "Database", "Shell"],
    Tags: ["All", "Array", "String", "Hash Table", "DP", "Math", "Sorting"],
  };
  const popularTags = [
    {
      label: "Array",
      textColor: "text-blue-700",
      backgroundColor: "bg-blue-200",
    },
    {
      label: "String",
      textColor: "text-purple-700",
      backgroundColor: "bg-purple-200",
    },
    {
      label: "Dynamic Programming",
      textColor: "text-pink-700",
      backgroundColor: "bg-pink-200",
    },
    {
      label: "HashMap",
      textColor: "text-indigo-700",
      backgroundColor: "bg-indigo-200",
    },
  ];
  const [dropDownOpen, setdropDownOpen] = useState(null);
  const dropDownOpenRef = useRef(null);

  useEffect(() => {
    // to handle outside click to close the downbar
    const handleClickOutside = (event) => {
      if (
        dropDownOpenRef.current &&
        !dropDownOpenRef.current.contains(event.target)
      ) {
        setdropDownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // update query
  const updateQuery = (key, value) => {
    setfilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white w-full shadow-2xl rounded-2xl my-5 px-10 py-8">
      {/* 1. Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full pl-12 pr-16 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-gray-600 outline-none"
          onChange={(e) => updateQuery("search", e.target.value)}
          value={filters.search}
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white border rounded text-xs text-gray-400 font-sans shadow-sm">
          ⌘ K
        </kbd>
      </div>

      {/* 2. Dropdowns Row */}
      <div ref={dropDownOpenRef} className="flex justify-between items-center">
        <div className="flex py-7 gap-3">
          {Object.keys(FILTER_OPTIONS).map((obj) => {
            // obj is 'difficulty' or 'tags'
            const selectedValue = filters[obj];
            const hasActiveFilter =
              selectedValue &&
              selectedValue !== "All" &&
              (Array.isArray(selectedValue)
                ? selectedValue.length > 0
                : selectedValue !== "");

            return (
              <div key={obj} className="relative">
                <div
                  onClick={() =>
                    setdropDownOpen(dropDownOpen === obj ? null : obj)
                  }
                  className={`flex gap-1 px-3 py-1 border rounded-lg items-center cursor-pointer transition-all ${
                    hasActiveFilter
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-400 text-gray-700"
                  }`}
                >
                  <p className="text-md px-2 font-medium capitalize">
                    {hasActiveFilter && !Array.isArray(selectedValue)
                      ? selectedValue
                      : obj}
                  </p>

                  <ChevronDown
                    size={20}
                    className={`text-gray-400 duration-300 ${
                      dropDownOpen === obj ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                {dropDownOpen === obj && (
                  <div className="absolute top-12 left-0 z-50 rounded-xl w-40 bg-white text-sm shadow-2xl border border-gray-100 py-2">
                    {FILTER_OPTIONS[obj].map((comp) => (
                      <div
                        key={comp}
                        onClick={() => {
                          updateQuery(obj, comp);
                          setdropDownOpen(null);
                        }}
                        className={`px-6 py-2 hover:bg-gray-100 cursor-pointer transition-colors ${
                          selectedValue === comp
                            ? "text-blue-600 font-bold bg-blue-50"
                            : "text-gray-500"
                        }`}
                      >
                        {comp}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Shuffle
          size={36}
          className="border border-gray-500 p-2 rounded-lg text-gray-600 cursor-pointer"
        />
      </div>

      {/* 3. Popular Tags */}
      <div className="flex gap-2 items-center">
        <h1 className="text-gray-500 font-semibold uppercase text-xs tracking-wider">
          Popular :
        </h1>
        <div className="flex gap-2">
          {popularTags.map((obj) => {
            const isSelected = filters.search === obj.label;
            return (
              <div
                key={obj.label}
                onClick={() =>
                  updateQuery("search", isSelected ? "" : obj.label)
                }
                className={`${obj.backgroundColor} ${
                  obj.textColor
                } px-3 py-1 rounded-full text-sm cursor-pointer transition-all border-2 ${
                  isSelected ? "border-blue-600" : "border-transparent"
                }`}
              >
                {obj.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;
