import React from 'react';

const Footer = () => {
  return (
    <footer
      className="text-white pt-24 pb-12 px-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('/footer.png')",
      }}
    >
      {/* Overlay content */}
      <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-3xl max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-[2.75rem] sm:text-6xl font-bold leading-tight mb-6">
          Breathe In Nature
        </h2>
        <p className="text-lg text-gray-200 max-w-xl mb-10">
          Join the Selva Insider Club — Be the first to uncover new trails and secret spots.
        </p>

        {/* Email input + button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg">
          <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-full">
            <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path d="M22 4L12 13 2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="email"
              placeholder="E-mail address"
              className="bg-transparent text-white placeholder-gray-300 w-full focus:outline-none"
            />
          </div>
          <button className="bg-lime-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-lime-300 transition">
            Subscribe
          </button>
        </div>

        {/* Footer links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 text-sm">
          <div>
            <h4 className="text-lime-400 font-semibold mb-3">Explore</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">My Adventures</a></li>
              <li><a href="#" className="hover:underline">Cancellation policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lime-400 font-semibold mb-3">Learn</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">How it Works</a></li>
              <li><a href="#" className="hover:underline">Safety Tips</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lime-400 font-semibold mb-3">Community</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Testimonials</a></li>
              <li><a href="#" className="hover:underline">Partner Stories</a></li>
              <li><a href="#" className="hover:underline">Events & Meetups</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lime-400 font-semibold mb-3">Support</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
