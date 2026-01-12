import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search questions..." }) => {
  return (
    <div className="relative group w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-12 pr-16 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-gray-600 outline-none transition-all"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white border rounded text-xs text-gray-400 font-sans shadow-sm hidden sm:block">
        ⌘ K
      </kbd>
    </div>
  );
};

export default SearchBar;