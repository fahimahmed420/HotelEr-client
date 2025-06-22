import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editBooking, setEditBooking] = useState(null);
  const [newCheckIn, setNewCheckIn] = useState(new Date());
  const [newCheckOut, setNewCheckOut] = useState(new Date());

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email || !user?.accessToken) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/api/mybookings?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const data = await res.json();
        setBookings(data);

        const roomIds = [...new Set(data.map((b) => b.roomId))];
        const roomResponses = await Promise.all(
          roomIds.map((id) =>
            fetch(`${BASE_URL}/api/rooms/${id}`).then((r) => r.json())
          )
        );
        const roomData = {};
        roomIds.forEach((id, i) => {
          roomData[id] = roomResponses[i];
        });
        setRooms(roomData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load bookings.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const cancelBooking = async (booking) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      const res = await fetch(`${BASE_URL}/api/bookings/${booking._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (!res.ok) throw new Error("Cancel failed");

      await fetch(`${BASE_URL}/api/rooms/${booking.roomId}/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ available: true }),
      });

      setBookings((prev) => prev.filter((b) => b._id !== booking._id));
      toast.success("Booking canceled successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking.");
    }
  };

  const openEditModal = (booking) => {
    setEditBooking(booking);
    setNewCheckIn(new Date(booking.checkIn));
    setNewCheckOut(new Date(booking.checkOut));
  };

  const handleUpdateDate = async () => {
    if (!editBooking) return;

    if (newCheckIn >= newCheckOut) {
      toast.error("Check-out must be after Check-in.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/bookings/${editBooking._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          checkIn: newCheckIn,
          checkOut: newCheckOut,
        }),
      });
      if (!res.ok) throw new Error("Update failed");

      toast.success("Booking updated successfully");
      setEditBooking(null);

      // Refetch updated bookings
      const updated = await fetch(
        `${BASE_URL}/api/mybookings?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      ).then((r) => r.json());

      setBookings(updated);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update booking.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto py-20 text-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center md:text-left">My Bookings</h1>

      {isLoading && <p className="text-gray-500 mt-4">Loading bookings...</p>}

      {!isLoading && bookings.length === 0 && (
        <p className="text-gray-500 mt-4">You have no bookings yet.</p>
      )}

      {!isLoading && bookings.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full rounded-lg overflow-hidden border border-gray-300 text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Room</th>
                <th className="p-3">Check-In</th>
                <th className="p-3">Check-Out</th>
                <th className="p-3">Guests</th>
                <th className="p-3">Total</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const room = rooms[booking.roomId] || {};
                const isCancelable =
                  new Date() <
                  new Date(
                    new Date(booking.checkIn).setDate(
                      new Date(booking.checkIn).getDate() - 1
                    )
                  );
                return (
                  <tr
                    key={booking._id}
                    className="bg-white hover:bg-gray-50 border-t border-gray-200"
                  >
                    <td className="p-3">{room.hotelName || "Loading…"}</td>
                    <td className="p-3">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </td>
                    <td className="p-3">{booking.guests}</td>
                    <td className="p-3">${booking.total}</td>
                    <td className="p-3 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => openEditModal(booking)}
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
                      >
                        Update Date
                      </button>
                      <button
                        onClick={() => cancelBooking(booking)}
                        className={`rounded-full px-3 py-1 text-sm ${
                          isCancelable
                            ? "bg-red-600 hover:bg-red-500 text-white"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                        disabled={!isCancelable}
                      >
                        Cancel
                      </button>
                      {!isCancelable && (
                        <span className="text-xs text-gray-400">
                          Must be 1+ day before check-in.
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {editBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-gray-900 space-y-4">
            <h3 className="text-xl font-bold">Update Booking Date</h3>
            <div>
              <label className="block font-medium">Check-In</label>
              <DatePicker
                selected={newCheckIn}
                onChange={(date) => setNewCheckIn(date)}
                className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Check-Out</label>
              <DatePicker
                selected={newCheckOut}
                onChange={(date) => setNewCheckOut(date)}
                className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 w-full"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setEditBooking(null)}
                className="bg-gray-300 rounded-full px-3 py-1 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDate}
                className="bg-green-600 rounded-full px-3 py-1 text-white hover:bg-green-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" />
    </div>
  );
}

export default MyBookings;
