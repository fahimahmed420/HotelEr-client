import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker-custom.css"; // keep your custom styles
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BannerSection = () => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [bgVisible, setBgVisible] = useState(false);
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const images = ["2579.jpg", "footer.png", "login-bg.jpg"];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden">
      <div
        className={`absolute top-0 left-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ${bgVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: bgVisible ? `url(${images[index]})` : "none",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white max-w-3xl w-full p-4">
        {/* Faded Text Animations */}
        {/* Faded + Shimmer Text Animations */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight 
             bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300
             bg-clip-text text-transparent animate-[shimmer_3s_infinite]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Book Your Dream Hotel With Hoteler
        </motion.h1>

        <motion.p
          className="mt-3 text-sm sm:text-base 
             text-gray-100 drop-shadow-[0_0_12px_#ffffff80]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Find the best rooms and special deals for your next trip.
        </motion.p>


        {/* Button with Gradient Hover Effect */}
        <motion.button
          onClick={() => navigate("/rooms")}
          whileHover={{ scale: 1.03 }}
          className="mt-4 px-6 py-3 rounded-full font-semibold text-white text-sm 
                     bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 
                     shadow-lg transition-all"
        >
          View All Rooms
        </motion.button>

        {/* Booking Form */}
        <motion.div
          className="bg-white text-black p-6 rounded-2xl shadow-lg flex flex-wrap gap-4 justify-center items-stretch sm:items-end mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
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
            onClick={() =>
              alert(
                `Check-In: ${checkIn.toDateString()}, Check-Out: ${checkOut.toDateString()}, Guests: ${guests}`
              )
            }
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:from-gray-600 hover:to-gray-800 transition"
          >
            CHECK AVAILABILITY
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerSection;
