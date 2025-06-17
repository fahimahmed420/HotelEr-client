import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.className = darkMode
      ? 'bg-[#1d130c] text-[#f5deb3]'
      : 'bg-white text-[#1a1a1a]';
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${darkMode
          ? scrolled
            ? 'bg-[#1d130c]/90 shadow-md py-2'
            : 'bg-transparent py-4'
          : scrolled
            ? 'bg-white/90 shadow-md py-2'
            : 'bg-transparent py-4'
        }`}
    >
      <div className="mx-auto max-w-5xl px-6 flex justify-between items-center transition-all duration-300">
        <h1 className={`font-bold tracking-wide transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>
          Hotel Booking
        </h1>
        <div className="hidden md:flex items-center space-x-6">
          {['/', '/rooms', '/bookings', '/reviews'].map((path, idx) => {
            const labels = ['Home', 'Rooms', 'My Bookings', 'Reviews'];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-base font-medium hover:text-[#ffa94d] ${isActive ? 'text-[#ffa94d]' : ''}`
                }
              >
                {labels[idx]}
              </NavLink>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-[#f5deb3] hover:text-[#ffa94d] transition md:mr-2"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to={"/login"}>
            <button
              className={`hidden md:block px-4 py-1.5 rounded-md transition border ${darkMode
                  ? 'bg-[#a35c27] border-[#c68447] text-[#fff3e0] hover:bg-[#c68447]'
                  : 'bg-orange-500 text-white border-orange-600 hover:bg-orange-600'
                }`}
            >
              Login
            </button>
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="text-[#f5deb3]" />
            ) : (
              <Menu className="text-[#f5deb3]" />
            )}
          </button>
        </div>
      </div>
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
                  `text-base font-medium hover:text-[#ffa94d] ${isActive ? 'text-[#ffa94d]' : ''}`
                }
              >
                {labels[idx]}
              </NavLink>
            );
          })}
          <Link to={"/login"}>
            <button
              className={`w-fit px-4 py-1.5 rounded-md transition border ${darkMode
                  ? 'bg-[#a35c27] border-[#c68447] text-[#fff3e0] hover:bg-[#c68447]'
                  : 'bg-orange-500 text-white border-orange-600 hover:bg-orange-600'
                }`}
            >
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
