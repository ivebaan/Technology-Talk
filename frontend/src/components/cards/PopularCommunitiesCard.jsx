import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PopularCommunitiesCard = ({ communities }) => {
  const navigate = useNavigate();
  const popularCommunities = communities.sort((a, b) => (b.members || 0) - (a.members || 0)).slice(0, 10);

  const CircleIcon = ({ bgColor, text }) => (
    <div className={`${bgColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs hover:scale-110 transition-transform`}>
      {text}
    </div>
  );

  return (
    <div className="rounded-xl shadow-lg p-5 w-full transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-xl hover:border-[#820000]">
      <h2 className="font-bold text-base mb-4 text-gray-900">Popular Communities</h2>

      <div className={`flex flex-col gap-2.5 mb-4 max-h-64 overflow-y-auto`}>
        {popularCommunities.map((community) => (
          <div
            key={community.id}
            onClick={() => navigate(`/app/community/${community.name}`)}
            className="flex items-center gap-3 p-2.5 rounded-lg transition-all group text-xs cursor-pointer hover:bg-red-50/50 hover:border-[#820000]/30 border border-transparent"
          >
            <CircleIcon bgColor="bg-[#820000]" text={community.name.charAt(0).toUpperCase()} />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-semibold truncate transition-colors text-gray-900 group-hover:text-[#820000]">
                r/{community.name}
              </span>
              <span className="text-xs font-medium text-gray-500">
                Community you may know
              </span>
            </div>
          </div>
        ))}

        {popularCommunities.length === 0 && (
          <p className="text-xs text-center py-4 font-medium text-gray-400">No popular communities</p>
        )}
      </div>

      <Link to="/app/communities">
        <button className="w-full text-xs px-3 py-2.5 rounded-lg font-semibold transition-all duration-200 bg-[#820000] text-white hover:shadow-xl hover:bg-red-700 hover:-translate-y-0.5">
          Explore All
        </button>
      </Link>
    </div>
  );
};

export default PopularCommunitiesCard;
