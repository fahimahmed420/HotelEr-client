import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  Sun,
  Moon,
  Home,
  Phone,
  User,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ThemeContext } from "../utils/ThemeContext";

const DashboardLayout = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false); 

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeButtonClasses = darkMode
    ? "text-[#93C5FD] hover:text-[#3B82F6]"
    : "text-[#3B82F6] hover:text-[#93C5FD]";

  const navItems = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/contact", label: "Contact Us", icon: <Phone size={20} /> },
  ];

  return (
    <div
      className={`min-h-screen py-24 px-6 ${
        darkMode
          ? "bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-white/70 text-gray-900"
      }`}
    >
      {/* Top Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
          scrolled
            ? darkMode
              ? "bg-[#111827cc] shadow-md py-2"
              : "bg-white/90 shadow-md py-2"
            : "bg-transparent py-4"
        } ${darkMode ? "text-gray-200" : "text-gray-800"}`}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-6 flex justify-between items-center">
          <h1
            className={`font-bold tracking-wide transition-all duration-300 ${
              scrolled ? "text-2xl" : "text-3xl"
            } flex items-center gap-3`}
          >
            
            <Link className="flex items-center gap-2 hover:text-blue-400" to="/"><Home size={30} />HotelEr Dashboard</Link>
          </h1>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-lg">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 font-semibold transition-colors duration-200 hover:text-blue-400 ${
                    isActive
                      ? "text-[#3B82F6]"
                      : darkMode
                      ? "text-gray-200"
                      : "text-gray-700"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`transition ${themeButtonClasses} flex items-center gap-2 font-semibold`}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <>
                  <Sun size={24} />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={24} />
                  Dark Mode
                </>
              )}
            </button>
          </div>

          {/* Mobile Nav Dropdown Toggle */}
          <div
            className="md:hidden flex items-center justify-between cursor-pointer select-none"
            onClick={() => setNavDropdownOpen(!navDropdownOpen)}
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              Menu
            </span>
            {navDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <ul
          className={`md:hidden mt-2 space-y-3 px-4 py-7 ${
            navDropdownOpen ? "block" : "hidden"
          }`}
        >
          {navItems.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setNavDropdownOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 font-semibold text-lg px-2 py-1 rounded-md hover:bg-blue-100 ${
                    isActive
                      ? "bg-blue-200 text-blue-700"
                      : darkMode
                      ? "hover:bg-blue-700 hover:text-white"
                      : "hover:bg-blue-100 hover:text-blue-700"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setNavDropdownOpen(false);
              }}
              className={`flex items-center gap-2 font-semibold px-2 py-1 rounded-md w-full ${
                darkMode
                  ? "hover:bg-blue-700 hover:text-white"
                  : "hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
      </nav>

      {/* Dashboard Content */}
      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row gap-8 pt-24 ${
          darkMode ? "bg-gray-900/50" : "bg-white/40"
        } backdrop-blur-md rounded-3xl shadow-lg p-8`}
      >
        {/* Sidebar */}
        <aside
          className={`w-full md:w-40 rounded-3xl shadow-md p-4 ${
            darkMode ? "bg-gray-900/80" : "bg-white/80"
          }`}
        >
          {/* Mobile dropdown toggle */}
          <div
            className="md:hidden flex items-center justify-between cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="flex items-center gap-2 text-sm font-semibold select-none">
              <User size={16} />
              Dashboard Menu
            </span>
            {menuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {/* Menu list */}
          <ul className={`mt-4 space-y-4 ${menuOpen ? "block" : "hidden"} md:block`}>
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium cursor-pointer ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
              >
                <User size={18} />
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="security"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium cursor-pointer ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
              >
                <Shield size={18} />
                Security
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 text-xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
