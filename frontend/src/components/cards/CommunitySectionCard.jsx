import React from "react";
import { useNavigate } from "react-router-dom";

export default function CommunitySectionCard({ community, featured = false }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/app/community/${community.name}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group ${
        featured
          ? "col-span-1 md:col-span-2 border-2 border-[#820000]"
          : "border border-gray-200 hover:border-[#820000]"
      }`}
    >
      {/* Community Image */}
      <div className="relative h-32 md:h-40 bg-gradient-to-br from-[#820000] to-[#a30000] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        {community.image ? (
          <img
            src={community.image}
            alt={community.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold opacity-20">
            {community.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Community Info */}
      <div className="p-4 md:p-6 bg-white">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#820000] transition-colors">
          r/{community.name}
        </h3>
        <p className="text-gray-600 text-sm md:text-base mb-3 line-clamp-2">
          {community.description || "No description available"}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <span className="text-[#820000] font-bold">●</span>
            <span>{community.members || 0} members</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#820000] font-bold">●</span>
            <span>{community.posts || 0} posts</span>
          </div>
        </div>

        {/* Join Button */}
        <button className="w-full bg-gradient-to-r from-[#820000] to-[#a30000] text-white font-bold py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Explore Community
        </button>
      </div>
    </div>
  );
}
