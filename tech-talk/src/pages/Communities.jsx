import React, { useEffect, useState, useContext } from "react";
import CommunityCard from "../components/cards/CommunityCard";
import {
  joinCommunity,
  leaveCommunity,
  getJoinedCommunities,
} from "../api/api";
import { UserContext } from "../context/UserContext";
import { getAllCommunities, getAllCategories } from "../api/api";

const Communities = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [recommended, setRecommended] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  const { currentUser } = useContext(UserContext);
  const [joined, setJoined] = useState([]);

  // Fetch communities, categories, and joined communities
  useEffect(() => {
    getAllCommunities()
      .then((res) => {
        setRecommended(res.data);
      })
      .catch((err) => console.error("Error fetching communities:", err));

    getAllCategories()
      .then((res) => {
        const backendCategories = res.data.map((c) => ({ name: c.name }));
        setCategories(backendCategories);
      })
      .catch((err) => console.error("Error fetching categories:", err));

    if (currentUser?.id) {
      getJoinedCommunities(currentUser.id)
        .then((res) => setJoined(res.data.map((j) => j.community?.communityId)))
        .catch(() => setJoined([]));
    }
  }, [currentUser]);

  // Filter communities based on active category
  useEffect(() => {
    if (activeCategory === "All") {
      setFiltered(recommended);
    } else {
      const filteredData = recommended.filter(
        (item) => item.category?.name === activeCategory
      );
      console.log(`Filtered for ${activeCategory}:`, filteredData);
      setFiltered(filteredData);
    }
  }, [activeCategory, recommended]);

  // Include "All" button at the start
  const allCategories = [{ name: "All" }, ...categories];

  return (
    <div className="bg-white min-h-screen text-maroon-900 p-8 mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-maroon-800">
        Explore Communities
      </h1>

      {/* Category buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {allCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category.name)}
            className={`cursor-pointer px-4 py-2 rounded-lg transition text-sm ${
              activeCategory === category.name
                ? "bg-[#820000] text-white"
                : "text-[#820000] hover:bg-[#820000] hover:text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        {activeCategory} Communities
      </h2>

      {/* Communities grid */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-8">
          {filtered.map((item) => (
            <CommunityCard
              key={item.communityId}
              {...item}
              isJoined={joined.includes(item.communityId)}
              onJoin={async (communityId) => {
                if (!currentUser?.id) return;
                if (joined.includes(communityId)) {
                  await leaveCommunity(currentUser.id, communityId);
                  setJoined((prev) => prev.filter((id) => id !== communityId));
                } else {
                  await joinCommunity(currentUser.id, communityId);
                  setJoined((prev) => [...prev, communityId]);
                }
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No communities found in this category.</p>
      )}
    </div>
  );
};

export default Communities;
