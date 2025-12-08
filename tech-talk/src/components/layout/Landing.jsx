import React from "react";
import { BookOpen, Users, MessageCircle, Calendar } from "lucide-react";
import logo from "../../assets/images/tech.png";
import landingImg from "../../assets/images/cover.jpg";
import FeatureCard from "../cards/FeatureCard";
import { useNavigate } from "react-router-dom";
import Typewriter from "../effects/Typewriter";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-yellow-50 text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={logo} className="h-14 w-14 object-contain" />
          <h1 className="text-2xl font-bold text-[#820000]">Technology-Talk</h1>
        </div>
        <div className="space-x-4">
          <button
            className="px-4 py-2 font-medium rounded-md text-white bg-[#820000] hover:bg-[#370000] transition"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20 gap-10">
        <motion.div
          className="flex-1 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#820000] to-yellow-500">
            CIT University Student Community
          </h2>

          <Typewriter
            texts={[
              "Share knowledge, collaborate, and learn with fellow students.",
              "Engage in tech discussions, discover new ideas, and join campus projects.",
              "Your ideas turn into real projects — brainstorm, discuss, and innovate together.",
            ]}
            speed={50}
            pause={1500}
            textSize="2xl"
            color="text-gray-800"
          />

          <div className="mt-6 flex justify-center md:justify-start gap-4 flex-wrap">
            <motion.button
              onClick={() => navigate("/register")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#820000] text-white rounded-md font-semibold hover:bg-[#370000] transition shadow-lg"
            >
              Join Now
            </motion.button>
            <motion.button
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-gray-300 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Sign In
            </motion.button>
          </div>
        </motion.div>

      <motion.div
        className="flex-1 flex justify-center md:justify-end"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={landingImg}
          alt="Landing Illustration"
          className="w-full max-w-2xl rounded-2xl shadow-xl object-cover"
          animate={{
            y: [0, -15, 0],   // Moves up, then down
          }}
          transition={{
            duration: 4,      // Slow floating speed
            repeat: Infinity, // Loop forever
            ease: "easeInOut"
          }}
        />
      </motion.div>

      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {[
          {
            icon: <BookOpen className="text-rose-700" size={28} />,
            title: "Academic Discussions",
            desc: "Share knowledge about courses, subjects, and study tips",
          },
          {
            icon: <Users className="text-yellow-500" size={28} />,
            title: "Campus Life",
            desc: "Connect with students and share campus experiences",
          },
          {
            icon: <MessageCircle className="text-rose-600" size={28} />,
            title: "Q&A Forum",
            desc: "Ask questions and get answers from the community",
          },
          {
            icon: <Calendar className="text-yellow-600" size={28} />,
            title: "Events & Activities",
            desc: "Stay updated on campus events and activities",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-32 py-8 text-center text-gray-500 text-sm">
        &copy; 2025 Technology-Talk. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
