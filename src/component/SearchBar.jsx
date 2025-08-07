// src/components/UI/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, autoFocus = false, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(autoFocus);
  const inputRef = useRef(null);

  // 如果autoFocus为true，自动聚焦到搜索框
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center rounded-full bg-white overflow-hidden transition-all ${isFocused ? 'ring-2 ring-pink-500' : ''}`}>
          <button 
            type="submit"
            className="p-3 text-gray-500 hover:text-indigo-700 transition"
            aria-label="搜索"
          >
            <FaSearch />
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="搜索盲盒名称、关键词..."
            className="w-full py-3 px-2 focus:outline-none text-gray-800"
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-3 text-gray-400 hover:text-gray-700 transition"
              aria-label="清除搜索"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;