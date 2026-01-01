import React from "react";
import { Search, Shuffle } from "lucide-react";

const SearchInterface = () => {
  return (
    <div className="bg-gray-200 w-full h-60 px-10 py-5">
      {/* searchComponent */}

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text"
          placeholder="Search questions, tags, or IDs..."
          className="w-full pl-12 pr-16 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 placeholder:text-gray-400 text-gray-600 transition-all"
          onChange={(e) => updateQuery('q', e.target.value)}
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white border rounded text-xs text-gray-400 font-sans shadow-sm">
          ⌘ K
        </kbd>
      </div>
    </div>
  );
};

export default SearchInterface;
