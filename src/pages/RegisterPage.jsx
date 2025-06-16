import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500 mb-10">
          Sign Up
        </h1>
        <form className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <button className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold">
            Register
          </button>
          <div className="text-center text-sm text-gray-500">or continue with</div>
          <div className="flex justify-center space-x-4">
            <button className="bg-gray-100 p-3 rounded-full">F</button>
            <button className="bg-gray-100 p-3 rounded-full">G</button>
            <button className="bg-gray-100 p-3 rounded-full"></button>
          </div>
        </form>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 relative">
        <img
          src="/beach-bg.png"
          alt="Beach Illustration"
          className="object-cover w-full h-full"
        />
        <nav className="absolute top-5 right-10 space-x-6 text-white font-medium">
          <a href="#">Forecast</a>
          <a href="#">Webcams</a>
          <a href="#">Live map</a>
        </nav>
      </div>
    </div>
  );
};

export default RegisterPage;
