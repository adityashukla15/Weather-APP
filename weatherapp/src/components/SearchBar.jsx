import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`flex items-center w-full max-w-md px-4 py-2 rounded-full backdrop-blur-lg border 
      transition-all duration-300 ${
        isFocused
          ? "bg-white/20 border-purple-400 shadow-lg shadow-purple-500/30"
          : "bg-white/10 border-white/20"
      }`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* 🔍 Search Icon */}
      <FiSearch
        className={`text-2xl mr-2 transition-colors ${
          isFocused ? "text-purple-400" : "text-gray-300"
        }`}
      />

      {/* ✏️ Input */}
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 px-1"
      />

      {/* 🎨 Animated Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="ml-2 px-4 py-1 rounded-full text-white 
        bg-gradient-to-r from-fuchsia-500 to-pink-500 
        hover:from-pink-500 hover:to-orange-400
        shadow-md shadow-pink-500/30 transition-all duration-300"
      >
      Search
      </motion.button>
    </motion.form>
  );
}
