import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);

  // Set body theme
  useEffect(() => {
    document.body.className = darkMode
      ? 'bg-[#1d130c] text-[#f5deb3]'
      : 'bg-white text-[#1a1a1a]';
  }, [darkMode]);

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-wrapper')) {
        setShowDropdown(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setShowDropdown(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
        darkMode
          ? scrolled
            ? 'bg-[#1d130c]/90 shadow-md py-2'
            : 'bg-transparent py-4'
          : scrolled
          ? 'bg-white/90 shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 flex justify-between items-center transition-all duration-300">
        <h1
          className={`font-bold tracking-wide transition-all duration-300 ${
            scrolled ? 'text-lg' : 'text-xl'
          }`}
        >
          HotelEr
        </h1>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          {['/', '/rooms', '/bookings', '/aboutus'].map((path, idx) => {
            const labels = ['Home', 'Rooms', 'My Bookings', 'About Us'];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-base font-medium hover:text-[#ffa94d] ${
                    isActive ? 'text-[#ffa94d]' : ''
                  }`
                }
              >
                {labels[idx]}
              </NavLink>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 relative dropdown-wrapper">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-[#f5deb3] hover:text-[#ffa94d] transition md:mr-2"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Profile or Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-[#ffa94d] cursor-pointer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#ffa94d] text-white flex items-center justify-center font-bold uppercase">
                    {user.displayName?.charAt(0) || 'U'}
                  </div>
                )}
              </button>

              {showDropdown && (
                <div
                  className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg py-2 z-50 cursor-pointer ${
                    darkMode
                      ? 'bg-[#2b1a0c] text-[#f5deb3]'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-[#ffa94d]/10"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#ffa94d]/10 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                className={`hidden md:block px-4 py-1.5 rounded-md transition border ${
                  darkMode
                    ? 'bg-[#a35c27] border-[#c68447] text-[#fff3e0] hover:bg-[#c68447]'
                    : 'bg-orange-500 text-white border-orange-600 hover:bg-orange-600'
                }`}
              >
                Login
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <X className="text-[#f5deb3]" />
            ) : (
              <Menu className="text-[#f5deb3]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="mt-4 flex flex-col space-y-3 md:hidden px-6">
          {['/', '/rooms', '/bookings', '/reviews'].map((path, idx) => {
            const labels = ['Home', 'Rooms', 'My Bookings', 'Reviews'];
            return (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium hover:text-[#ffa94d] ${
                    isActive ? 'text-[#ffa94d]' : ''
                  }`
                }
              >
                {labels[idx]}
              </NavLink>
            );
          })}
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium hover:text-[#ffa94d]"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className={`w-fit px-4 py-1.5 rounded-md transition border ${
                  darkMode
                    ? 'bg-[#a35c27] border-[#c68447] text-[#fff3e0] hover:bg-[#c68447]'
                    : 'bg-orange-500 text-white border-orange-600 hover:bg-orange-600'
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button
                className={`w-fit px-4 py-1.5 rounded-md transition border ${
                  darkMode
                    ? 'bg-[#a35c27] border-[#c68447] text-[#fff3e0] hover:bg-[#c68447]'
                    : 'bg-orange-500 text-white border-orange-600 hover:bg-orange-600'
                }`}
              >
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
