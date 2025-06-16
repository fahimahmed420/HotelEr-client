import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: 'Alicia G.',
    text: 'Absolutely loved my stay! The rooms were spotless and the staff was incredibly friendly.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Mark D.',
    text: 'Great amenities and central location. Will definitely come back next summer!',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    name: 'Nina S.',
    text: 'The food was top-notch and the spa experience was unforgettable!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const UserReviews = ({ darkMode }) => {
  const bg = darkMode ? 'bg-[#0e0e0e]' : 'bg-orange-50';
  const text = darkMode ? 'text-blue-200' : 'text-black';
  const cardBg = darkMode ? 'bg-[#1c1c1c]' : 'bg-white';
  const subText = darkMode ? 'text-blue-300' : 'text-gray-500';

  return (
    <section className={`py-20 px-4 ${bg} ${text}`}>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">💬 What Our Guests Say</h2>
        <p className={`text-sm ${subText}`}>Real reviews from real guests</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
            className={`rounded-xl p-6 shadow-md transition transform hover:scale-105 duration-300 ${cardBg}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="font-semibold">{review.name}</h4>
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className={`${subText} text-sm`}>{review.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UserReviews;
