// Imports same as before
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

function RoomDetails() {
  const defaultStart = new Date();
  const defaultEnd = new Date();
  defaultEnd.setDate(defaultStart.getDate() + 1);

  const savedRange = JSON.parse(localStorage.getItem("bookingDates"));

  const [checkIn, setCheckIn] = useState(savedRange ? new Date(savedRange[0]) : defaultStart);
  const [checkOut, setCheckOut] = useState(savedRange ? new Date(savedRange[1]) : defaultEnd);
  const [selectedRange, setSelectedRange] = useState(savedRange ? [new Date(savedRange[0]), new Date(savedRange[1])] : [defaultStart, defaultEnd]);
  const [guests, setGuests] = useState(4);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(!!savedRange);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingSummaryIsOpen, setBookingSummaryIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const pricePerNight = 120;

  const getNightsCount = () => {
    const diff = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    return Math.max(diff, 1);
  };

  const handleGuestsChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!val || val < 1) {
      setGuests(1);
    } else if (val > 10) {
      setGuests(10);
    } else {
      setGuests(val);
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setSelectedRange(dates);
    if (start) setCheckIn(start);
    if (end) {
      if (end <= start) {
        setError("Check-out date must be after check-in date.");
      } else {
        setCheckOut(end);
        setError("");
      }
    }
  };

  const handleReserve = () => {
    if (!error && selectedRange[0] && selectedRange[1]) {
      setBookingSummaryIsOpen(true);
    }
  };

  const confirmBooking = () => {
    setSubmitted(true);
    localStorage.setItem("bookingDates", JSON.stringify([selectedRange[0], selectedRange[1]]));
    toast.success("Room booked!", {
      position: "top-center",
      autoClose: 3000,
    });
    setBookingSummaryIsOpen(false);
  };

  const openModal = (imgUrl) => {
    setModalImage(imgUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);
  const closeBookingModal = () => setBookingSummaryIsOpen(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white py-20"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?cabin,nature')" }}
    >
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {/* First Grid: Facilities and Hero Text */}
        <div className="md:col-span-2 grid md:grid-cols-2 gap-4 rounded-2xl p-4 bg-white/10 backdrop-blur text-white">
          {/* Facilities */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg mb-2 text-white">Room Facilities</h2>
            <ul className="space-y-2 text-sm text-white/90">
              <li>🛏️ 2 Queen Beds</li>
              <li>🔥 Indoor Fireplace</li>
              <li>🛁 Private Hot Tub</li>
              <li>📡 High-speed Wi-Fi</li>
              <li>📺 Smart TV with Netflix</li>
              <li>🍳 Fully-equipped Kitchen</li>
              <li>🚿 Walk-in Shower</li>
              <li>🧺 Washer & Dryer</li>
              <li>🚘 Free Parking</li>
              <li>🌲 Forest Views</li>
            </ul>
          </div>

          {/* Hero Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Relax in the Pine Log Cabin</h1>
            <p>Rustic charm meets modern comfort in a tranquil mountain setting.</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-white/20 px-2 py-1 rounded-full">⭐ 4.9 (2,400+ reviews)</span>
              <span className="bg-white/20 px-2 py-1 rounded-full">📍 15 Min to Town</span>
              <span className="bg-white/20 px-2 py-1 rounded-full">🐾 Pet Friendly</span>
              <span className="bg-white/20 px-2 py-1 rounded-full">🔑 Self Check-in</span>
              <span className="bg-white/20 px-2 py-1 rounded-full">💻 Wi-Fi 100 Mbps</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-4 text-sm">
              <div>
                <div className="text-gray-300">Altitude</div>
                <div className="text-xl font-bold">1,620 m</div>
              </div>
              <div>
                <div className="text-gray-300">Temperature</div>
                <div className="text-xl font-bold">18°C</div>
              </div>
              <div>
                <div className="text-gray-300">To Nearest City</div>
                <div className="text-xl font-bold">27.4 km</div>
              </div>
              <div>
                <div className="text-gray-300">Price per Night</div>
                <div className="text-xl font-bold">${pricePerNight}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="md:col-span-1 rounded-2xl p-4 bg-white/10 backdrop-blur">
          <h2 className="font-semibold text-lg mb-3 text-white">Choose a Date</h2>
          <div className="text-sm mb-2 text-gray-300">
            {selectedRange[0].toLocaleDateString()} – {selectedRange[1]?.toLocaleDateString() || "..."}
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <DatePicker
              selectsRange
              startDate={selectedRange[0]}
              endDate={selectedRange[1]}
              onChange={handleDateChange}
              inline
              minDate={new Date()}
            />
          </div>
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
          <button
            className={`mt-4 w-full py-2 rounded-xl text-white ${
              error ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-400"
            }`}
            disabled={!!error}
            onClick={handleReserve}
          >
            Reserve
          </button>
        </div>

        {/* Booking Info */}
        <div className="md:col-span-1 rounded-2xl p-4 bg-white/10 backdrop-blur space-y-3">
          <h2 className="font-semibold text-lg mb-2 text-white">Plan Your Stay</h2>
          <div className="bg-white/20 p-3 rounded-lg flex justify-between">
            <span>Room</span>
            <span className="font-medium">Pine Log</span>
          </div>
          <div className="bg-white/20 p-3 rounded-lg flex justify-between">
            <span>Check-in</span>
            <span className="font-medium">{checkIn.toLocaleDateString()}</span>
          </div>
          <div className="bg-white/20 p-3 rounded-lg flex justify-between">
            <span>Check-out</span>
            <span className="font-medium">{checkOut.toLocaleDateString()}</span>
          </div>
          <div className="bg-white/20 p-3 rounded-lg flex justify-between items-center">
            <span>Guests</span>
            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={handleGuestsChange}
              className="bg-white/30 w-12 text-center rounded text-black"
            />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="md:col-span-2 rounded-2xl p-4 bg-white/10 backdrop-blur">
          <h2 className="font-semibold text-lg mb-4 text-white">Gallery</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {[1, 2, 3, 4, 5].map((num) => {
              const url = `https://source.unsplash.com/400x300/?cabin,interior&sig=${num}`;
              return (
                <img
                  key={num}
                  src={url}
                  onClick={() => openModal(url)}
                  alt={`Gallery ${num}`}
                  className="rounded-xl w-64 h-44 object-cover flex-shrink-0 cursor-pointer hover:scale-105 transition"
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black/80"
      >
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded"
          >
            Close
          </button>
          <img src={modalImage} alt="Enlarged view" className="max-w-full max-h-[90vh] rounded" />
        </div>
      </Modal>

      {/* Booking Summary Modal */}
      <Modal
        isOpen={bookingSummaryIsOpen}
        onRequestClose={closeBookingModal}
        className="fixed inset-0 flex items-center justify-center bg-black/80 text-black"
      >
        <div className="bg-white rounded-xl p-6 w-96 space-y-4 relative">
          <h2 className="text-2xl font-bold text-center">Booking Summary</h2>
          <p>
            Nights: <strong>{getNightsCount()}</strong>
          </p>
          <p>
            Guests: <strong>{guests}</strong>
          </p>
          <p>
            Price per night: <strong>${pricePerNight}</strong>
          </p>
          <p>
            Total:{" "}
            <strong>
              ${pricePerNight} × {getNightsCount()} nights × {guests} guests = $
              {pricePerNight * getNightsCount() * guests}
            </strong>
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={closeBookingModal} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button onClick={confirmBooking} className="px-4 py-2 bg-green-500 text-white rounded">
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast */}
      <ToastContainer />
    </div>
  );
}

export default RoomDetails;
