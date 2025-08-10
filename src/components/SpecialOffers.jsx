import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";

const Countdown = ({ deadline, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(deadline) - new Date();
      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        onExpire();
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

const SpecialOffers = () => {
  const { darkMode } = useContext(ThemeContext);

  const [honeymoonExpired, setHoneymoonExpired] = useState(false);
  const [summerDealExpired, setSummerDealExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const allExpired = honeymoonExpired && summerDealExpired;

  // Theme-based classes
  const bgClass = darkMode ? "bg-[var(--primary-50)]" : "bg-[var(--primary-100)]";
  const headingText = darkMode ? "text-gray-100" : "text-gray-900";
  const subText = darkMode ? "text-gray-300" : "text-gray-700";
  const expiredText = darkMode ? "text-gray-400" : "text-gray-600";
  const cardBg = darkMode ? "bg-gray-900" : "bg-white";
  const cardText = darkMode ? "text-white" : "text-gray-900";

  return (
    <section className={`py-20 px-4 transition-colors duration-500 ${bgClass}`}>
      <div className="max-w-7xl px-4 mx-auto text-center mb-10">
        <h2 className={`text-4xl font-bold mb-4 ${headingText}`}>
          🎉 Special Offers
        </h2>
        <p className={`text-sm ${subText}`}>
          Grab these deals before time runs out!
        </p>
      </div>

      {allExpired ? (
        <div className={`text-center text-lg font-medium mt-12 ${expiredText}`}>
          There is no special offer at the moment.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 w-fit mx-auto">
          {!honeymoonExpired && (
            <div
              className={`p-6 rounded-lg shadow-md cursor-pointer flex flex-col text-center transition hover:scale-[1.02] ${cardBg} ${cardText}`}
              onClick={() => setShowModal(true)}
            >
              <img
                src="https://i.ibb.co/twbttqyn/Chat-GPT-Image-Jun-21-2025-12-29-41-AM.png"
                alt="Honeymoon Package"
                className="h-56 rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-3">Honeymoon Package</h3>
              <p className="mb-2">2 nights, romantic dinner, spa for 2</p>
              <Countdown
                deadline="2025-09-01T00:00:00"
                onExpire={() => setHoneymoonExpired(true)}
              />
            </div>
          )}

          {!summerDealExpired && (
            <div
              className={`p-6 rounded-lg shadow-md cursor-pointer flex flex-col text-center transition hover:scale-[1.02] ${cardBg} ${cardText}`}
              onClick={() => setShowModal(true)}
            >
              <img
                src="https://i.ibb.co/twsfwkDC/Chat-GPT-Image-Jun-21-2025-12-32-31-AM.png"
                alt="Summer Group Deal"
                className="h-56 rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-3">Summer Group Deal</h3>
              <p className="mb-2">15% off for 4+ guests, includes breakfast</p>
              <Countdown
                deadline="2025-09-20T00:00:00"
                onExpire={() => setSummerDealExpired(true)}
              />
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
          <div
            className={`rounded-lg p-8 max-w-sm w-full text-center transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-2xl font-bold">Special Offer</h3>
            <p className="mt-3">
              For special offers, please contact us via phone or email:
            </p>
            <p className="mt-1">
              <a
                href="tel:+8801774433063"
                className="text-blue-400 underline hover:text-blue-500"
              >
                +8801774433063
              </a>
            </p>
            <p>
              <a
                href="mailto:asifahmed55445@gmail.com"
                className="text-blue-400 underline hover:text-blue-500"
              >
                asifahmed55445@gmail.com
              </a>
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpecialOffers;
