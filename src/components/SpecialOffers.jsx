import React, { useEffect, useState } from 'react';

const Countdown = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(deadline) - new Date();
      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      setTimeLeft(`${days}d ${hrs}h ${mins}m`);
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return <span className="text-red-600 font-bold">{timeLeft}</span>;
};

const SpecialOffers = ({ darkMode }) => {
  return (
    <section className={`py-20 px-4 ${darkMode ? 'bg-[#211612]' : 'bg-pink-50'}`}>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">🎉 Special Offers</h2>
        <p className="text-sm">Grab these deals before time runs out!</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-md text-left">
          <h3 className="text-lg font-semibold">Honeymoon Package</h3>
          <p>2 nights, romantic dinner, spa for 2</p>
          <Countdown deadline="2025-07-01T00:00:00" />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-left">
          <h3 className="text-lg font-semibold">Summer Group Deal</h3>
          <p>15% off for 4+ guests, includes breakfast</p>
          <Countdown deadline="2025-07-15T00:00:00" />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
