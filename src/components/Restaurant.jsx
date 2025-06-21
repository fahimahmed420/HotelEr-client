import React from 'react';
import { Link } from 'react-router-dom';

const Restaurant = ({ darkMode }) => {
  const dishes = [
    {
      name: 'Steak Platter',
      description: 'Juicy grilled steak served with seasoned vegetables.',
      image: 'steak-platter.jpg',
    },
    {
      name: 'Sushi Delight',
      description: 'Fresh sushi rolls crafted by our master chefs.',
      image: 'sushi-delight.webp',
    },
    {
      name: 'Vegan Feast',
      description: 'Colorful plant-based meal full of flavor and nutrients.',
      image: 'vegan.jpg',
    },
  ];

  return (
    <section className={`py-20 px-4 bg-gray-900`}>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 text-white">🍽️ Restaurant & Dining</h2>
        <p className={`text-gray-500 ${darkMode ? 'text-gray-300' : ''}`}>
          Explore our gourmet dishes and cozy dining experience.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {dishes.map((dish, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden shadow-md bg-white">
            <img
              src={dish.image}
              alt={dish.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-left">
              <h3 className="text-lg font-semibold">{dish.name}</h3>
              <p className="text-sm text-gray-500">{dish.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to={"/Reservation"}>
        <button
          className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Reserve a Table
        </button>
        </Link>
      </div>
    </section>
  );
};

export default Restaurant;
