import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rooms");
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <div className="text-center text-white py-20">Loading rooms...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Available Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img
              src={room.gallery?.[0] || "https://via.placeholder.com/400x300"}
              alt={room.hotelName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">{room.hotelName}</h2>
              <p className="text-sm text-gray-600">{room.details?.slice(0, 100)}...</p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-green-600 font-semibold">${room.pricePerNight}/night</span>
                <Link
                  to={`/roomdetails/${room._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
