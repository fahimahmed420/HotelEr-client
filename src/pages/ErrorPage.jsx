import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const [reverse, setReverse] = useState(false);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  const handleCarComplete = () => {
    if (!reverse) {
      setShowText(true);
    } else {
      navigate("/");
    }
  };

  const handleBack = () => {
    setShowText(false);
    setReverse(true);
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-r from-blue-100 via-indigo-200 to-blue-100">
      {/* Car SVG Animation */}
      <motion.img
        src="https://www.svgrepo.com/show/500081/car.svg"
        alt="Car"
        className="absolute bottom-10 -left-40 w-20 sm:w-28"
        animate={{ x: reverse ? "-260px" : "calc(100vw - 300px)" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        onAnimationComplete={handleCarComplete}
      />

      {/* Hotel SVG Icon */}
      <img
        src="https://www.svgrepo.com/show/500047/hotel.svg"
        alt="Hotel"
        className="absolute bottom-14 right-60 hidden w-32 sm:block"
      />

      {/* Text Content */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute left-10 top-1/3 max-w-md text-left sm:left-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h2 className="text-lg font-semibold text-gray-500">Ooops…</h2>
            <h1 className="mt-2 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Sorry, we can’t find
              <br /> that page
            </h1>
            <button
              onClick={handleBack}
              className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              ← Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ErrorPage;