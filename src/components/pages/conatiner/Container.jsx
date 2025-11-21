import React, { useEffect, useState } from "react";
import Nav from "./Nav/Nav";
import SideNav from "./SideNav/SideNav";
import Home from "./Home/Home";
import { useDispatch } from "react-redux";
import { fetchCompanies } from "../../slice/Slice";
import { FiFilter } from "react-icons/fi";

const Container = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [theme, setTheme] = useState("dark");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  const [selectedValues, setSelectedValues] = useState({
    industry: "",
    name: "",
    location: "",
    input: "",
  });

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handelClickOnNav = () => setIsHovering(true);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="size-full bg-black text-white">
      {/* NAV */}
      <div className="w-full h-16 bg-black">
        <Nav
          toggleTheme={toggleTheme}
          theme={theme}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </div>

      {/* MAIN LAYOUT */}
      <div className="h-[calc(100vh-4rem)] w-full flex relative">
        {/* SIDENAV (hover controlled) */}
        <div
          className={`group w-80 h-full ${
            theme === "dark" ? "bg-black/80" : "bg-gray-700"
          } 
    absolute duration-200 -left-70 hover:left-0 ${
      isHovering && "left-0"
    } max-sm:fixed`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handelClickOnNav}
        >
          {/* FILTER TAB ON COLLAPSED EDGE */}
          <div
            className="
      absolute right-[-60px] top-1/2 -translate-y-1/2
      rotate-90 origin-center
      bg-gradient-to-r bg-blue-600/80
      hover:bg-blue-700/90
      text-white font-semibold tracking-wide
      px-4 py-1 rounded-t-md shadow-lg
      cursor-pointer
      group-hover:scale-110 transition-all duration-300
      max-sm:hidden // hide on mobile //
    "
          >
            FILTERS
          </div>

          {/* SIDENAV CONTENT */}
          <SideNav
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            setIsHovering={setIsHovering}
            theme={theme}
            isHovering={isHovering}
          />
          {/* MOBILE FLOATING FILTER BUTTON */}
          <button
            onClick={() => setIsHovering(true)}
            className="
    sm:hidden    /* hide on desktop */
    fixed bottom-6 left-6 z-40 
    p-2 rounded-full shadow-xl
    bg-gradient-to-r bg-blue-600/80
    text-white hover:bg-blue-700/90
    hover:scale-110 active:scale-95
    transition-all duration-300
  "
          >
            <FiFilter size={16} />
          </button>
        </div>

        {/* HOME CONTENT */}
        <div
          className={`duration-200 ${
            isHovering
              ? "w-[calc(100%-320px)] h-full  ml-80 pl-2"
              : "w-full h-full pl-12 ml-0"
          }`}
        >
          <Home selectedValues={selectedValues} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default Container;
