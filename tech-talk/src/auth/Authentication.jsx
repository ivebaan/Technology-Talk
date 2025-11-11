import React, { useEffect, useState } from "react";
import tech from "../assets/images/tech.png";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Authentication(){
return (
  <Router>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  </Router>
)
}

export default Authentication;




function Register() {
  const [studID, setStudID] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!studID || !password) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`Registered with ID: ${studID}`);
  };

  useEffect(() => {
     axios
     .get("")
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[#410505dc] text-[#410505] font-kanit">
      {/* Content */}
      <div className="flex flex-1 justify-center items-center px-4 ">
        <div className="w-full max-w-[450px] bg-[#e9e9e9] rounded-2xl p-10 shadow-xl flex flex-col items-center ">
          <h1 className="text-4xl font-semibold mb-10">User Registration</h1>
          {/* Optional Image */}
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

          <p className="text-sm text-left w-full text-gray-700 mb-7">
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
            className="bg-[#410505dc] hover:bg-[#300303] text-white py-3 w-full rounded-xl text-lg transition cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}


