import React, { useEffect, useState } from "react";
import CommunityCard from "../components//cards/CommunityCard";

const Communities = () => {
  const categories = [
    "Academics",
    "Courses",
    "Campus Life",
    "Tech",
    "Support",
    "Community",
    "Beyond Campus",
  ];
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/communities")
      .then((res) => res.json())
      .then((data) => setRecommended(data))
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  return (
    <div className="bg-white min-h-screen text-maroon-900 p-8 mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-maroon-800">
        Explore Communities
      </h1>

      <div className="flex flex-wrap gap-3 mb-8 hover">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`cursor-pointer px-4 py-2 rounded-lg transition hover:bg-[#820000] hover:text-white text-[#820000] text-sm"
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
