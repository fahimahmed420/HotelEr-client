import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  const fetchRooms = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/api/rooms";
      if (minPrice && maxPrice) {
        url += `?minPrice=${minPrice}&maxPrice=${maxPrice}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) return <div className="text-center text-white py-20"><span className="loading loading-spinner text-error"></span>Loading rooms<span className="loading loading-spinner text-error"></span></div>;

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Available Rooms</h1>

      {/* Price Range Filter */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-3 py-2 border rounded w-full sm:w-auto"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-3 py-2 border rounded w-full sm:w-auto"
        />
        <button
          onClick={fetchRooms}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 w-full sm:w-auto"
        >
          Apply Filter
        </button>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {rooms.length === 0 ? (
          <p className="text-center col-span-3 text-gray-500">No rooms match the filter.</p>
        ) : (
          rooms.map((room) => (
            <div
              key={room._id}
              onClick={() => navigate(`/roomdetails/${room._id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            >
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
