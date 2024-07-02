import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <form className="md:w-[70%] w-[90%] mx-auto my-20">
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <button
            type="submit"
            className="p-1 focus:outline-none focus:shadow-outline">
            <FaSearch size={30} />
          </button>
        </span>
        <input
          type="search"
          name="q"
          className="w-full py-5 text-lg text-white bg-gray-900 rounded-xl pl-16 focus:outline-none focus:bg-white focus:text-gray-900 "
          placeholder="Search For Answers..."
        />
      </div>
    </form>
  );
};

export default SearchBar;
