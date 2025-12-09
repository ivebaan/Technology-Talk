import React, { useState, useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import pic from "../assets/images/nice.png";
import Typewriter from "../components/effects/Typewriter";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", err: "" });
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value !== "") {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleLogin = async () => {
    const newErrors = { email: "", password: "", err: "" };
    let valid = true;

    if (
      !email ||
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const res = await axios.post("http://localhost:8081/users/login", {
        email,
        password,
      });
      setCurrentUser(res.data);
      setEmail("");
      setPassword("");
      setErrors({ email: "", password: "", err: "" });
      navigate("/app/home");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        err: "Invalid credentials. Please try again.",
      }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-kanit p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-semibold mb-10 text-center text-[#410505dc]">
            User Login
          </h1>

          <input
            type="email"
            placeholder="Enter Institutional Email"
            value={email}
            onChange={handleEmailChange}
            className="p-4 rounded-xl w-full border border-gray-300 text-gray-800 mb-1 focus:outline-none focus:ring-2 focus:ring-[#410505dc] transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}

          <div className="relative w-full mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
              className="p-4 rounded-xl w-full border mt-3 border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#410505dc] transition duration-300"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}

          <p className="text-sm text-left w-full text-gray-700 mb-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 italic hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>

          <p className="text-red-500 text-sm my-4">{errors.err}</p>

          <button
            onClick={handleLogin}
            className="bg-[#410505dc] hover:bg-[#300303] text-white py-3 w-full rounded-xl text-lg transition cursor-pointer mb-4"
          >
            Login
          </button>

          <p className="text-xs text-gray-700 text-center">
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
        </div>

        {/* Left Side - Branding */}
        <div className="hidden md:flex w-1/2 bg-[#410505dc] text-white flex-col items-center p-10">
          <img src={pic} className="cursor-pointer max-w-1/3 mb-11" />
          <h1 className="text-3xl font-bold my-5 text-center">
            Welcome to Technology-Talk!
          </h1>

          <Typewriter
            texts={[
              "Technology-Talk is a community where students and tech enthusiasts come together to share knowledge, explore innovations, and collaborate on meaningful projects.",
              "Join Technology-Talk to engage in discussions about the latest technologies, discover new ideas, and connect with like-minded individuals passionate about learning and growth.",
              "Technology-Talk empowers students to learn from each other, exchange insights, and stay updated on emerging trends in technology and innovation.",
              "Collaborate, communicate, and innovate with Technology-Talk — a platform designed to make technology discussions interactive, engaging, and accessible to everyone.",
              "At Technology-Talk, ideas turn into projects. Students can brainstorm, discuss, and build solutions together while expanding their tech knowledge and skills.",
            ]}
            speed={50}
            pause={1500}
            textSize={"sm"}
            color="text-white"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
