import React from 'react';

const Footer = () => {
  return (
    <footer
      className="text-white pt-24 pb-12 px-6 bg-cover bg-center"
      style={{
        backgroundImage: "url(https://i.ibb.co/8n5m1fTJ/mountain-house.jpg)",
      }}
    >
      {/* Overlay content */}
      <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-3xl max-w-6xl mx-auto">
        {/* Footer links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8  text-sm">
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
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Safety Tips</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
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
