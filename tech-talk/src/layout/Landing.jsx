import React from "react";
import { BookOpen, Users, MessageCircle, Calendar } from "lucide-react";
import logo from "../assets/images/tech.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-yellow-50 text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <img src={logo} className="object-fill cursor-pointer h-14" />
          <h1 className="text-xl font-bold text-[#820000] ">Technology-Talk</h1>
        </div>
        <button className="bg-[#820000] cursor-pointer text-white font-medium px-4 py-2 rounded-md hover:bg-[#370000] transition">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 py-20">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#820000] to-yellow-500 my-4">
          CIT University Student Community
        </h2>
        <p className="text-lg text-gray-700 mt-6 max-w-2xl">
          Connect, share, and learn with fellow students at Cebu Institute of
          Technology University
        </p>

        <div className="mt-8 flex space-x-4">
          <button className="bg-[#820000] text-white px-6 py-3 rounded-md font-medium hover:bg-[#370000] transition cursor-pointer">
            Join Now
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition cursor-pointer">
            Sign In
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-6xl w-full">
          <FeatureCard
            icon={<BookOpen className="text-rose-700" size={28} />}
            title="Academic Discussions"
            desc="Share knowledge about courses, subjects, and study tips"
          />
          <FeatureCard
            icon={<Users className="text-yellow-500" size={28} />}
            title="Campus Life"
            desc="Connect with students and share campus experiences"
          />
          <FeatureCard
            icon={<MessageCircle className="text-rose-600" size={28} />}
            title="Q&A Forum"
            desc="Ask questions and get answers from the community"
          />
          <FeatureCard
            icon={<Calendar className="text-yellow-600" size={28} />}
            title="Events & Activities"
            desc="Stay updated on campus events and activities"
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left transform transition hover:scale-105 hover:shadow-md">
    <div className="flex items-center mb-3 space-x-3">
      <div className="p-2 bg-rose-50 rounded-full">{icon}</div>
      <h3 className="text-lg font-semibold text-rose-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

export default Landing;
