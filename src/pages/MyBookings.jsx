import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Optional: Replace with environment variable if available
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Fetch bookings and related room info
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookingsAndRooms = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/mybookings?email=${user.email}`);
        const data = await res.json();
        setBookings(data);

        const uniqueRoomIds = [...new Set(data.map(b => b.roomId))];

        const roomResponses = await Promise.all(
          uniqueRoomIds.map(id =>
            fetch(`${BASE_URL}/api/rooms/${id}`).then(res => res.json())
          )
        );

        const roomData = {};
        uniqueRoomIds.forEach((id, i) => {
          roomData[id] = roomResponses[i];
        });

        setRooms(roomData);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingsAndRooms();
  }, [user]);

  const cancelBooking = async (booking) => {
    const checkInDate = new Date(booking.checkIn);
    const today = new Date();
    const oneDayBeforeCheckIn = new Date(checkInDate);
    oneDayBeforeCheckIn.setDate(checkInDate.getDate() - 1);

    if (today >= oneDayBeforeCheckIn) {
      toast.error("Booking can only be cancelled at least 1 day before check-in.");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/bookings/${booking._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete booking");

      // Update room availability
      const updateRes = await fetch(`${BASE_URL}/api/rooms/${booking.roomId}/availability`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: true }),
      });

      if (!updateRes.ok) {
        console.warn("Room availability update failed:", await updateRes.text());
        toast.warning("Booking canceled, but room availability update failed.");
      }

      setBookings(prev => prev.filter(b => b._id !== booking._id));
      toast.success("Booking canceled successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel booking.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto py-20 text-black">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {isLoading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const room = rooms[booking.roomId] || {};
            const isCancelable =
              new Date() < new Date(new Date(booking.checkIn).setDate(new Date(booking.checkIn).getDate() - 1));

            return (
              <li key={booking._id} className="bg-white rounded-xl shadow p-4 space-y-2">
                {room.gallery?.[0] && (
                  <img
                    src={room.gallery[0]}
                    alt={room.hotelName || "Room image"}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}
                <h2 className="text-lg font-semibold">{room.hotelName || "Loading room..."}</h2>
                <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  weekday: "short"
                })}</p>
                <p><strong>Guests:</strong> {booking.guests}</p>
                <p><strong>Total:</strong> ${booking.total}</p>
                <button
                  onClick={() => cancelBooking(booking)}
                  className="mt-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                  disabled={!isCancelable}
                >
                  Cancel
                </button>
                {!isCancelable && (
                  <p className="text-xs text-gray-400 italic">Cannot cancel within 1 day of check-in.</p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
}

export default MyBookings;
