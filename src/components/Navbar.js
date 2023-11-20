import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-gray-">
      <h2 className="font-bold font-sans  text-2xl pl-4 lg:pl-11  text-violet-600">
        School Us
      </h2>
      <nav className="flex space-x-4 pl-4 lg:pl-96    leading-12">
        <Link to="/login" className="text-purple-600 pl-96">
          Users
        </Link>
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="text-purple-600 focus:outline-none"
          >
            Student
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 p-2 text-purple-600">
              <Link to="/signup" className="block mb-2">
                register
              </Link>
              <Link to="/student-data" className="block">
                Student Data
              </Link>
            </div>
          )}
        </div>
        <Link to="/dashboard" className="text-purple-600">
          Dashboard
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
