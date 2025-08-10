import React, { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";

function AboutUs() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen py-20 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Headline moved here with same style as MyBookings */}
        <h1
          className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-black"
            }`}
        >
          About HotelEr
        </h1>

        <div
          className={`rounded-2xl p-8 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"
            }`}
        >
          <p className="mb-4 text-lg">
            <strong>HotelEr</strong> is your trusted platform for booking premium hotel rooms,
            cozy retreats, and scenic stays across Bangladesh. Whether you're seeking luxury,
            comfort, or adventure — we make discovering and booking the perfect room simple and
            secure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h2
                className={`text-xl font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
              >
                Our Mission
              </h2>
              <p>
                To simplify hotel booking with a seamless and user-friendly experience. We connect
                travelers with quality stays, backed by real reviews, transparent pricing, and
                excellent service.
              </p>
            </div>
            <div>
              <h2
                className={`text-xl font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
              >
                Why Choose HotelEr?
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Real-time availability and instant booking</li>
                <li>Authentic guest reviews and ratings</li>
                <li>Filters by price, facilities, availability, and location</li>
                <li>Safe payments and dedicated support</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h2
              className={`text-xl font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"
                }`}
            >
              Our Story
            </h2>
            <p>
              HotelEr was founded in <strong>June 2025</strong> with a vision to modernize the
              hotel booking experience. Built by a team of travel enthusiasts and developers, our
              goal is to empower travelers to find their perfect stay — with no stress, no hidden
              fees, and complete control.
            </p>
          </div>

          <div className="mt-10 text-center">
            <h2
              className={`text-xl font-semibold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"
                }`}
            >
              Meet the Founder
            </h2>
            <div className="flex justify-center mb-8">
              <div className="text-center">
                <img
                  src="https://i.ibb.co/SwwR8MqS/animated.gif"
                  alt="Emperor Cloud"
                  className="w-28 h-28 rounded-full mx-auto mb-2 border-4 border-blue-500"
                />
                <p className="font-bold text-lg">Emperor Cloud</p>
                <p className="text-sm text-gray-400">Founder & Full Stack Developer</p>
              </div>
            </div>

            <h2
              className={`text-xl font-semibold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"
                }`}
            >
              Hotel Management Team
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <img
                  src="https://i.pravatar.cc/150?u=manager1"
                  alt="Team member"
                  className="w-24 h-24 rounded-full mx-auto mb-2"
                />
                <p className="font-semibold">Salman Rahman</p>
                <p className="text-sm text-gray-400">Operations Manager</p>
              </div>
              <div className="text-center">
                <img
                  src="https://i.pravatar.cc/150?u=manager2"
                  alt="Team member"
                  className="w-24 h-24 rounded-full mx-auto mb-2"
                />
                <p className="font-semibold">Mehzabin Chowdhury</p>
                <p className="text-sm text-gray-400">Customer Experience Lead</p>
              </div>
              <div className="text-center">
                <img
                  src="https://i.pravatar.cc/150?u=manager3"
                  alt="Team member"
                  className="w-24 h-24 rounded-full mx-auto mb-2"
                />
                <p className="font-semibold">Tania Akter</p>
                <p className="text-sm text-gray-400">Hotel Partnership Manager</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2
              className={`text-xl font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"
                }`}
            >
              Contact Us
            </h2>
            <p>
              Have questions or feedback? Reach out at{" "}
              <a href="mailto:support@hoteler.com" className="text-blue-500 underline">
                support@hoteler.com
              </a>
              . We're here to help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
