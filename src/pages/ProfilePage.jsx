import React, { useContext, useEffect, useState } from "react";
import {
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { FaCheckCircle, FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const auth = getAuth();
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
  const [activeSection, setActiveSection] = useState("profile");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [firstName, lastName] = user?.displayName?.split(" ") || ["", ""];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${user.email}`);
        const data = await res.json();

        if (data) {
          setAvatar(data.photoURL || "https://i.pravatar.cc/100");
          setPhoneNumber(data.phoneNumber || "");
          setLocation(data.location || "");
          setCountry(data.country || "USA");
          setPostalCode(data.postalCode || "");
          setTaxId(data.taxId || "");
          setCompany(data.company || "");
          setBio(data.bio || "");

          // const nameParts = (data.displayName || "").split(" ");
          // setFirstName(nameParts[0] || "");
          // setLastName(nameParts[1] || "");
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    if (user?.email) fetchProfile();
  }, [user?.email]);


  const handleSaveProfile = async () => {
    const updatedUser = {
      photoURL: avatar,
      phoneNumber: document.querySelector('input[placeholder="Phone"]')?.value || "",
      location: document.querySelector('input[placeholder="City/State"]')?.value || "",
      country: document.querySelector('select[placeholder="Country"]')?.value || "",
      postalCode: document.querySelector('input[placeholder="Postal Code"]')?.value || "",
      taxId: document.querySelector('input[placeholder="Tax ID"]')?.value || "",
      company: document.querySelector('input[placeholder="Company Name"]')?.value || "",
      language: document.querySelector('select[placeholder="Language"]')?.value || "",
      bio: document.querySelector('textarea')?.value || "",
      firstName,
      lastName,
      email: user.email,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();
      if (data.success) {
        setIsEditable(false);
        setMessage("Profile updated successfully!");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setError("An error occurred.");
      console.error(err);
    }
  };

  const SecurityComponent = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState(user?.email || "");
    const [twoFAEnabled, setTwoFAEnabled] = useState(false);

    const clearMessages = () => {
      setError(null);
      setMessage(null);
    };

    const reauthenticate = async () => {
      if (!currentPassword) {
        setError("Please enter your current password to confirm.");
        return false;
      }
      try {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        return true;
      } catch {
        setError("Current password is incorrect.");
        return false;
      }
    };

    const handleChangePassword = async (e) => {
      e.preventDefault();
      clearMessages();
      if (newPassword.length < 6) {
        setError("New password should be at least 6 characters.");
        return;
      }
      const success = await reauthenticate();
      if (!success) return;

      try {
        await updatePassword(auth.currentUser, newPassword);
        setMessage("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
      } catch (err) {
        setError(err.message);
      }
    };

    const handleChangeEmail = async (e) => {
      e.preventDefault();
      clearMessages();
      if (!newEmail.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }
      const success = await reauthenticate();
      if (!success) return;

      try {
        await updateEmail(auth.currentUser, newEmail);
        setMessage("Email updated successfully.");
      } catch (err) {
        setError(err.message);
      }
    };

    const handleToggle2FA = () => {
      setTwoFAEnabled(!twoFAEnabled);
      setMessage(twoFAEnabled ? "Two-step verification disabled." : "Two-step verification enabled.");
    };

    return (
      <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Security Settings</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {message && <div className="text-green-600 mb-4">{message}</div>}

        <form onSubmit={handleChangePassword} className="mb-6">
          <label className="block mb-1 font-medium">Current Password</label>
          <input
            type="password"
            className="w-full p-2 rounded border border-gray-300 mb-3"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            className="w-full p-2 rounded border border-gray-300 mb-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
          />

          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            Change Password
          </button>
        </form>

        <form onSubmit={handleChangeEmail} className="mb-6">
          <label className="block mb-1 font-medium">New Email</label>
          <input
            type="email"
            className="w-full p-2 rounded border border-gray-300 mb-3"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            Change Email
          </button>
        </form>

        <div className="flex items-center space-x-4">
          <label className="font-medium">Two-Step Verification (2FA)</label>
          <input
            type="checkbox"
            checked={twoFAEnabled}
            onChange={handleToggle2FA}
            className="w-5 h-5"
          />
        </div>
      </div>
    );
  };

  const BillingComponent = () => {
    const paymentMethods = [
      {
        type: "Visa",
        icon: <FaCcVisa className="text-blue-700 text-3xl" />,
        cardNumber: "**** **** **** 1234",
        expiry: "12/27",
      },
      {
        type: "Mastercard",
        icon: <FaCcMastercard className="text-red-600 text-3xl" />,
        cardNumber: "**** **** **** 5678",
        expiry: "05/26",
      },
      {
        type: "PayPal",
        icon: <FaPaypal className="text-indigo-700 text-3xl" />,
        cardNumber: "user@example.com",
        expiry: "Linked",
      },
    ];

    return (
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-purple-700">Billing & Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((method, i) => (
            <div key={i} className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md border">
              <div>{method.icon}</div>
              <div>
                <div className="font-medium">{method.type}</div>
                <div className="text-sm text-gray-600">{method.cardNumber}</div>
                <div className="text-xs text-gray-500">Expiry: {method.expiry}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#3b6b3b] via-[#4a8c6f] to-[#a5744f] text-gray-700 py-24 px-6">
      <div className="flex bg-white/30 backdrop-blur-md rounded-3xl shadow-lg p-6">
        <aside className="w-64 bg-white/40 shadow-md p-6 rounded-3xl h-full">
          <ul className="space-y-4 mt-6">
            <li className={`cursor-pointer font-medium ${activeSection === "profile" ? "text-purple-600" : "hover:text-purple-600"}`} onClick={() => setActiveSection("profile")}>My Profile</li>
            <li className={`cursor-pointer font-medium ${activeSection === "security" ? "text-purple-600" : "hover:text-purple-600"}`} onClick={() => setActiveSection("security")}>Security</li>
            <li className={`cursor-pointer font-medium ${activeSection === "billing" ? "text-purple-600" : "hover:text-purple-600"}`} onClick={() => setActiveSection("billing")}>Billing</li>
          </ul>
        </aside>

        <main className="flex-1 pl-10">
          {activeSection === "profile" && (
            <div className="relative bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-4xl mx-auto min-h-full transition">
              <button onClick={() => setIsEditable(!isEditable)} className="absolute top-4 right-4 px-4 py-1.5 text-sm rounded-full font-medium bg-purple-100 text-orange-700 hover:bg-purple-200 transition cursor-pointer">
                {isEditable ? "Cancel Edit" : "Edit"}
              </button>

              <div className="flex items-center space-x-4 mb-8 relative">
                <div className="relative cursor-pointer group" onClick={() => setShowAvatarActions(!showAvatarActions)}>
                  <div className="relative w-20 h-20 rounded-full shadow-md ring-2 ring-purple-400 animate-pulse overflow-hidden">
                    <img src={newAvatar || avatar} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                </div>

                {showAvatarActions && (
                  <div className="space-y-2 flex flex-col">
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      className="w-full px-4 py-2 rounded border border-gray-300"
                      value={newAvatar || ""}
                      onChange={(e) => setNewAvatar(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                      onClick={() => {
                        setAvatar(newAvatar);
                        setNewAvatar(null);
                      }}
                    >
                      Save Avatar
                    </button>
                  </div>
                )}
              </div>

              <form className="grid grid-cols-2 gap-4 text-sm">
                <div><label>First Name</label><input className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner" placeholder="First Name" defaultValue={firstName} disabled={!isEditable} /></div>
                <div><label>Last Name</label><input className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner" placeholder="Last Name" defaultValue={lastName} disabled={!isEditable} /></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <label>Email Address</label>
                    {user?.emailVerified && (
                      <div className="relative group">
                        <FaCheckCircle className="text-green-500 w-5 h-5" />
                        <span className="absolute bottom-full mb-1 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                          Email Verified
                        </span>
                      </div>
                    )}
                  </div>
                  <input className="w-full p-2 rounded mt-1 bg-gray-100 shadow-inner cursor-not-allowed" defaultValue={user?.email || ""} disabled />
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={!isEditable}
                    placeholder="Phone"
                    className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner"
                  />
                </div>
                <div>
                  <label>City/State</label>
                  <input
                    className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner"
                    placeholder="City/State"
                    defaultValue={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={!isEditable} />
                </div>
                <div>
                  <label>Country</label>
                  <select
                    className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner"
                    placeholder="Country"
                    disabled={!isEditable}>
                    <option>{user?.country || "BD"}</option>
                  </select>
                </div>
                <div>
                  <label>Postal Code</label>
                  <input
                    className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner"
                    placeholder="Postal Code" defaultValue={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    disabled={!isEditable} />
                </div>
                <div>
                  <label>Tax ID</label>
                  <input
                    className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner"
                    placeholder="Tax ID" defaultValue={taxId || ""}
                    onChange={(e) => setTaxId(e.target.value)}
                    disabled={!isEditable} />
                </div>
                <div>
                  <label>Company Name</label>
                  <input
                    className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner"
                    placeholder="Company Name" defaultValue={company || ""}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={!isEditable} />
                </div>
                <div>
                  <label>Language</label>
                  <select className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner" placeholder="Language" disabled={!isEditable}><option>{user?.language || "English"}</option></select>
                </div>
                <div className="col-span-2">
                  <label>Bio</label>
                  <textarea
                    rows="4"
                    className="w-full p-2 rounded mt-1 bg-gray-50 shadow-inner"
                    placeholder="Bio"
                    defaultValue={bio || "Student..."}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditable} />
                </div>
              </form>

              {isEditable && (
                <div className="flex justify-end mt-6 space-x-2">
                  <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition" onClick={() => setIsEditable(false)}>Cancel</button>
                  <button onClick={handleSaveProfile} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">Save</button>
                </div>
              )}
            </div>
          )}

          {activeSection === "security" && <SecurityComponent />}
          {activeSection === "billing" && <BillingComponent />}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
