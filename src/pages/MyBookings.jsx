import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../utils/ThemeContext";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://hotel-booking-server-side-ruddy.vercel.app";

const SkeletonBlock = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${className}`}
  />
);

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editBooking, setEditBooking] = useState(null);
  const [newCheckIn, setNewCheckIn] = useState(new Date());
  const [newCheckOut, setNewCheckOut] = useState(new Date());

  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

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
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

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
    <div
      className={`min-h-screen py-20 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Blur background when modal is open */}
        <div className={editBooking ? "filter blur-sm pointer-events-none" : ""}>
          <h1 className="text-3xl font-bold text-center">
            My Bookings
          </h1>

          {isLoading ? (
            <div className="mt-6 overflow-x-auto">
              <table
                className={`w-full rounded-lg overflow-hidden border text-left ${darkMode
                    ? "border-gray-700 bg-gray-800 text-gray-100"
                    : "border-gray-300 bg-white text-gray-900"
                  }`}
              >
                <thead className={darkMode ? "bg-gray-700" : "bg-gray-100"}>
                  <tr>
                    {["Room", "Check-In", "Check-Out", "Guests", "Total", "Actions"].map(
                      (_, idx) => (
                        <th key={idx} className="p-3">
                          <SkeletonBlock className="h-5 w-20" />
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className={`border-t ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
                        }`}
                    >
                      <td className="p-3">
                        <SkeletonBlock className="h-6 w-32" />
                      </td>
                      <td className="p-3">
                        <SkeletonBlock className="h-6 w-24" />
                      </td>
                      <td className="p-3">
                        <SkeletonBlock className="h-6 w-24" />
                      </td>
                      <td className="p-3">
                        <SkeletonBlock className="h-6 w-12" />
                      </td>
                      <td className="p-3">
                        <SkeletonBlock className="h-6 w-16" />
                      </td>
                      <td className="p-3 flex flex-col sm:flex-row gap-2">
                        <div className={`h-7 w-20 rounded-full animate-pulse ${darkMode ? "bg-blue-600" : "bg-blue-400"}`} />
                        <SkeletonBlock className="h-7 w-20 rounded-full" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : bookings.length === 0 ? (
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mt-4`}>
              You have no bookings yet.
            </p>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table
                className={`w-full rounded-lg overflow-hidden border text-left ${darkMode
                    ? "border-gray-700 bg-gray-800 text-gray-100"
                    : "border-gray-300 bg-white text-gray-900"
                  }`}
              >
                <thead
                  className={`${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
                    }`}
                >
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
                        className={`border-t ${darkMode
                            ? "border-gray-700 hover:bg-gray-900 bg-gray-800"
                            : "border-gray-200 hover:bg-gray-300 bg-white"
                          }`}
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
                            className={`rounded-full px-3 py-1 text-sm ${darkMode
                                ? "bg-blue-700 hover:bg-blue-600 text-white"
                                : "bg-blue-600 hover:bg-blue-500 text-white"
                              }`}
                          >
                            Update Date
                          </button>
                          <button
                            onClick={() => cancelBooking(booking)}
                            className={`rounded-full px-3 py-1 text-sm ${isCancelable
                                ? darkMode
                                  ? "bg-red-700 hover:bg-red-600 text-white"
                                  : "bg-red-600 hover:bg-red-500 text-white"
                                : darkMode
                                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                              }`}
                            disabled={!isCancelable}
                          >
                            Cancel
                          </button>
                          {!isCancelable && (
                            <span
                              className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                            >
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
        </div>

        {/* Modal */}
        {editBooking && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
            <div
              className={`rounded-lg p-6 max-w-sm w-full space-y-4 ${darkMode
                  ? "bg-gray-800 bg-opacity-80 text-gray-100"
                  : "bg-white bg-opacity-80 text-gray-900"
                } backdrop-filter backdrop-blur-md`}
            >
              <h3 className="text-xl font-bold">Update Booking Date</h3>
              <div>
                <label className="block font-medium mb-1">Check-In</label>
                <DatePicker
                  selected={newCheckIn}
                  onChange={(date) => setNewCheckIn(date)}
                  className={`border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 w-full ${darkMode
                      ? "border-gray-600 focus:border-blue-400 focus:ring-blue-400 bg-gray-900 text-gray-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                    }`}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Check-Out</label>
                <DatePicker
                  selected={newCheckOut}
                  onChange={(date) => setNewCheckOut(date)}
                  className={`border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 w-full ${darkMode
                      ? "border-gray-600 focus:border-blue-400 focus:ring-blue-400 bg-gray-900 text-gray-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                    }`}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setEditBooking(null)}
                  className={`rounded-full px-3 py-1 hover:bg-gray-400 ${darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-300 text-gray-800"
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateDate}
                  className="rounded-full px-3 py-1 bg-green-600 text-white hover:bg-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}
