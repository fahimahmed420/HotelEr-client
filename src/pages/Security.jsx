import React, { useContext, useState } from "react";
import {
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../utils/ThemeContext";

const Security = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const auth = getAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const clearMessages = () => {
    setError(null);
    setMessage(null);
  };

  const reauthenticate = async () => {
    if (!currentPassword) {
      setError("Please enter your current password.");
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
    setMessage(
      twoFAEnabled ? "Two-step verification disabled." : "Two-step verification enabled."
    );
  };

  return (
    <div
      className={`max-w-lg mx-auto rounded-xl p-6 shadow-lg ${
        darkMode
          ? "bg-gray-800/80 text-gray-100 border border-gray-700"
          : "bg-white/80 text-gray-900 border border-gray-300"
      } backdrop-blur-md`}
    >
      <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Security Settings</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {message && <div className="text-green-600 mb-4">{message}</div>}

      <form onSubmit={handleChangePassword} className="mb-6">
        <label className="block mb-1 font-medium">Current Password</label>
        <input
          type="password"
          className={`w-full p-2 rounded border mb-3 ${
            darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"
          }`}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          className={`w-full p-2 rounded border mb-3 ${
            darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"
          }`}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Change Password
        </button>
      </form>

      <form onSubmit={handleChangeEmail} className="mb-6">
        <label className="block mb-1 font-medium">New Email</label>
        <input
          type="email"
          className={`w-full p-2 rounded border mb-3 ${
            darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"
          }`}
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
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

export default Security;
