import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/LoginPage.css";

const ChecklistItem = ({ valid, label }) => (
  <div className="flex items-center gap-2">
    {valid ? (
      <FaCheckCircle className="text-green-500" />
    ) : (
      <FaTimesCircle className="text-red-400" />
    )}
    <span className={valid ? "text-green-600" : "text-gray-500"}>{label}</span>
  </div>
);

export default function LoginPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    digit: /\d/,
  };

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid =
    passwordRegex.length.test(password) &&
    passwordRegex.uppercase.test(password) &&
    passwordRegex.lowercase.test(password) &&
    passwordRegex.digit.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);

    if (isNameValid && isEmailValid && isPasswordValid) {
      console.log("Logging in with:", { name, email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5f6fd] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl h-auto lg:h-[80vh] rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
      >
        <div
          className="w-full flex flex-col lg:flex-row relative"
          style={{
            backgroundImage: "url('/reg-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            onClick={() => navigate("/login")}
            className="absolute top-4 left-4 text-sky-800 bg-white/30 hover:bg-white/50 border border-white/50 backdrop-blur px-4 py-1 rounded-full text-sm font-medium transition z-20"
          >
            ← Back to Login
          </button>

          <div className="w-full md:w-1/2 backdrop-blur-md bg-white/60 p-8 sm:p-12 flex flex-col justify-center">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-[inherit]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Create Account
            </motion.h1>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setNameTouched(true)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    !isNameValid && nameTouched
                      ? "border-red-400"
                      : "border-transparent"
                  } placeholder-gray-400 text-sky-900 focus:outline-none focus:ring-2 ${
                    !isNameValid && nameTouched
                      ? "focus:ring-red-400"
                      : "focus:ring-sky-400"
                  }`}
                />
                {!isNameValid && nameTouched && (
                  <div className="text-red-500 text-sm mt-1">
                    Name must be at least 2 characters.
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="maria@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    !isEmailValid && emailTouched
                      ? "border-red-400"
                      : "border-transparent"
                  } placeholder-gray-400 text-sky-900 focus:outline-none focus:ring-2 ${
                    !isEmailValid && emailTouched
                      ? "focus:ring-red-400"
                      : "focus:ring-sky-400"
                  }`}
                />
                {!isEmailValid && emailTouched && (
                  <div className="text-red-500 text-sm mt-1">
                    Please enter a valid email.
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    !isPasswordValid && passwordTouched
                      ? "border-red-400"
                      : "border-transparent"
                  } placeholder-gray-400 text-sky-900 focus:outline-none focus:ring-2 ${
                    !isPasswordValid && passwordTouched
                      ? "focus:ring-red-400"
                      : "focus:ring-sky-400"
                  } pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-700 hover:text-sky-900"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>

                {/* Checklist */}
                <div className="text-sm mt-2 space-y-1">
                  {(passwordTouched || password.length > 0) && (
                    <>
                      <ChecklistItem
                        valid={passwordRegex.length.test(password)}
                        label="At least 8 characters"
                      />
                      <ChecklistItem
                        valid={passwordRegex.uppercase.test(password)}
                        label="At least 1 uppercase letter"
                      />
                      <ChecklistItem
                        valid={passwordRegex.lowercase.test(password)}
                        label="At least 1 lowercase letter"
                      />
                      <ChecklistItem
                        valid={passwordRegex.digit.test(password)}
                        label="At least 1 number"
                      />
                    </>
                  )}
                </div>

                {passwordTouched && password.length > 0 && !isPasswordValid && (
                  <div className="text-red-500 text-sm mt-1">
                    Password must meet all the above conditions.
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg border border-sky-500 text-sky-700 font-semibold hover:bg-sky-100 transition backdrop-blur-md bg-white/20"
              >
                Register
              </button>
            </form>

            {/* Social */}
            <div className="mt-6 text-center text-gray-500">or continue with</div>
            <div className="flex justify-center mt-2 gap-4">
              <div className="relative inline-block group w-12 h-12">
                <div className="absolute inset-0 rounded-full p-[2px] bg-[conic-gradient(at_top_left,_#3b82f6,_#60a5fa,_#3b82f6)] animate-spin-slow blur-sm opacity-80 group-hover:opacity-100"></div>
                <button className="relative z-10 w-full h-full flex items-center justify-center rounded-full border border-gray-300 backdrop-blur-md bg-white/30 hover:bg-white/40 transition">
                  <FcGoogle className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="hidden md:block w-1/2" />
        </div>
      </motion.div>
    </div>
  );
}
