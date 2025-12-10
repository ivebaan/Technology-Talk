import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import pic from "../assets/images/nice.png";
import Typewriter from "../components/effects/Typewriter";
import { getAllUsers, createUser } from "../api/api";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordColor, setPasswordColor] = useState("border-gray-300");
  const [confirmPasswordColor, setConfirmPasswordColor] =
    useState("border-gray-300");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    exist: "",
    displayName: "",
  });

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (
      value === "" ||
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
    ) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleDisplayNameChange = (e) => {
    const value = e.target.value;
    setDisplayName(value);
  };

  const checkPasswordStrength = (pwd) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (strongRegex.test(pwd)) {
      setPasswordStrength("Strong");
      setPasswordColor("border-green-500");
    } else {
      setPasswordStrength("Weak");
      setPasswordColor("border-red-500");
    }
    if (confirmPassword) {
      if (pwd === confirmPassword && strongRegex.test(pwd)) {
        setConfirmPasswordColor("border-green-500");
      } else {
        setConfirmPasswordColor("border-red-500");
      }
    }
  };

  const checkConfirmPassword = (value) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (value === password && strongRegex.test(password)) {
      setConfirmPasswordColor("border-green-500");
    } else {
      setConfirmPasswordColor("border-red-500");
    }
  };

  const handleRegister = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      exist: "",
      displayName: "",
    };
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
    } else if (passwordStrength !== "Strong") {
      newErrors.password =
        "Password must be at least 8 chars with uppercase, lowercase, number & special char";
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    const existEmail = data.find((u) => u.email === email);

    if (existEmail) {
      newErrors.exist = "Email already in use.";
      valid = false;
    }
    const existDisplayName = data.find((u) => u.displayName === displayName);

    if (!displayName) {
      newErrors.displayName = "Display Name is required.";
      valid = false;
    } else if (existDisplayName) {
      newErrors.displayName = "Display Name already exist.";
      valid = false;
    }

    if (valid) {
      setConfirmPasswordColor("border-green-500");
      setPasswordColor("border-green-500");
    }

    setErrors(newErrors);
    if (!valid) return;

    createUser({
      displayName: displayName,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPasswordStrength("");
        setPasswordColor("border-gray-300");
        setConfirmPasswordColor("border-gray-300");
        setDisplayName("");
        setErrors({
          email: "",
          password: "",
          confirmPassword: "",
          exist: "",
          displayName: "",
        });
        navigate("/login");
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-kanit p-4 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#820000] hover:text-[#650000] transition font-semibold group"
        title="Back to home"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
        <span className="hidden sm:inline">Back</span>
      </button>
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left */}
        <div className="hidden md:flex w-1/2 bg-[#820000] text-white flex-col items-center p-10">
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
            textSize="sm"
            color="text-white"
          />
        </div>

        {/*Right*/}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-semibold mb-10 text-center text-[#820000]">
            User Registration
          </h1>
          {/*Display name*/}
          <input
            type="text"
            placeholder="Enter display name"
            value={displayName}
            onChange={handleDisplayNameChange}
            className={`p-4 rounded-lg w-full border-2 ${
              errors.displayName ? "border-red-500" : "border-gray-200"
            } text-gray-900 mb-3 focus:outline-none focus:ring-1 focus:ring-[#820000] transition`}
          />
          {errors.displayName && (
            <p className="text-red-500 text-sm mb-2 ml-2">
              {errors.displayName}
            </p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Institutional email"
            value={email}
            onChange={handleEmailChange}
            className={`p-4 rounded-lg w-full border-2 ${
              errors.email ? "border-red-500" : "border-gray-200"
            } text-gray-900 mb-3 focus:outline-none focus:ring-1 focus:ring-[#820000] transition`}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mb-2 ml-2">{errors.email}</p>
          )}
          {errors.exist && (
            <p className="text-red-500 text-sm w-full mb-5 ml-2">
              {errors.exist}
            </p>
          )}

          {/* Password */}
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              className={`p-4 rounded-lg w-full border-2 ${passwordColor} text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#820000] transition duration-300`}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-900 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {password && (
            <p
              className={`text-sm ml-2 mb-2 ${
                passwordStrength === "Strong"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {passwordStrength}
            </p>
          )}

          {errors.password && (
            <p className="text-red-500 text-sm w-full mb-2 ml-2">
              {errors.password}
            </p>
          )}

          {/* Confirm Password */}
          <div className="relative w-full mb-3">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                checkConfirmPassword(e.target.value);
              }}
              className={`p-4 rounded-lg w-full border-2 ${confirmPasswordColor} text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#820000] transition duration-300`}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-900 transition"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm w-full mb-5 ml-2">
              {errors.confirmPassword}
            </p>
          )}

          <p className="text-sm text-left w-full text-gray-700 mb-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#820000] font-semibold hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>

          <button
            onClick={handleRegister}
            className="bg-[#820000] hover:bg-[#650000] text-white py-3 w-full rounded-lg text-lg font-semibold transition shadow-md hover:shadow-lg cursor-pointer mb-4"
          >
            Register
          </button>

          <p className="text-xs text-gray-700 text-center">
            By continuing, you agree to our{" "}
            <Link
              to="/app/user-agreement"
              className="underline cursor-pointer hover:text-[#820000] transition"
            >
              User Agreement
            </Link>{" "}
            and acknowledge that you understand the{" "}
            <Link
              to="/app/privacy-policy"
              className="underline cursor-pointer hover:text-[#820000] transition"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
