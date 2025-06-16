import React from 'react';
import { Link } from 'react-router-dom';

const rooms = [
  {
    id: 1,
    name: "Deluxe Sea View Room",
    description: "Stunning sea view, king-size bed, and premium amenities.",
    image: "https://source.unsplash.com/600x400/?hotel,room,sea",
  },
  {
    id: 2,
    name: "Cozy Mountain Retreat",
    description: "Mountain view room with a fireplace for total relaxation.",
    image: "https://source.unsplash.com/600x400/?hotel,room,mountain",
  },
  {
    id: 3,
    name: "City View Suite",
    description: "Modern suite in the city center with full facilities.",
    image: "https://source.unsplash.com/600x400/?hotel,room,city",
  },
  {
    id: 4,
    name: "Luxury Executive Room",
    description: "Business-friendly room with desk and high-speed WiFi.",
    image: "https://source.unsplash.com/600x400/?hotel,room,luxury",
  },
  {
    id: 5,
    name: "Family Fun Room",
    description: "Spacious room with bunk beds and kids’ play area.",
    image: "https://source.unsplash.com/600x400/?hotel,room,family",
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    description: "Romantic room with jacuzzi and private balcony.",
    image: "https://source.unsplash.com/600x400/?hotel,room,honeymoon",
  },
];

export default function FeaturedRooms() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-800 dark:text-blue-300 mb-12">
          🌟 Featured Rooms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow dark:bg-blue-500">
                  ★ Top Rated
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  {room.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{room.description}</p>
                <Link
                  to={`/rooms/${room.id}`}
                  className="inline-block px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition rounded-full text-sm font-medium"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
