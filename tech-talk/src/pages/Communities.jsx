import React, { useEffect, useState } from "react";

const CommunityCard = ({ title, visitors, description }) => (
  <div className="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
    <h3 className="font-bold text-maroon-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-500 mb-2">{visitors} weekly visitors</p>
    <p className="text-gray-700 mb-3">{description}</p>
    <button className="bg-maroon-700 text-white px-4 py-2 rounded-full hover:bg-maroon-800 transition">
      Join
    </button>
  </div>
);

const Communities = () => {
  const categories = ["Academics", "Q&A", "Campus Life", "Study Buddy"];
  // const [communities, setCommunities] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recommended")
      .then((res) => res.json())
      .then((data) => setRecommended(data))
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  return (
    <div className="bg-white min-h-screen text-maroon-900 p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-maroon-800">
        Explore Communities
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border transition ${
              index === 0
                ? "bg-maroon-700 text-white"
                : "border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recommended Section */}
      <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-8">
        {recommended.map((item, index) => (
          <CommunityCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Communities;
