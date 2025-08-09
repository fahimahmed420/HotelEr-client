import React, { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";

const SkeletonBlock = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${className}`}
  ></div>
);

export default function SkeletonRoomDetails() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100" }`}>
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col px-6 py-28 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left panel: Room Info */}
        <div className={`space-y-4 p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <SkeletonBlock className="h-8 w-48 rounded-lg" />
          <SkeletonBlock className="h-4 w-full rounded-lg" />
          <SkeletonBlock className="h-4 w-5/6 rounded-lg" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <SkeletonBlock key={i} className="h-3 w-full rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonBlock key={i} className="h-6 w-full rounded-lg" />
            ))}
          </div>
        </div>

        {/* Middle panel: Booking */}
        <div className={`space-y-5 p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <SkeletonBlock className="h-7 w-36 rounded-lg" />
          <SkeletonBlock className="h-4 w-full rounded-lg" />
          <SkeletonBlock className="h-48 rounded-2xl" /> {/* DatePicker placeholder */}
          <SkeletonBlock className="h-6 w-full rounded-lg" /> {/* Guests label/input */}
          <SkeletonBlock className="h-6 w-full rounded-lg" /> {/* Check-in time label/select */}
          <SkeletonBlock className="h-10 w-full rounded-xl" /> {/* Reserve button */}
        </div>

        {/* Gallery - full width below */}
        <div
          className={`md:col-span-3 mt-12 p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <SkeletonBlock className="h-7 w-32 mb-6 rounded-lg" />
          <div className="flex flex-wrap gap-4">
            {[...Array(5)].map((_, i) => (
              <SkeletonBlock key={i} className="w-40 h-32 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Reviews - full width below */}
        <div
          className={`md:col-span-3 mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <SkeletonBlock className="h-6 w-40 mb-4 rounded-lg" />
          <div className="flex gap-4">
            {/* Single Review */}
            <div className="w-72 p-3 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <SkeletonBlock className="w-10 h-10 rounded-full" />
                <SkeletonBlock className="w-24 h-4 rounded-lg" />
              </div>
              <SkeletonBlock className="h-4 w-24 rounded-lg mb-1" />
              <SkeletonBlock className="h-10 w-full rounded-lg mb-2" />
              <SkeletonBlock className="h-3 w-32 rounded-lg" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <SkeletonBlock className="h-10 w-28 rounded-lg" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
