import React from "react";
import { Link } from "react-router-dom";

const PopularCommunitiesCard = ({ communities }) => {
  const popularCommunities = communities.filter((c) => c.members > 1000);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md w-80 relative">
      <h2 className="font-bold mb-4 text-black">Popular Communities</h2>

      <div className="flex flex-col gap-4 mb-4 max-h-96 overflow-y-auto">
        {popularCommunities.map((community) => (
          <div key={community.id} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${
                community.color || "bg-gray-300"
              }`}
            ></div>
            <div className="flex flex-col">
              <span className="font-semibold text-black">{community.name}</span>
              <span className="text-gray-500 text-sm">
                {community.members} members
              </span>
            </div>
          </div>
        ))}

        {popularCommunities.length === 0 && (
          <p className="text-gray-500 text-sm">No popular communities yet.</p>
        )}
      </div>

      <Link to="/app/communities">
        <button className="bg-red-900 text-white text-sm px-4 py-2 rounded-full hover:bg-red-800 transition cursor-pointer font-bold">
          See More
        </button>
      </Link>
    </div>
  );
};

export default PopularCommunitiesCard;
