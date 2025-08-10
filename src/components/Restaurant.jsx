import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../utils/ThemeContext";

const Restaurant = () => {
  const { darkMode } = useContext(ThemeContext); 

  const dishes = [
    {
      name: "Steak Platter",
      description: "Juicy grilled steak served with seasoned vegetables.",
      image: "steak-platter.jpg",
    },
    {
      name: "Sushi Delight",
      description: "Fresh sushi rolls crafted by our master chefs.",
      image: "sushi-delight.webp",
    },
    {
      name: "Vegan Feast",
      description: "Colorful plant-based meal full of flavor and nutrients.",
      image: "vegan.jpg",
    },
  ];

  return (
    <section className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className={`text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          🍽️ Restaurant & Dining
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
          Explore our gourmet dishes and cozy dining experience.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl px-4 mx-auto">
        {dishes.map((dish, idx) => (
          <div
            key={idx}
            className={`rounded-xl overflow-hidden shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <img src={dish.image} alt={dish.name} className="h-48 w-full object-cover" />
            <div className="p-4 text-left">
              <h3 className={`${darkMode ? "text-white" : "text-gray-900"} text-lg font-semibold`}>
                {dish.name}
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
                {dish.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to={"/Reservation"}>
          <button className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            Reserve a Table
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Restaurant;
