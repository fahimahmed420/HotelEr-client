import React, { useState } from "react";
import { Link } from "react-router-dom";

const infoContent = {
  "cancellation-policy": {
    title: "Cancellation Policy",
    content:
      "Our cancellation policy allows you to cancel your booking up to 24 hours before arrival with a full refund. After that, cancellation fees may apply.",
  },
  "safety-tips": {
    title: "Safety Tips",
    content:
      "Always double-check your booking details, arrive on time, and follow local guidelines to ensure a safe stay.",
  },
  faq: {
    title: "Frequently Asked Questions",
    content: (
      <>
        <h4 className="font-semibold mb-2">1. How do I make a booking?</h4>
        <p className="mb-4">
          You can book a room by navigating to the Rooms page, selecting your desired room, and completing the reservation form.
        </p>

        <h4 className="font-semibold mb-2">2. What payment methods do you accept?</h4>
        <p className="mb-4">
          We accept all major credit cards, debit cards, and PayPal payments.
        </p>

        <h4 className="font-semibold mb-2">3. Can I modify my reservation?</h4>
        <p className="mb-4">
          Yes, you can modify your booking up to 24 hours before your scheduled arrival by contacting our support team.
        </p>

        <h4 className="font-semibold mb-2">4. What is your refund policy?</h4>
        <p className="mb-4">
          Refunds are available for cancellations made at least 24 hours prior to check-in. Late cancellations may not be refunded.
        </p>

        <h4 className="font-semibold mb-2">5. Is parking available at the property?</h4>
        <p>
          Yes, we offer complimentary parking for all guests during their stay.
        </p>
      </>
    ),
  },
  "privacy-policy": {
    title: "Privacy Policy",
    content:
      "We respect your privacy. Your data is securely stored and never shared without consent.",
  },
  "terms-of-service": {
    title: "Terms of Service",
    content:
      "By using our service, you agree to our terms which cover booking rules, user responsibilities, and liability disclaimers.",
  },
};

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", content: "" });

  const openModal = (key) => {
    setModalInfo(infoContent[key]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // White text buttons that look like links
  const modalButtonClass =
    "hover:underline cursor-pointer bg-transparent border-none p-0 text-white";

  return (
    <>
      <footer
        className="text-white pt-24 pb-12 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://i.ibb.co/8n5m1fTJ/mountain-house.jpg)",
        }}
      >
        {/* Overlay content */}
        <div className="mx-auto max-w-7xl px-4">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl ">
            {/* Footer links */}
            <div className="flex justify-between text-sm">
              <div>
                <h4 className="text-lime-400 font-semibold mb-3">Explore</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => openModal("cancellation-policy")}
                      className={modalButtonClass}
                    >
                      Cancellation policy
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lime-400 font-semibold mb-3">Learn</h4>
                <ul className="space-y-1">
                  <li>
                    <Link to={"/aboutus"} className="hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => openModal("safety-tips")}
                      className={modalButtonClass}
                    >
                      Safety Tips
                    </button>
                  </li>
                  <li>
                    <button onClick={() => openModal("faq")} className={modalButtonClass}>
                      FAQ
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lime-400 font-semibold mb-3">Support</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="/contact" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => openModal("privacy-policy")}
                      className={modalButtonClass}
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openModal("terms-of-service")}
                      className={modalButtonClass}
                    >
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {modalInfo.title}
            </h3>
            <div className="mb-6 text-gray-700 dark:text-gray-300">
              {modalInfo.content}
            </div>
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            <button
              onClick={closeModal}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
