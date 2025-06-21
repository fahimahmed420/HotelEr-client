// components/OfferPopup.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OfferPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-2 text-center">🎉 Special Offer!</h2>
                <p className="mb-4 text-center text-gray-600">
                    Get <span className="font-semibold text-red-500">20% off</span> on your first booking. Limited time only!
                </p>
                <div className="text-center">
                    <Link to={"/rooms"}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Book Now
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OfferPopup;
