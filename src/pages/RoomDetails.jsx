import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import Rating from "react-rating-stars-component";
import { AuthContext } from "../context/AuthContext";
import '@fortawesome/fontawesome-free/css/all.min.css';



Modal.setAppElement("#root");

function RoomDetails() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(() => {
    const next = new Date();
    next.setDate(next.getDate() + 1);
    return next;
  });
  const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);
  const [guests, setGuests] = useState(2);
  const [checkInTime, setCheckInTime] = useState("After 2 PM");
  const [error, setError] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingSummaryIsOpen, setBookingSummaryIsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");


  const [hasReviewed, setHasReviewed] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/bookings/check?roomId=${id}&email=${user.email}`)
        .then(res => res.json())
        .then(data => setHasBooked(data.hasBooked))
        .catch(console.error);
    }
  }, [id, user]);


  useEffect(() => {
    fetch(`http://localhost:5000/api/rooms/${id}`)
      .then(res => res.json())
      .then(setRoom)
      .catch(err => console.error("Failed to fetch room:", err));
  }, [id]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/reviews/check?roomId=${id}&email=${user.email}`)
        .then(res => res.json())
        .then(data => setHasReviewed(data.hasReviewed))
        .catch(console.error);
    }
  }, [id, user]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/reviews?roomId=${id}`)
      .then(res => res.json())
      .then(setReviews)
      .catch(console.error);
  }, [id]);



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

  const confirmBooking = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!user?.email) {
      toast.error("You must be logged in to book a room.");
      setIsSubmitting(false);
      return;
    }

    const booking = {
      roomId: id,
      email: user?.email,
      roomName: room.hotelName,
      checkIn,
      checkOut,
      guests,
      checkInTime,
      total: grandTotal.toFixed(2),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        toast.success("Booking confirmed!");
      } else {
        toast.error("Failed to book room.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Something went wrong.");
    }

    setBookingSummaryIsOpen(false);
    setIsSubmitting(false);
  };


  const getNightsCount = () => {
    const diff = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    return Math.max(diff, 1);
  };

  const pricePerNight = room?.pricePerNight || 100;
  const cleaningFee = 40;
  const taxRate = 0.1;
  const baseTotal = pricePerNight * getNightsCount() * guests;
  const taxAmount = baseTotal * taxRate;
  const grandTotal = baseTotal + cleaningFee + taxAmount;

  if (!room) {
    return <div className="text-center text-white py-20">Loading room details...</div>;
  }

  return (
    <div className="min-h-screen bg-cover bg-center text-white " style={{ backgroundImage: `url('${room.gallery?.[0]}')` }}>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-black/60 py-20">
        {/* Room Info */}
        <div className="md:col-span-2 grid md:grid-cols-2 gap-4 rounded-2xl p-4 bg-white/10 backdrop-blur text-white">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold mb-2">{room.hotelName}</h2>
            <p>{room.details}</p>
            <ul className="space-y-1 text-sm pt-2">
              {room.facilities?.map((f, i) => <li key={i}>• {f}</li>)}
            </ul>
            <div className="grid grid-cols-2 gap-2 pt-4 text-sm">
              <div><div className="text-gray-300">Altitude</div><div className="font-bold">{room.altitude}</div></div>
              <div><div className="text-gray-300">Temperature</div><div className="font-bold">{room.temperature}</div></div>
              <div><div className="text-gray-300">To City</div><div className="font-bold">{room.toNearestCityKm} km</div></div>
              <div><div className="text-gray-300">Price/night</div><div className="font-bold">${pricePerNight}</div></div>
            </div>
          </div>
        </div>

        {/* Booking Panel */}
        <div className="rounded-2xl p-4 bg-white/10 backdrop-blur space-y-4">
          <h2 className="text-lg font-semibold">Plan Your Stay</h2>
          <DatePicker
            selectsRange
            startDate={selectedRange[0]}
            endDate={selectedRange[1]}
            onChange={handleDateChange}
            inline
            minDate={new Date()}
          />
          {error && <p className="text-red-400">{error}</p>}
          <div className="flex justify-between items-center text-sm">
            <span>Guests</span>
            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value || 1)))}
              className="w-12 text-black rounded text-center"
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Check-in Time</span>
            <select
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className="text-black px-2 py-1 rounded"
            >
              {["After 9 AM", "After 12 PM", "After 2 PM", "After 4 PM", "After 6 PM"].map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <button
            className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-500"
            onClick={handleReserve}
            disabled={!!error}
          >
            Reserve
          </button>
        </div>

        {/* Gallery */}
        <div className="md:col-span-3 bg-white/10 p-4 rounded-2xl mt-4">
          <h2 className="text-xl font-bold mb-3">Gallery</h2>
          <div className="flex gap-3 overflow-x-auto">
            {room.gallery?.map((url, i) => (
              <img
                key={i}
                src={url}
                onClick={() => { setModalImage(url); setModalIsOpen(true); }}
                alt={`Gallery ${i}`}
                className="w-48 h-36 object-cover rounded-lg hover:scale-105 transition cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-3 bg-white/10 p-4 rounded-2xl mt-4">
          <h2 className="text-xl font-bold mb-3">User Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-300">No reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r, idx) => (
                <div key={idx} className="bg-white/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={r.avatar || `https://i.pravatar.cc/150?u=${r.email}`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="font-semibold">{r.username}</p>
                  </div>

                  <p className="text-yellow-400">Rating: {r.rating} / 5</p>
                  <p>{r.comment}</p>
                  <p className="text-xs text-gray-400">{new Date(r.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              disabled={isSubmitting || hasReviewed}
              onClick={() => {
                if (!hasBooked) {
                  toast.info("You must book before reviewing.");
                  return;
                }
                if (hasReviewed) {
                  toast.info("You've already reviewed this room.");
                  return;
                }
                setReviewModalOpen(true);
              }}
              className={`px-4 py-2 rounded text-white ${hasReviewed ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"}`}
            >
              {hasReviewed ? "Reviewed" : "Review / Give Review"}
            </button>


          </div>

        </div>

      </div>

      {/* Enlarged Image Modal */}
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          >
            <div className="relative">
              <button
                onClick={() => setModalIsOpen(false)}
                className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded"
              >
                Close
              </button>
              <img src={modalImage} alt="Enlarged" className="max-w-full max-h-[90vh] rounded" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Summary Modal */}
      <AnimatePresence>
        {bookingSummaryIsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <div className="bg-white rounded-xl p-6 w-96 text-black relative">
              <h2 className="text-xl font-bold mb-3">Booking Summary</h2>
              <p><strong>Check-in:</strong> {checkIn.toLocaleDateString()} at {checkInTime}</p>
              <p><strong>Check-out:</strong> {checkOut.toLocaleDateString()}</p>
              <p><strong>Guests:</strong> {guests}</p>
              <p><strong>Price/night:</strong> ${pricePerNight}</p>
              <hr className="my-2" />
              <p>Subtotal: ${baseTotal.toFixed(2)}</p>
              <p>Cleaning Fee: ${cleaningFee}</p>
              <p>Tax (10%): ${taxAmount.toFixed(2)}</p>
              <p className="font-bold text-lg">Total: ${grandTotal.toFixed(2)}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setBookingSummaryIsOpen(false)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                <button
                  onClick={confirmBooking}
                  disabled={isSubmitting}
                  className={`bg-green-600 text-white px-3 py-1 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Processing..." : "Confirm"}
                </button>

              </div>
            </div>
          </motion.div>
        )}
        {reviewModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <div className="bg-white text-black rounded-xl p-6 w-96 relative">

              <p><strong>User:</strong> {user?.displayName || user?.email}</p>
              <div className="my-2">
                <label>Rating:</label>
                <Rating
                  count={5}
                  edit={true}
                  value={rating}
                  onChange={setRating}
                  size={24}
                  emptyIcon={<i className="far fa-star text-gray-400"></i>}
                  filledIcon={<i className="fa fa-star text-yellow-400"></i>}
                />
              </div>
              <div className="my-2">
                <label>Comment:</label>
                <textarea
                  rows="3"
                  className="w-full border p-2 rounded"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                {!comment.trim() && <p className="text-sm text-red-500">Comment cannot be empty.</p>}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setReviewModalOpen(false)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                <button
                  disabled={!comment.trim() || isSubmitting}
                  onClick={async () => {
                    const review = {
                      roomId: id,
                      username: user?.displayName || user?.email,
                      email: user?.email,
                      rating,
                      comment,
                      timestamp: new Date(),
                      avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`
                    };

                    const res = await fetch("http://localhost:5000/api/reviews", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        roomId: id,
                        username: user?.displayName || user?.email,
                        email: user?.email,
                        rating,
                        comment,
                        timestamp: new Date(),
                        avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`,
                      }),
                    });

                    if (res.ok) {
                      toast.success("Review submitted!");
                      setReviews((prev) => [...prev, review]);
                      setHasReviewed(true);
                    } else {
                      toast.error("Failed to submit review.");
                    }
                    setReviewModalOpen(false);
                    setRating(0);
                    setComment("");
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}

export default RoomDetails;
