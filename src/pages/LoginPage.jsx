import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

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

// Reusable error handler for auth errors
const showAuthErrorToast = (error) => {
  console.error("Auth error:", error); // For debugging

  const errorCode = error?.code || "";

  switch (errorCode) {
    case "auth/user-not-found":
      toast.error("No account found with this email.");
      break;
    case "auth/wrong-password":
      toast.error("Incorrect password. Please try again.");
      break;
    case "auth/invalid-email":
      toast.error("Invalid email format.");
      break;
    case "auth/too-many-requests":
      toast.error("Too many failed attempts. Please wait and try again.");
      break;
    case "auth/invalid-credential":
      // Shown when Firebase hides specific error details
      toast.error("Incorrect email or password.");
      break;
    case "auth/network-request-failed":
      toast.error("Network error. Please check your internet connection.");
      break;
    default:
      toast.error("Login failed. Please try again.");
      break;
  }
};



export default function LoginPage() {
  const { signInUser, signInWithGoogle, passReset } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const audioRef = useRef(null);

  const passwordRegex = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    digit: /\d/,
  };

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid =
    passwordRegex.length.test(password) &&
    passwordRegex.uppercase.test(password) &&
    passwordRegex.lowercase.test(password) &&
    passwordRegex.digit.test(password);

  useEffect(() => {
    if (showResetModal) {
      const timer = setTimeout(() => {
        setShowResetModal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showResetModal]);

  const playSuccessSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const vibrate = (pattern = [100]) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!isEmailValid || !isPasswordValid) {
      vibrate([200, 100, 200]);
      toast.error("Please enter a valid email and password.");
      return;
    }

    try {
      setLoading(true);
      await signInUser(email, password);
      navigate("/");
    } catch (error) {
      vibrate([200, 100, 200]);
      showAuthErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const toastId = toast.loading("Signing in with Google...");
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.dismiss(toastId);
      navigate("/");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Google sign-in failed: " + (error.message || ""), { id: toastId });
      vibrate([200, 100, 200]);
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setEmailTouched(true);

    if (!email) {
      toast.error("Please enter your email to reset the password.");
      vibrate([200, 100, 200]);
      return;
    }

    if (!isEmailValid) {
      toast.error("Enter a valid email address.");
      vibrate([200, 100, 200]);
      return;
    }

    try {
      await passReset(email);
      setShowResetModal(true);
      playSuccessSound();
      vibrate([100]);
      toast.success("Reset email sent!");
    } catch (error) {
      console.error("Password reset error:", error);
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email. Please register.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        default:
          toast.error("Password reset failed: " + (error.message || ""));
          break;
      }
      vibrate([200, 100, 200]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5f6fd] p-4 relative">
      <audio ref={audioRef} src="confident-543.mp3" preload="auto" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl h-auto lg:h-[80vh] rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
      >
        <div
          className="w-full flex flex-col lg:flex-row relative"
          style={{
            backgroundImage: "url('/login-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 text-sky-800 bg-white/30 hover:bg-white/50 border border-white/50 backdrop-blur px-4 py-1 rounded-full text-sm font-medium transition z-20"
          >
            ← Back to Home
          </button>

          <div className="w-full md:w-1/2 backdrop-blur-md bg-white/60 p-8 sm:p-12 flex flex-col justify-center">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-[inherit]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Welcome
            </motion.h1>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email Input */}
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

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => {
                    setPasswordTouched(true);
                    setPasswordFocused(false);
                  }}
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
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>

                {/* Password Requirements */}
                {(passwordFocused || password.length > 0) && (
                  <div className="text-sm mt-2 space-y-1">
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
                  </div>
                )}

                {passwordTouched && password.length > 0 && !isPasswordValid && (
                  <div className="text-red-500 text-sm mt-1">
                    Password must meet all the above conditions.
                  </div>
                )}

                <div
                  onClick={handlePasswordReset}
                  className="text-right mt-1 text-sm text-sky-700 cursor-pointer hover:underline"
                >
                  Forgot Password?
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg border border-sky-500 text-sky-700 font-semibold transition backdrop-blur-md cursor-pointer ${
                  loading
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white/20 hover:bg-sky-200"
                }`}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* Google Sign In */}
            <div className="mt-6 text-center text-gray-500">or continue with</div>
            <div className="flex justify-center mt-2 gap-4">
              <div className="relative inline-block group w-12 h-12">
                <div className="absolute inset-0 rounded-full p-[2px] bg-[conic-gradient(at_top_left,_#3b82f6,_#60a5fa,_#3b82f6)] animate-spin-slow blur-sm opacity-80 group-hover:opacity-100"></div>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="relative cursor-pointer z-10 w-full h-full flex items-center justify-center rounded-full border border-gray-300 backdrop-blur-md bg-white/30 hover:bg-white/40 transition"
                >
                  <FcGoogle className="text-xl" />
                </button>
              </div>
            </div>

            <Link to={"/register"}>
              <p className="text-right mt-1 text-sm text-sky-700 cursor-pointer hover:underline">
                New Here? Register
              </p>
            </Link>
          </div>

          <div className="hidden md:block w-1/2" />
        </div>
      </motion.div>

      {/* Reset Success Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center"
          >
            <h2 className="text-xl font-semibold text-sky-700 mb-2">
              Password Reset Email Sent
            </h2>
            <p className="text-gray-600 mb-4">
              Please check your email inbox and follow the instructions to reset
              your password.
            </p>
            <button
              onClick={() => setShowResetModal(false)}
              className="mt-2 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition"
            >
              OK
            </button>
          </motion.div>
        </div>
      )}
      <Toaster position="top-right" toastOptions={{ style: { zIndex: 9999 } }} />

    </div>
  );
}
