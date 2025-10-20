import React, { useState } from "react";
import tech from "../assets/images/tech.png";
import axios from "axios";

function Register() {
  const [studID, setStudID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    // Reset messages
    setMessage("");
    setError("");

    // Basic validation
    if (!studID || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      // Example API request (you can replace with your backend endpoint)
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          studentID: studID,
          password: password,
        }
      );

      console.log("Response:", response.data);

      // Simulated success
      setMessage(`✅ Registered successfully with ID: ${studID}`);
      setStudID("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("❌ Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#410505dc] text-[#410505] font-kanit">
      {/* Content */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="w-full max-w-[450px] bg-[#e9e9e9] rounded-2xl p-10 shadow-xl flex flex-col items-center">
          <h1 className="text-4xl font-semibold mb-6">User Registration</h1>

          {/* Optional Logo */}
          {/* <img src={tech} alt="Tech logo" className="w-20 mb-4" /> */}

          <input
            type="text"
            placeholder="Enter Student ID"
            value={studID}
            onChange={(e) => setStudID(e.target.value)}
            className="p-4 rounded-xl w-full bg-white border border-gray-300 text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-[#410505dc] transition"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-xl w-full bg-white border border-gray-300 text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-[#410505dc] transition"
          />

          {/* Error or Success Messages */}
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

          <p className="text-sm text-left w-full text-gray-700 mb-5">
            Already have an account?{" "}
            <a
              href="#"
              className="text-blue-600 italic hover:underline ml-1 cursor-pointer"
            >
              Login
            </a>
          </p>

          <p className="text-xs text-gray-700 text-center mb-6">
            By continuing, you agree to our{" "}
            <a href="#" className="underline cursor-pointer">
              User Agreement
            </a>{" "}
            and acknowledge that you understand the{" "}
            <a href="#" className="underline cursor-pointer">
              Privacy Policy
            </a>
            .
          </p>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-[#410505dc] hover:bg-[#300303] text-white py-3 w-full rounded-xl text-lg transition cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
