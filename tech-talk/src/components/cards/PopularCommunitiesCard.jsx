import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PopularCommunitiesCard = ({ communities }) => {
  const navigate = useNavigate();
  const popularCommunities = communities.filter((c) => c.members > 1000);

  const CircleIcon = ({ bgColor, text }) => (
    <div className={`${bgColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs hover:scale-110 transition-transform`}>
      {text}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full border border-gray-200 hover:border-[#820000] transition-all">
      <h2 className="font-bold text-sm text-gray-900 mb-3">Popular Communities</h2>

      <div className="flex flex-col gap-2 mb-4 max-h-64 overflow-y-auto">
        {popularCommunities.map((community) => (
          <div
            key={community.id}
            onClick={() => navigate(`/app/community/${community.name}`)}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer transition-all group text-xs"
          >
            <CircleIcon bgColor="bg-[#820000]" text={community.name.charAt(0).toUpperCase()} />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-semibold text-gray-900 group-hover:text-[#820000] transition-colors truncate">
                r/{community.name}
              </span>
              <span className="text-gray-500 text-xs">
                {community.members || 0} members
              </span>
            </div>
          </div>
        ))}

        {popularCommunities.length === 0 && (
          <p className="text-gray-500 text-xs text-center py-2">No popular communities</p>
        )}
      </div>

      <Link to="/app/communities">
        <button className="w-full bg-[#820000] text-white text-xs px-3 py-2 rounded hover:shadow-md transition-all font-semibold">
          Explore All
        </button>
      </Link>
    </div>
  );
};

export default PopularCommunitiesCard;
