import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../loader/Loader";

const Home = ({ selectedValues, theme }) => {
  const { companies, loading } = useSelector((state) => state.company);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedValues]);

  if (loading) {
    return <Loader theme={theme} />;
  }
console.log(loading);

  if (!companies || companies.length === 0) {
    return (
      <div
        className={`p-10 ${theme === "dark" ? "text-white bg-black" : "text-black bg-white"}`}
      >
        No companies found.
      </div>
    );
  }

  const filteredCompanies = companies.filter((company) => {
    const industryMatch = selectedValues.industry
      ? company.industry === selectedValues.industry
      : true;

    const nameMatch = selectedValues.name
      ? company.name === selectedValues.name
      : true;

    const locationMatch = selectedValues.location
      ? company.location === selectedValues.location
      : true;

    const inputMatch = selectedValues.input
      ? company.name.toLowerCase().includes(selectedValues.input.toLowerCase()) ||
        company.industry.toLowerCase().includes(selectedValues.input.toLowerCase()) ||
        company.location.toLowerCase().includes(selectedValues.input.toLowerCase())
      : true;

    return industryMatch && nameMatch && locationMatch && inputMatch;
  });

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (filteredCompanies.length === 0) {
    return (
      <div
        className={`p-10 size-full ${
          theme === "dark" ? "text-white bg-black" : "text-black bg-white"
        }`}
      >
        No companies match the selected filters.
      </div>
    );
  }

  return (
    <div
      className={`p-10 overflow-y-scroll size-full ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Companies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentCompanies.map((company, idx) => (
          <div
            key={idx}
            className={`rounded-[20px] p-5 shadow-xl hover:shadow-xl transition-shadow duration-200 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
            <p className="mb-1">
              <strong>Industry:</strong> {company.industry}
            </p>
            <p className="mb-1">
              <strong>Location:</strong> {company.location}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-20 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-[10px] transition-colors disabled:opacity-50 ${
            theme === "dark"
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-300 text-black hover:bg-gray-200"
          }`}
        >
          Prev
        </button>

        <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-[10px] transition-colors disabled:opacity-50 ${
            theme === "dark"
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-300 text-black hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
