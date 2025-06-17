import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSwipeable } from "react-swipeable";
import "../styles/datepicker-custom.css";

const BannerSection = () => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [bgVisible, setBgVisible] = useState(false);
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);

  const images = ["2579.jpg", "footer.png", "login-bg.jpg"];

  // Fade-in background
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

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // every 3s
    return () => clearInterval(interval);
  }, [images.length]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => (prev + 1) % images.length),
    onSwipedRight: () =>
      setIndex((prev) => (prev - 1 + images.length) % images.length),
    trackMouse: true,
  });

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] overflow-hidden mb-10">
      <div
        className={`absolute top-0 left-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ${
          bgVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: bgVisible ? "url('/2579.jpg')" : "none",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="relative z-10 h-full flex items-center justify-center px-4 mt-36">
        <div className="text-center text-white  max-w-3xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Book Your Dream Hotel With Hoteler
          </h1>

          {/* Phone mockup with slider */}
          <div className="mockup-phone border-primary relative scale-[0.6] sm:scale-[0.7] mx-auto">
            <div className="mockup-phone-camera"></div>
            <div
              {...swipeHandlers}
              className="mockup-phone-display overflow-hidden p-0 relative"
            >
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`slide-${i}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                    index === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Booking form */}
          <div className="bg-white text-black p-6 rounded-xl shadow-lg flex flex-wrap gap-4 justify-center items-stretch sm:items-end">
            <div className="flex flex-col text-left">
              <label className="font-medium mb-1 text-sm">Check-In</label>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                dateFormat="dd MMM yyyy"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium mb-1 text-sm">Check-Out</label>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                dateFormat="dd MMM yyyy"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium mb-1 text-sm">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() =>
                alert(
                  `Check-In: ${checkIn.toDateString()}, Check-Out: ${checkOut.toDateString()}, Guests: ${guests}`
                )
              }
              className="bg-black text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-gray-800 transition"
            >
              CHECK AVAILABILITY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
