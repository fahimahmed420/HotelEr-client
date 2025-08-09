import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);

  // Set data-theme attribute for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Scroll effect for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-wrapper")) setShowDropdown(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setShowDropdown(false);
    setMobileOpen(false);
  };

  // Colors for links and buttons depending on darkMode
  const activeColor = "#3B82F6"; // blue-500
  const hoverColor = "#93C5FD"; // blue-300

  // Button styles adapt to theme
  const buttonClasses = darkMode
    ? "bg-[#93C5FD] text-gray-900 border border-[#60A5FA] hover:bg-[#60A5FA]"
    : "bg-[#3B82F6] text-white border border-[#2563EB] hover:bg-[#93C5FD] hover:text-gray-900";

  // Common NavLink class builder
  const navLinkClass = ({ isActive }) =>
    `text-base font-medium transition-colors duration-200 hover:text-[${hoverColor}] ` +
    (isActive ? `text-[${activeColor}]` : "text-gray-700");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
        scrolled ? (darkMode ? "bg-[#111827cc] shadow-md py-2" : "bg-white/90 shadow-md py-2") : "bg-transparent py-4"
      } ${darkMode ? "text-gray-200" : "text-gray-800"}`}
    >
      <div className="mx-auto max-w-5xl px-6 flex justify-between items-center transition-all duration-300">
        <h1 className={`font-bold tracking-wide transition-all duration-300 ${scrolled ? "text-lg" : "text-xl"}`}>
          <Link to="/">HotelEr</Link>
        </h1>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => `text-base font-medium transition-colors duration-200 hover:text-[#93C5FD] ${isActive ? "text-[#3B82F6]" : darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Home
          </NavLink>
          <NavLink to="/rooms" className={({ isActive }) => `text-base font-medium transition-colors duration-200 hover:text-[#93C5FD] ${isActive ? "text-[#3B82F6]" : darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Rooms
          </NavLink>
          {user && (
            <NavLink to="/bookings" className={({ isActive }) => `text-base font-medium transition-colors duration-200 hover:text-[#93C5FD] ${isActive ? "text-[#3B82F6]" : darkMode ? "text-gray-200" : "text-gray-700"}`}>
              My Bookings
            </NavLink>
          )}
          <NavLink to="/aboutus" className={({ isActive }) => `text-base font-medium transition-colors duration-200 hover:text-[#93C5FD] ${isActive ? "text-[#3B82F6]" : darkMode ? "text-gray-200" : "text-gray-700"}`}>
            About Us
          </NavLink>
        </div>

        <div className="flex items-center gap-3 relative dropdown-wrapper">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`transition md:mr-2 ${
              darkMode ? "text-[#93C5FD] hover:text-[#3B82F6]" : "text-[#3B82F6] hover:text-[#93C5FD]"
            }`}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Profile or Login */}
          {user ? (
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-[#3B82F6] cursor-pointer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-bold uppercase">
                    {user.displayName?.charAt(0) || "U"}
                  </div>
                )}
              </button>

              {showDropdown && (
                <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg py-2 z-50 cursor-pointer bg-${darkMode ? "[#1F2937]" : "white"} text-${darkMode ? "gray-200" : "gray-800"}`}>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-[#93C5FD]/20"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#93C5FD]/20 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                className={`hidden md:block px-4 py-1.5 rounded-md transition border ${buttonClasses}`}
              >
                Login
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className={`md:hidden transition ${darkMode ? "text-[#93C5FD]" : "text-[#3B82F6]"}`} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className={`mt-4 flex flex-col space-y-3 md:hidden px-6 ${darkMode ? "bg-[#111827]" : "bg-white"}`}>
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `text-base font-medium hover:text-[#93C5FD] ${
                isActive ? "text-[#3B82F6]" : darkMode ? "text-gray-200" : "text-gray-700"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/rooms"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `text-base font-medium hover:text-[#93C5FD] ${
                isActive ? "text-[#3B82F6]" : darkMode ? "text-gray-200" : "text-gray-700"
              }`
            }
          >
            Rooms
          </NavLink>

          {user && (
            <NavLink
              to="/bookings"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium hover:text-[#93C5FD] ${
                  isActive ? "text-[#3B82F6]" : darkMode ? "text-gray-200" : "text-gray-700"
                }`
              }
            >
              My Bookings
            </NavLink>
          )}

          <NavLink
            to="/aboutus"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `text-base font-medium hover:text-[#93C5FD] ${
                isActive ? "text-[#3B82F6]" : darkMode ? "text-gray-200" : "text-gray-700"
              }`
            }
          >
            About Us
          </NavLink>

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium hover:text-[#93C5FD]"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className={`w-fit px-4 py-1.5 rounded-md transition border ${buttonClasses}`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className={`w-fit px-4 py-1.5 rounded-md transition border ${buttonClasses}`}>
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
