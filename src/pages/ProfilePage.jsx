import React, { useContext, useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../utils/ThemeContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const auth = getAuth();

  // All your state declarations here:
  const [showAvatarActions, setShowAvatarActions] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [avatar, setAvatar] = useState(user?.photoURL || "https://i.pravatar.cc/100");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [taxId, setTaxId] = useState("");
  const [company, setCompany] = useState("");
  const [bio, setBio] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [firstName, lastName] = user?.displayName?.split(" ") || ["", ""];

  useEffect(() => {
    // Fetch user profile data like before (your existing useEffect)
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://hotel-booking-server-side-ruddy.vercel.app/api/users/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const data = await res.json();
        if (data) {
          setPhoneNumber(data.phoneNumber || "");
          setLocation(data.location || "");
          setPostalCode(data.postalCode || "");
          setTaxId(data.taxId || "");
          setCompany(data.company || "");
          setBio(data.bio || "");
          if (data.photoURL) setAvatar(data.photoURL);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setError("Failed to fetch profile.");
      }
    };

    if (user?.email) fetchProfile();
  }, [user?.email]);

  // Save handlers (handleSaveProfile, handleSaveAvatar) as you already have them
  const handleSaveProfile = async () => {
    const updatedUser = {
      photoURL: avatar,
      phoneNumber,
      location,
      postalCode,
      taxId,
      company,
      bio,
      firstName,
      lastName,
      email: user.email,
    };

    try {
      const res = await fetch(
        `https://hotel-booking-server-side-ruddy.vercel.app/api/users/${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      const data = await res.json();
      if (data.success) {
        setIsEditable(false);
        setMessage("Profile updated successfully!");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while saving profile.");
    }
  };

  const handleSaveAvatar = async () => {
    if (!newAvatar) return;
    try {
      await updateProfile(auth.currentUser, {
        photoURL: newAvatar,
      });

      setAvatar(newAvatar);
      setNewAvatar(null);
      setShowAvatarActions(false);

      // Also update backend similarly (same as your original code)
      const updatedUser = {
        photoURL: newAvatar,
        phoneNumber,
        location,
        postalCode,
        taxId,
        company,
        bio,
        firstName,
        lastName,
        email: user.email,
      };

      const res = await fetch(
        `https://hotel-booking-server-side-ruddy.vercel.app/api/users/${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMessage("Avatar updated successfully!");
      } else {
        setError("Failed to update avatar.");
      }
    } catch (err) {
      console.error("Error updating avatar", err);
      setError("Failed to update avatar.");
    }
  };

 return (
  <div
    className={`relative rounded-2xl shadow-xl p-8 mx-auto min-h-full transition backdrop-blur-lg`}
  >
    <button
      onClick={() => setIsEditable(!isEditable)}
      className="absolute top-4 right-4 px-4 py-1.5 text-base rounded-full font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition cursor-pointer"
    >
      {isEditable ? "Cancel Edit" : "Edit"}
    </button>

    <div className="flex items-center space-x-4 mb-8 relative">
      <div
        className="relative cursor-pointer group"
        onClick={() => setShowAvatarActions(!showAvatarActions)}
      >
        <div className="relative w-20 h-20 rounded-full shadow-md ring-2 ring-blue-400 animate-pulse overflow-hidden">
          <img
            src={newAvatar || avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {showAvatarActions && (
        <div className="space-y-2 flex flex-col">
          <input
            type="text"
            placeholder="Enter image URL"
            className={`w-full px-4 py-3 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white text-lg"
                : "bg-gray-200 border-gray-300 text-gray-900 text-lg"
            }`}
            value={newAvatar || ""}
            onChange={(e) => setNewAvatar(e.target.value)}
          />
          <button
            className={`px-6 py-3 border rounded hover:bg-gray-100 transition ${
              darkMode ? "border-gray-600" : "border-gray-300"
            } text-lg`}
            onClick={handleSaveAvatar}
          >
            Save Avatar
          </button>
        </div>
      )}
    </div>

    <form className="grid grid-cols-2 gap-6 text-lg"> {/* increased gap & text-lg */}
      <div>
        <label className="block font-semibold mb-1">First Name</label>
        <input
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
          placeholder="First Name"
          defaultValue={firstName}
          disabled={!isEditable}
          onChange={() => {}}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Last Name</label>
        <input
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
          placeholder="Last Name"
          defaultValue={lastName}
          disabled={!isEditable}
          onChange={() => {}}
        />
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <label className="block font-semibold mb-1">Email Address</label>
          {user?.emailVerified && (
            <div className="relative group">
              <FaCheckCircle className="text-green-500 w-5 h-5" />
              <span className="absolute bottom-full mb-1 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                Email Verified
              </span>
            </div>
          )}
        </div>
        <input
          className={`w-full p-3 rounded mt-1 shadow-inner cursor-not-allowed ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
          } text-lg`}
          defaultValue={user?.email || ""}
          disabled
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Phone</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={!isEditable}
          placeholder="Phone"
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">City/State</label>
        <input
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
          placeholder="City/State"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={!isEditable}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Country</label>
        <select
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
          disabled={!isEditable}
        >
          <option>{user?.country || "BD"}</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-1">Postal Code</label>
        <input
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          disabled={!isEditable}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Tax ID</label>
        <input
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
          placeholder="Tax ID"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
          disabled={!isEditable}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Company Name</label>
        <input
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={!isEditable}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Language</label>
        <select
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
          disabled={!isEditable}
        >
          <option>{user?.language || "English"}</option>
        </select>
      </div>
      <div className="col-span-2">
        <label className="block font-semibold mb-1">Bio</label>
        <textarea
          rows="4"
          className={`w-full p-3 rounded mt-1 shadow-inner ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          } text-lg`}
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={!isEditable}
        />
      </div>
    </form>

    {isEditable && (
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-100 transition text-lg"
          onClick={() => setIsEditable(false)}
        >
          Cancel
        </button>
        <button
          onClick={handleSaveProfile}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-lg"
        >
          Save
        </button>
      </div>
    )}
  </div>
);
};

export default ProfilePage;
