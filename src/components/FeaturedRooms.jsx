import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://hotel-booking-server-side-ruddy.vercel.app/api/top-rooms-by-review')
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
        console.error('Error fetching top rooms:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="text-center text-blue-800 dark:text-blue-300">Loading top rooms...</div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-800 dark:text-blue-300 mb-12">
          🌟 Featured Rooms
        </h2>
        {rooms.length === 0 ? (
          <p className="text-center text-blue-800 dark:text-blue-300">No top rooms found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={room.gallery?.[0] || 'https://source.unsplash.com/600x400/?hotel,room'}
                    alt={room.hotelName}
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow dark:bg-blue-500">
                    ★ {room.review} reviews
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                    {room.hotelName}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{room.description}</p>
                  <Link
                    to={`/roomdetails/${room._id}`}
                    className="inline-block px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition rounded-full text-sm font-medium"
                  >
                    Book Now
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
