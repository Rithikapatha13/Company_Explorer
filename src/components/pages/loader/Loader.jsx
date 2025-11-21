import React from "react";

const Loader = ({ theme }) => {
  const skeletonCard = (
    <div
      className={`rounded-lg p-5 shadow-xl animate-pulse ${
        theme === "dark"
          ? "bg-gray-800"
          : "bg-white"
      }`}
    >
      <div className={`h-6 w-2/3 rounded mb-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}></div>
      <div className={`h-4 w-1/2 rounded mb-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}></div>
      <div className={`h-4 w-1/3 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}></div>
    </div>
  );

  return (
    <div
      className={`p-10 size-full ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Companies
      </h1>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index}>{skeletonCard}</div>
          ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center items-center mt-20 gap-4">
        <div
          className={`h-10 w-20 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-300"
          } animate-pulse`}
        ></div>
        <div
          className={`h-6 w-24 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-300"
          } animate-pulse`}
        ></div>

        <div
          className={`h-10 w-20 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-300"
          } animate-pulse`}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
