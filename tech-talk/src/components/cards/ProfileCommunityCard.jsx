import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileCommunityCard = ({ community }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/app/community/${community.communityId}`)}
      className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center text-center cursor-pointer hover:border-[#820000] hover:shadow-sm transition"
    >
      <div className="w-10 h-10 rounded-full bg-[#820000] text-white flex items-center justify-center font-bold text-sm mb-2">
        {community.name?.[0]?.toUpperCase()}
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{community.name}</h3>
      {community.description && (
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
          {community.description}
        </p>
      )}
    </div>
  );
};

export default ProfileCommunityCard;
