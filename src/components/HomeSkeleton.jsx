import React from "react";

const HomeSkeleton = () => {
  return (
    <div className="relative min-h-[500px] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse">
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center space-y-6">
        {/* Title skeleton */}
        <div className="h-12 w-3/4 rounded bg-gray-400 dark:bg-gray-600"></div>
        {/* Subtitle skeleton */}
        <div className="h-4 w-1/2 rounded bg-gray-400 dark:bg-gray-600"></div>
        {/* Button skeleton */}
        <div className="h-10 w-36 rounded bg-gray-400 dark:bg-gray-600 mt-2"></div>

        {/* Booking form skeleton */}
        <div className="mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg px-6 py-6 flex flex-col md:flex-row gap-4 w-full max-w-4xl">
          {/* Check-In */}
          <div className="flex flex-col space-y-2 flex-1">
            <div className="h-4 w-20 rounded bg-gray-400 dark:bg-gray-600"></div>
            <div className="h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
          {/* Check-Out */}
          <div className="flex flex-col space-y-2 flex-1">
            <div className="h-4 w-20 rounded bg-gray-400 dark:bg-gray-600"></div>
            <div className="h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
          {/* Guests */}
          <div className="flex flex-col space-y-2 flex-1 max-w-[100px]">
            <div className="h-4 w-16 rounded bg-gray-400 dark:bg-gray-600"></div>
            <div className="h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
          {/* Check Availability Button */}
          <div className="flex items-end">
            <div className="h-10 w-40 rounded bg-gray-400 dark:bg-gray-600"></div>
          </div>
        </div>
      </div>
      <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl px-4 mx-auto">
        <h2 className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto mb-12 animate-pulse"></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md 
                bg-white dark:bg-gray-800 animate-pulse overflow-hidden"
            >
              <div className="w-full h-56 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-8 bg-indigo-600 rounded-full w-32 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomeSkeleton;
