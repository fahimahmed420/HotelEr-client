import React, { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({}); // roomId => room

  useEffect(() => {
    // Fetch bookings for this user
    fetch("http://localhost:5000/api/mybookings?email=test@example.com")
      .then(res => res.json())
      .then(async data => {
        setBookings(data);

        // Fetch all rooms used in these bookings
        const uniqueRoomIds = [...new Set(data.map(b => b.roomId))];
        const roomData = {};

        for (let roomId of uniqueRoomIds) {
          const res = await fetch(`http://localhost:5000/api/rooms/${roomId}`);
          const room = await res.json();
          roomData[roomId] = room;
        }

        setRooms(roomData);
      });
  }, []);

  const cancelBooking = async (id) => {
    await fetch(`http://localhost:5000/api/bookings/${id}`, { method: "DELETE" });
    setBookings(bookings.filter(b => b._id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map(b => {
            const room = rooms[b.roomId] || {};
            return (
              <li key={b._id} className="bg-white rounded shadow p-4">
                <p><strong>Room:</strong> {room.name || "Loading..."}</p>
                {room.image && (
                  <img src={room.image} alt={room.name} className="w-48 h-32 object-cover rounded mb-2" />
                )}
                <p><strong>Check-in:</strong> {b.checkIn ? new Date(b.checkIn).toLocaleDateString() : "N/A"}</p>
                <p><strong>Guests:</strong> {b.guests || "N/A"}</p>
                <button onClick={() => cancelBooking(b._id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
                  Cancel
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MyBookings;
