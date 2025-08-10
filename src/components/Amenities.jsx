import React, { useContext } from "react";
import { FiWifi, FiSun } from "react-icons/fi";
import { MdAirportShuttle, MdSecurity, MdOutlinePool } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa6";
import { ThemeContext } from "../utils/ThemeContext";

const Amenities = () => {
  const { darkMode } = useContext(ThemeContext);

  const items = [
    { icon: FiWifi, label: "Free Wi-Fi" },
    { icon: FaDumbbell, label: "Gym" },
    { icon: FiSun, label: "Spa" },
    { icon: MdOutlinePool, label: "Pool" },
    { icon: MdAirportShuttle, label: "Airport Shuttle" },
    { icon: MdSecurity, label: "24/7 Security" },
  ];

  return (
    <section className={`py-20 px-4 ${darkMode ? "bg-[var(--primary-50)]" : "bg-[var(--primary-100)]"}`}>
      <div className="max-w-7xl px-4 mx-auto text-center mb-10">
        <h2 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-4`}>
          Amenities & Services
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon
              size={32}
              className={darkMode ? "text-blue-400" : "text-blue-600"}
            />
            <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
