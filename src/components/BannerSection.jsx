import React, { useEffect, useRef, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker-custom.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../utils/ThemeContext";

const BannerSection = () => {
  const { darkMode } = useContext(ThemeContext);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [bgVisible, setBgVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const headingText = darkMode ? "text-gray-100" : "text-white";

  const bgImage = "Everest.jpeg";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBgVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  const handleCheckAvailability = async () => {
    try {
      const res = await fetch(
        `https://hotel-booking-server-side-ruddy.vercel.app/api/rooms/available?checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`
      );
      const availableRooms = await res.json();

      if (availableRooms.length > 0) {
        const roomNames = availableRooms.map((r) => r.hotelName).join(", ");
        toast.success(`Available Rooms: ${roomNames}`);
      } else {
        toast.info("No rooms available in these dates.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to check availability.");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden"
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ${
          bgVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundAttachment: "fixed",
          filter: darkMode ? "brightness(0.55)" : "brightness(0.85)",
        }}
      />
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center max-w-7xl px-4 w-full p-4"
        style={{ color: darkMode ? "white" : "black" }}
      >
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${headingText}`}
        >
          Book Your Dream Hotel With HotelEr
        </h1>

        <p
          className={`mt-3 text-sm sm:text-base ${headingText}`}
        >
          Find the best rooms and special deals for your next trip.
        </p>

        <button
          onClick={() => navigate("/rooms")}
          className="mt-4 px-6 py-3 rounded-full font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          View All Rooms
        </button>

        {/* Booking Form */}
        <div
          className={`p-6 rounded-2xl shadow-lg flex flex-wrap gap-4 justify-center items-stretch sm:items-end mt-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
          style={{ color: darkMode ? "white" : "black" }}
        >
          <div className="flex flex-col text-left">
            <label className="font-medium mb-1 text-sm">Check-In</label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              dateFormat="dd MMM yyyy"
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
              placeholderText="Select date"
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="font-medium mb-1 text-sm">Check-Out</label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              dateFormat="dd MMM yyyy"
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
              placeholderText="Select date"
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="font-medium mb-1 text-sm">Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCheckAvailability}
            className="mt-auto px-6 py-3 rounded-full font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            CHECK AVAILABILITY
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </section>
  );
};

export default BannerSection;
