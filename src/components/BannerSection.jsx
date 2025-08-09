import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker-custom.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BannerSection = () => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [bgVisible, setBgVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Theme state synced with data-theme attribute
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

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

  const backgroundFilter =
    theme === "dark" ? "brightness(0.55)" : "brightness(0.85)";
  const textShadow = "0 2px 6px rgba(0,0,0,0.7)";
  const subTextShadow = "0 1px 4px rgba(0,0,0,0.6)";

  // Button styles shared by both buttons
  const buttonStyles = {
    background: "linear-gradient(to right, var(--primary-600), var(--primary-500))",
    color: theme === "dark" ? "var(--text-900)" : "var(--text-950)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "background 0.3s ease",
  };

  // Hover effect function for buttons
  const handleButtonHover = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(to right, var(--primary-500), var(--primary-600))";
  };
  const handleButtonLeave = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(to right, var(--primary-600), var(--primary-500))";
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
          backgroundImage: bgVisible ? `url(${bgImage})` : "none",
          backgroundAttachment: "fixed",
          filter: backgroundFilter,
        }}
      />
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl w-full p-4"
        style={{ color: `var(--text-50)`, textShadow }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Book Your Dream Hotel With HotelEr
        </motion.h1>

        <motion.p
          className="mt-3 text-sm sm:text-base"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ color: `var(--text-100)`, textShadow: subTextShadow }}
        >
          Find the best rooms and special deals for your next trip.
        </motion.p>

        <motion.button
          onClick={() => navigate("/rooms")}
          whileHover={{ scale: 1.03 }}
          style={buttonStyles}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="mt-4 px-6 py-3 rounded-full font-semibold text-sm"
        >
          View All Rooms
        </motion.button>

        {/* Booking Form */}
        <motion.div
          className="p-6 rounded-2xl shadow-lg flex flex-wrap gap-4 justify-center items-stretch sm:items-end mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            backgroundColor:
              theme === "dark" ? "var(--background-900)" : "white",
            color: theme === "dark" ? "var(--text-100)" : "black",
          }}
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

          <motion.button
            onClick={handleCheckAvailability}
            whileHover={{ scale: 1.03 }}
            style={buttonStyles}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="mt-auto px-6 py-3 rounded-full font-semibold text-sm"
          >
            CHECK AVAILABILITY
          </motion.button>
        </motion.div>
      </div>
      <ToastContainer position="top-center" />
    </section>
  );
};

export default BannerSection;
