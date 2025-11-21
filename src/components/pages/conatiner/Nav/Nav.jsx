import React, { useState } from 'react'
import { FaSearch, FaSun, FaMoon, FaTimes } from "react-icons/fa";

const Nav = ({ theme, toggleTheme, selectedValues, setSelectedValues }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleInput = (e) => {
    setSelectedValues({ ...selectedValues, input: e.target.value });
  };

  return (
    <div className='flex size-full items-center px-10 justify-between relative'>

    
      <div>
        <svg width="120" height="36" viewBox="0 0 120 36" fill="none">
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="120" y2="0">
              <stop offset="0%" stopColor={"white"} stopOpacity="1"/>
              <stop offset="100%" stopColor={"white"} stopOpacity="0.6"/>
            </linearGradient>
          </defs>
          <text x="0" y="28" fontFamily="Arial" fontSize="24" fill="url(#gradient)" fontWeight="bold">
            Explore
          </text>
          <circle cx="108" cy="10" r="5" stroke={"white"} strokeWidth="1.5" fill="none">
            <animate attributeName="r" values="5;8;5" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

  
      <div className='flex h-full items-center'>

    
        <div
          className={`w-160 border-2 rounded-[10px] h-2/3 px-3 pb-1 
            flex justify-center items-center text-md  max-lg:w-80
            max-sm:hidden
            "border-black text-black"}`}
        >
          <input
            type="text"
            className="size-full outline-0 placeholder:font-bold italic"
            placeholder="Enter Name"
            onChange={handleInput}
          />
          <FaSearch />
        </div>

      
        <button
          className="hidden max-sm:flex ml-4 p-2 rounded-full border border-gray-500 hover:bg-gray-300"
          onClick={() => setMobileSearchOpen(true)}
        >
          <FaSearch />
        </button>

     
        <button
          onClick={toggleTheme}
          className={`ml-4 p-2 rounded-full border border-gray-500 hover:bg-gray-300 
          ${theme !== "dark" && "bg-gray-200"}`}
        >
          {theme === "dark" ? <FaSun color="yellow" /> : <FaMoon color="black" />}
        </button>
      </div>

   
      {mobileSearchOpen && (
        <div className="fixed top-0 left-0 w-full h-20 bg-white z-50 shadow-md flex items-center px-4 gap-3 animate-slideDown">
          <input
            type="text"
            autoFocus
            className="flex-1 h-12 border border-black text-black rounded-md px-3 outline-none"
            placeholder="Search..."
            onChange={handleInput}
          />
          <button
            className="p-3 bg-red-500 rounded-full"
            onClick={() => setMobileSearchOpen(false)}
          >
            <FaTimes size={18}/>
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
