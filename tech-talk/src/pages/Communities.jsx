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
    <div className="bg-gray-50 min-h-screen text-gray-900 py-4 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-lg font-bold mb-3">Communities</h1>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-2 mb-4 bg-white rounded-lg p-3 border border-gray-200">
          {allCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`cursor-pointer px-3 py-1 rounded text-xs font-semibold transition-all ${
                activeCategory === category.name
                  ? "bg-[#820000] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-[#820000] hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <h2 className="text-sm font-semibold text-gray-600 mb-3">
          {activeCategory} Communities
        </h2>

        {/* Communities grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
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
          <p className="text-gray-500 text-xs">No communities found.</p>
        )}
      </div>
    </div>
  );
};

export default Communities;
