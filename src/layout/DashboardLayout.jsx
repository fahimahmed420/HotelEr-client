import React, { useContext, useState } from "react";
import { ThemeContext } from "../utils/ThemeContext";
import emailjs from "emailjs-com";

const Contact = () => {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .send(
        "service_cfxxeo4",        // your service ID
        "template_nzu7iwd",  // your template ID
        formData,
        "OPWTCVfkvwsNbUOcK"      // your public key
      )
      .then(result => {
        console.log(result);
        setFormData({ user_name: "", user_email: "", message: "" });
        setSending(false);
      })
      .catch(error => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message, please try again.");
        setSending(false);
      }
      );
  };

  return (
    <div
      className={`min-h-screen px-6 py-12 flex items-center justify-center ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
        }`}
    >
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 sm:p-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-6 text-sm sm:text-base">
              We'd love to hear from you! Reach out with any questions,
              comments, or booking inquiries.
            </p>

            <ul className="space-y-4 text-sm sm:text-base">
              <li>
                <strong>Phone: </strong>
                <a
                  href="tel:+8801774433063"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  +8801774433063
                </a>
              </li>
              <li>
                <strong>Email: </strong>
                <a
                  href="mailto:asifahmed55445@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  asifahmed55445@gmail.com
                </a>
              </li>
              <li>
                <strong>Address: </strong>Savar, Dhaka, Bangladesh
              </li>
              <li>
                <strong>Office Hours: </strong>Mon - Fri: 9:00 AM - 6:00 PM
              </li>
              <li>
                <strong>Fax: </strong>+8801774433000
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="user_name" className="block mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  required
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="user_email" className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  required
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
