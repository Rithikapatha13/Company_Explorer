import React, { useState } from "react";
import { useSelector } from "react-redux";
import { LiaIndustrySolid } from "react-icons/lia";
import { CgNametag } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";

const CustomDropdown = ({
  options,
  placeholder,
  isOpen,
  onToggle,
  onSelect,
  selected,
  Icon,
  theme,
}) => {
  return (
    <div className="relative w-full">
      <div
        className={`w-full h-10 px-3 flex items-center justify-between border rounded-md cursor-pointer transition-colors duration-200
          ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700 text-white hover:border-blue-500"
              : "bg-gray-100 border-gray-400 text-black hover:border-blue-500"
          }`}
        onClick={onToggle}
      >
        <span
          className={`${
            selected
              ? "text-blue-400"
              : theme === "dark"
              ? "text-gray-300"
              : "text-gray-700"
          }`}
        >
          {selected || placeholder}
        </span>

        <span
          className={`ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div
          className={`absolute top-full left-0 w-full mt-1 rounded-md max-h-44 overflow-auto shadow-lg animate-fadeIn z-50
            ${
              theme === "dark"
                ? "bg-gray-900 border border-gray-700 text-white"
                : "bg-white border border-gray-300 text-black"
            }`}
        >
          {options.length > 0 ? (
            options.map((ele, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 cursor-pointer transition-colors duration-200 flex items-center gap-2
                  ${
                    theme === "dark"
                      ? "hover:bg-blue-500 hover:text-white"
                      : "hover:bg-blue-200 hover:text-black"
                  }`}
                onClick={() => onSelect(ele)}
              >
                {Icon && (
                  <Icon
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  />
                )}
                {ele}
              </div>
            ))
          ) : (
            <div
              className={`px-3 py-2 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              No options
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SideNav = ({
  selectedValues,
  setSelectedValues,
  theme,
  setIsHovering,
}) => {
  const { companies } = useSelector((state) => state.company);

  const industry = companies
    ? Array.from(new Set(companies.map((c) => c.industry)))
    : [];
  const companyNames = companies ? companies.map((c) => c.name) : [];
  const location = companies
    ? Array.from(new Set(companies.map((c) => c.location)))
    : [];

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (dropdown) =>
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));

  const handleSelect = (dropdown, value) => {
    setSelectedValues((prev) => ({ ...prev, [dropdown]: value }));

    if (window.innerWidth < 640) setIsHovering(false);

    setOpenDropdown(null);
  };

  const handleClear = () => {
    setSelectedValues({ industry: "", name: "", location: "" });

    if (window.innerWidth < 640) setIsHovering(false);

    setOpenDropdown(null);
  };

  return (
    <div
      className={`size-full flex flex-col justify-start p-10 items-start gap-6 rounded-md
        ${
          theme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-black"
        }`}
    >
   
      <button
        className="sm:hidden self-end text-3xl font-bold mb-2 absolute"
        onClick={(e) => {
           e.stopPropagation(); 
           setIsHovering(false)
        }}
      >
        ×
      </button>

      <h1 className="text-2xl font-bold pl-2">Filter</h1>

      <div className="w-full flex flex-col justify-start gap-4">
        <CustomDropdown
          options={industry}
          placeholder="Industry"
          isOpen={openDropdown === "industry"}
          onToggle={() => handleToggle("industry")}
          onSelect={(val) => handleSelect("industry", val)}
          selected={selectedValues.industry}
          Icon={LiaIndustrySolid}
          theme={theme}
        />

        <CustomDropdown
          options={companyNames}
          placeholder="Name"
          isOpen={openDropdown === "name"}
          onToggle={() => handleToggle("name")}
          onSelect={(val) => handleSelect("name", val)}
          selected={selectedValues.name}
          Icon={CgNametag}
          theme={theme}
        />

        <CustomDropdown
          options={location}
          placeholder="Location"
          isOpen={openDropdown === "location"}
          onToggle={() => handleToggle("location")}
          onSelect={(val) => handleSelect("location", val)}
          selected={selectedValues.location}
          Icon={CiLocationOn}
          theme={theme}
        />
      </div>

      <button
        onClick={handleClear}
        className={`mt-4 px-4 py-2 rounded-md font-semibold transition-colors w-full
          ${
            theme === "dark"
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-red-400 hover:bg-red-300 text-black"
          }`}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SideNav;
