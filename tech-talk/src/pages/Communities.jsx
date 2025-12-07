import React, { useEffect, useState } from "react";
import CommunityCard from "../components/cards/CommunityCard";
import { getAllCommunities } from "../api/api";

const Communities = () => {
  const categories = [
    "All",
    "Academics",
    "Courses",
    "Campus Life",
    "Tech",
    "Support",
    "Community",
    "Beyond Campus",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [recommended, setRecommended] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getAllCommunities()
      .then((res) => res.json())
      .then((data) => {
        setRecommended(data);
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFiltered(recommended);
    } else {
      setFiltered(
        recommended.filter((item) => item.category === activeCategory)
      );
    }
  }, [activeCategory, recommended]);

  return (
    <div className="bg-white min-h-screen text-maroon-900 p-8 mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-maroon-800">
        Explore Communities
      </h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`cursor-pointer px-4 py-2 rounded-lg transition text-sm ${
              activeCategory === category
                ? "bg-[#820000] text-white"
                : "text-[#820000] hover:bg-[#820000] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        {activeCategory} Communities
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-8">
        {filtered.map((item, index) => (
          <CommunityCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Communities;
