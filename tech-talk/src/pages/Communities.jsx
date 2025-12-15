import React, { useEffect, useState, useContext } from "react";
import CommunityCard from "../components/cards/CommunityCard";
import {
  joinCommunity,
  leaveCommunity,
  getJoinedCommunities,
} from "../api/api";
import { UserContext } from "../context/UserContext";
import { getAllCommunities, getAllCategories } from "../api/api";
import Popup from "../components/cards/Popup";

const Communities = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [recommended, setRecommended] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { currentUser } = useContext(UserContext);
  const [joined, setJoined] = useState([]);
  const [popup, setPopup] = useState(null);

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
      setFiltered(filteredData);
    }
  }, [activeCategory, recommended]);

  // Include "All" button at the start
  const allCategories = [{ name: "All" }, ...categories];

  // Filter communities by search query
  const filteredBySearch = filtered.filter(community =>
    community.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-4 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Communities
          </h1>
          <p className="text-sm text-gray-600">
            Discover and join communities that interest you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 rounded-lg p-4 bg-white border border-gray-200">
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg px-4 py-2 text-sm transition-all border bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#820000] focus:ring-1 focus:ring-[#820000]"
          />
        </div>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-2 mb-6 rounded-lg p-3 bg-white border border-gray-200">
          {allCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === category.name
                  ? 'bg-[#820000] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold mb-4 text-gray-900">
          {activeCategory} Communities {filteredBySearch.length > 0 && `(${filteredBySearch.length})`}
        </h2>

        {/* Communities grid */}
        {filteredBySearch.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBySearch.map((item) => (
              <CommunityCard
                key={item.communityId}
                {...item}
                isJoined={joined.includes(item.communityId)}
                onJoin={async (communityId) => {
                  if (!currentUser?.id) return;
                  if (joined.includes(communityId)) {
                    await leaveCommunity(currentUser.id, communityId);
                    setJoined((prev) => prev.filter((id) => id !== communityId));
                                      setPopup({ message: "You left the community!", type: "success" });
                  } else {
                    await joinCommunity(currentUser.id, communityId);
                    setJoined((prev) => [...prev, communityId]);
                                      setPopup({ message: "You joined the community!", type: "success" });
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-lg bg-gray-100">
            <h3 className="font-bold text-lg mb-1 text-gray-900">
              No communities found
            </h3>
            <p className="text-sm text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
        {popup && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={() => setPopup(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Communities;
