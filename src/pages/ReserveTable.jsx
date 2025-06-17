import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReserveTable = ({ darkMode }) => {
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [reservationDate, setReservationDate] = useState(new Date());
    const [guests, setGuests] = useState(2);
    const [timeSlot, setTimeSlot] = useState('');
    const [showModal, setShowModal] = useState(false);

    const dishes = [
        {
            name: 'Steak Platter',
            image: 'steak-platter.jpg',
            pricing: {
                Lunch: 25,
                Evening: 30,
                Dinner: 35,
            },
        },
        {
            name: 'Sushi Delight',
            image: 'sushi-delight.webp',
            pricing: {
                Lunch: 20,
                Evening: 28,
                Dinner: 32,
            },
        },
        {
            name: 'Vegan Feast',
            image: 'vegan.jpg',
            pricing: {
                Lunch: 18,
                Evening: 22,
                Dinner: 26,
            },
        },
    ];

    const timeSlots = [
        { label: 'Lunch', range: '12 PM – 2 PM' },
        { label: 'Evening', range: '5 PM – 7 PM' },
        { label: 'Dinner', range: '8 PM – 10 PM' },
    ];

    const toggleDish = (dishName) => {
        setSelectedDishes((prev) =>
            prev.includes(dishName)
                ? prev.filter((name) => name !== dishName)
                : [...prev, dishName]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDishes.length === 0 || !timeSlot) {
            alert('Please select at least one dish and a time slot.');
            return;
        }
        setShowModal(true);
    };

    const getTotalPrice = () => {
        return selectedDishes.reduce((total, name) => {
            const dish = dishes.find((d) => d.name === name);
            return total + dish.pricing[timeSlot] * guests;
        }, 0);
    };

    const confirmReservation = () => {
        alert(
            `Reservation Confirmed!\n\nDishes: ${selectedDishes.join(
                ', '
            )}\nDate: ${reservationDate.toDateString()}\nTime Slot: ${timeSlot}\nGuests: ${guests}\nTotal Price: $${getTotalPrice()}`
        );
        setShowModal(false);
        setSelectedDishes([]);
        setTimeSlot('');
        setGuests(2);
        setReservationDate(new Date());
    };

    return (
        <section
            className={`min-h-screen py-20 px-4 transition-colors duration-500 ${darkMode ? 'bg-[#1e1b18]' : 'bg-orange-50'
                }`}
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10">🍽️ Reserve a Table</h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8 bg-white dark:bg-[#2f241e] p-8 rounded-xl shadow-xl"
                >
                    {/* Dish Selection */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Choose Your Dishes</h3>
                        <div className="grid sm:grid-cols-3 gap-6">
                            {dishes.map((dish, idx) => (
                                <label
                                    key={idx}
                                    className={`cursor-pointer border rounded-xl overflow-hidden transition duration-300 ${selectedDishes.includes(dish.name)
                                            ? 'border-orange-600 ring-2 ring-orange-400'
                                            : 'border-gray-300'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        name="dish"
                                        value={dish.name}
                                        className="hidden"
                                        checked={selectedDishes.includes(dish.name)}
                                        onChange={() => toggleDish(dish.name)}
                                    />
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="h-40 w-full object-cover"
                                    />
                                    <div className="p-3 text-center font-medium">{dish.name}</div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                        <label className="block font-medium mb-2">Reservation Date</label>
                        <DatePicker
                            selected={reservationDate}
                            onChange={(date) => setReservationDate(date)}
                            minDate={new Date()}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-[#3a2f28]"
                        />
                    </div>

                    {/* Time Slot */}
                    <div>
                        <label className="block font-medium mb-2">Time Slot</label>
                        <select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-[#3a2f28]"
                        >
                            <option value="" disabled>
                                Select Time Slot
                            </option>
                            {timeSlots.map(({ label, range }) => (
                                <option key={label} value={label}>
                                    {label} ({range})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Guests */}
                    <div>
                        <label className="block font-medium mb-2">Number of Guests</label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-[#3a2f28]"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                    >
                        Review Reservation
                    </button>
                </form>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-[#2f241e] p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                        <h3 className="text-2xl font-bold mb-4">Reservation Summary</h3>
                        <p className="mb-2">
                            <strong>Dishes:</strong> {selectedDishes.join(', ')}
                        </p>
                        <p className="mb-2">
                            <strong>Date:</strong> {reservationDate.toDateString()}
                        </p>
                        <p className="mb-2">
                            <strong>Time Slot:</strong> {timeSlot} (
                            {timeSlots.find((slot) => slot.label === timeSlot)?.range})
                        </p>
                        <p className="mb-2">
                            <strong>Guests:</strong> {guests}
                        </p>

                        <div className="text-left mt-4 mb-4">
                            <p className="font-semibold underline mb-2">Pricing Breakdown:</p>
                            {selectedDishes.map((dishName) => {
                                const dish = dishes.find((d) => d.name === dishName);
                                const price = dish.pricing[timeSlot];
                                return (
                                    <p key={dishName}>
                                        {dishName}: ${price} × {guests} guests = ${price * guests}
                                    </p>
                                );
                            })}
                            <hr className="my-2" />
                            <p className="font-bold">
                                Total: ${getTotalPrice()}
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={confirmReservation}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default ReserveTable;
