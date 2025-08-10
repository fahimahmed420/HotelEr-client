import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../utils/ThemeContext";

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://hotel-booking-server-side-ruddy.vercel.app/api/top-rooms-by-review")
      .then((res) => res.json())
      .then((data) => {
        const sortedRooms = data
          .map((room) => ({ ...room, reviewNumber: Number(room.review) || 0 }))
          .sort((a, b) => b.reviewNumber - a.reviewNumber)
          .slice(0, 6);
        setRooms(sortedRooms);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top rooms:", error);
        setLoading(false);
      });
  }, []);

  const bgClass = darkMode ? "bg-[#111827]" : "bg-gray-50";
  const textClass = darkMode ? "text-gray-200" : "text-gray-900";
  const cardBgClass = darkMode ? "bg-[#1F2937]" : "bg-white";
  const borderClass = darkMode ? "border-gray-700" : "border-gray-300";
  const subTextClass = darkMode ? "text-gray-300" : "text-gray-700";
  const reviewBgClass = darkMode ? "bg-[#60A5FA]" : "bg-[#3B82F6]";

  if (loading) {
    return (
      <section className={`py-20 transition-colors duration-500 ${bgClass}`}>
        <div className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Loading top rooms...
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 transition-colors duration-500 ${bgClass}`}>
      <div className="max-w-7xl px-4 mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 ${textClass}`}>
          🌟 Featured Rooms
        </h2>
        {rooms.length === 0 ? (
          <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            No top rooms found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room) => (
              <div
                key={room._id}
                className={`group rounded-2xl border ${borderClass} shadow-md hover:shadow-lg 
                  transition overflow-hidden ${cardBgClass} ${textClass}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      room.gallery?.[0] ||
                      "https://source.unsplash.com/600x400/?hotel,room"
                    }
                    alt={room.hotelName}
                    className="w-full h-56 object-cover transform origin-center will-change-transform
               transition-transform duration-700 ease-in-out
               group-hover:scale-105 group-hover:-translate-y-1"
                  />
                  <div
                    className={`absolute top-2 right-2 ${reviewBgClass} text-white text-xs px-3 py-1 rounded-full shadow`}
                  >
                    ★ {room.review} reviews
                  </div>
                </div>


                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.hotelName}</h3>
                  <p className={`${subTextClass} text-sm mb-4`}>
                    {room.description}
                  </p>
                  <Link
                    to={`/roomdetails/${room._id}`}
                    className="inline-block px-5 py-2 rounded-full text-sm font-medium
                      bg-[#3B82F6] text-white hover:bg-[#2563EB] transition"
                  >
                    Reserve Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
