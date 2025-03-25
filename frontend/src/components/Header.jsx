import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = ({ darkMode, setDarkMode, setSearch }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Task Manager</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        className="p-2 border rounded-lg bg-white text-gray-600 w-1/2"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setDarkMode(!darkMode)} className="p-2">
        {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
      </button>
    </div>
  );
};

export default Header;







