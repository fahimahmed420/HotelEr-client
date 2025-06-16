import React from 'react';
import { FiWifi, FiBox, FiSun, FiHome } from 'react-icons/fi'; // wifi, gym, spa (sun), pool (home)
import { MdAirportShuttle, MdSecurity } from 'react-icons/md';

const Amenities = ({ darkMode }) => {
  const items = [
    { icon: FiWifi, label: 'Free Wi-Fi' },
    { icon: FiBox, label: 'Gym' }, // no direct gym icon, using box as generic placeholder
    { icon: FiSun, label: 'Spa' },
    { icon: FiHome, label: 'Pool' },
    { icon: MdAirportShuttle, label: 'Airport Shuttle' },
    { icon: MdSecurity, label: '24/7 Security' },
  ];

  return (
    <section className={`py-20 px-4 ${darkMode ? 'bg-[#1c1814]' : 'bg-amber-50'}`}>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">🧖 Amenities & Services</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon size={32} className="text-orange-500" />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
