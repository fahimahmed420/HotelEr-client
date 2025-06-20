import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const UserReviews = ({ darkMode = false, reviews = [] }) => {
  // Color styles based on dark mode
  const bg = darkMode ? 'bg-[#0e0e0e]' : 'bg-orange-50';
  const text = darkMode ? 'text-blue-200' : 'text-black';
  const cardBg = darkMode ? 'bg-[#1c1c1c]' : 'bg-white';
  const subText = darkMode ? 'text-blue-300' : 'text-gray-500';

  // Get most recent 3 reviews sorted by timestamp
  const top3Reviews = [...reviews]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 3);

  return (
    <section className={`py-20 px-4 ${bg} ${text}`}>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">💬 What Our Guests Say</h2>
        <p className={`text-sm ${subText}`}>Real reviews from real guests</p>
      </div>

      {top3Reviews.length === 0 ? (
        <p className={`text-center ${subText}`}>No reviews yet. Be the first to review this hotel!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {top3Reviews.map((review, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeInUp}
              className={`rounded-xl p-6 shadow-md transition transform hover:scale-105 duration-300 ${cardBg}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar || 'https://via.placeholder.com/150'}
                  alt={review.username || 'Anonymous'}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold">{review.username || 'Anonymous'}</h4>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: review.rating || 0 }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <p className={`${subText} text-sm`}>{review.comment || 'No comment provided.'}</p>
              {review.timestamp && (
                <p className={`text-xs mt-2 ${subText}`}>{new Date(review.timestamp).toLocaleString()}</p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserReviews;
