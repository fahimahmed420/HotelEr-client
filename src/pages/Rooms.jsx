import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../utils/ThemeContext";

function Rooms() {
  const { darkMode } = useContext(ThemeContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // No sort by default
  const navigate = useNavigate();

  const fetchRooms = async () => {
    setLoading(true);
    try {
      let url = "https://hotel-booking-server-side-ruddy.vercel.app/api/rooms";
      if (minPrice && maxPrice) {
        url += `?minPrice=${minPrice}&maxPrice=${maxPrice}`;
      }

      const res = await fetch(url);
      let data = await res.json();

      if (sortOrder === "asc") {
        data.sort((a, b) => a.pricePerNight - b.pricePerNight);
      } else if (sortOrder === "desc") {
        data.sort((a, b) => b.pricePerNight - a.pricePerNight);
      }

      setRooms(data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [sortOrder]);

  if (loading) {
    return (
     <div className={`${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
       <div
        className={`min-h-screen py-20 max-w-7xl mx-auto px-4 space-y-8`}>
        {/* Filters Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div
              className={`h-10 rounded border ${
                darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-300 border-gray-300"
              } animate-pulse w-full sm:w-32`}
            />
            <div
              className={`h-10 rounded border ${
                darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-300 border-gray-300"
              } animate-pulse w-full sm:w-32`}
            />
            <div
              className={`h-10 rounded ${
                darkMode ? "bg-blue-600" : "bg-blue-400"
              } animate-pulse w-full sm:w-auto`}
            />
          </div>
          <div className="w-full sm:w-48">
            <div
              className={`h-10 rounded border ${
                darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-300 border-gray-300"
              } animate-pulse w-full`}
            />
          </div>
        </div>

        {/* Room Cards Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden shadow-md animate-pulse ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`h-48 w-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></div>
              <div className="p-4 space-y-3">
                <div
                  className={`h-6 rounded w-3/4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-400"
                  }`}
                ></div>
                <div
                  className={`h-4 rounded w-full ${
                    darkMode ? "bg-gray-600" : "bg-gray-400"
                  }`}
                ></div>
                <div
                  className={`h-4 rounded w-5/6 ${
                    darkMode ? "bg-gray-600" : "bg-gray-400"
                  }`}
                ></div>
                <div className="flex justify-between items-center pt-2">
                  <div
                    className={`h-5 rounded w-20 ${
                      darkMode ? "bg-green-600" : "bg-green-400"
                    }`}
                  ></div>
                  <div
                    className={`h-6 rounded w-24 ${
                      darkMode ? "bg-blue-600" : "bg-blue-400"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-20 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-8">Available Rooms</h1>

      {/* Filters + Sort container */}
      <div className="max-w-7xl mx-auto mb-6 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: filters + button */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-1">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className={`px-3 py-2 border rounded w-full sm:w-32 focus:outline-none ${
                darkMode
                  ? "bg-gray-800 border-gray-600 placeholder-gray-400 text-gray-200 focus:border-blue-500"
                  : "bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-600"
              }`}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className={`px-3 py-2 border rounded w-full sm:w-32 focus:outline-none ${
                darkMode
                  ? "bg-gray-800 border-gray-600 placeholder-gray-400 text-gray-200 focus:border-blue-500"
                  : "bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-600"
              }`}
            />
            <button
              onClick={fetchRooms}
              className={`px-5 py-2 rounded w-full sm:w-auto transition ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              Apply Filter
            </button>
          </div>

          {/* Right: sort dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`w-full sm:w-48 px-3 py-2 border rounded focus:outline-none ${
                darkMode
                  ? "bg-gray-800 border-gray-600 placeholder-gray-400 text-gray-200 focus:border-blue-500"
                  : "bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-600"
              }`}
              aria-label="Sort by price"
            >
              <option value="">No Sort</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {rooms.length === 0 ? (
          <p className="text-center col-span-3 text-gray-500">
            No rooms match the filter.
          </p>
        ) : (
          rooms.map((room) => (
            <div
              key={room._id}
              onClick={() => navigate(`/roomdetails/${room._id}`)}
              className={`rounded-xl overflow-hidden shadow-md cursor-pointer
                transition-colors duration-300 ease-in-out
                ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-100"
                } hover:shadow-xl`}
            >
              <img
                src={room.gallery?.[0] || "https://via.placeholder.com/400x300"}
                alt={room.hotelName}
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:brightness-110 hover:contrast-105"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-bold">{room.hotelName}</h2>
                <p className="text-sm text-gray-400">
                  {room.details?.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-green-400 font-semibold">
                    ${room.pricePerNight}/night
                  </span>
                  <Link
                    to={`/roomdetails/${room._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Rooms;
