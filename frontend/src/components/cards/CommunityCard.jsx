import React from "react";
import { useNavigate } from "react-router-dom";

const CommunityCard = ({
  name,
  description,
  category,
  communityId,
  isJoined,
  onJoin,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (name) navigate(`/app/community/${name}`);
  };

  const CircleIcon = ({ bgColor, text }) => (
    <div
      className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}
    >
      {text}
    </div>
  );

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-200 p-3 rounded-lg hover:border-[#820000] hover:shadow-sm transition cursor-pointer"
    >
      <div className="flex items-start gap-2 mb-2">
        <CircleIcon
          bgColor="bg-[#820000]"
          text={name ? name[0].toUpperCase() : "?"}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#820000] text-sm line-clamp-1">{name}</h3>
          {/* <p className="text-xs text-gray-500">{members}</p> */}
        </div>
      </div>

      <p className="text-gray-600 text-xs mb-2 line-clamp-2">{description}</p>

      <div className="flex justify-between items-center gap-2">
        <div className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded flex-shrink-0">
          {category?.name}
        </div>
        <button
          className={`px-2 py-1 rounded text-white text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            isJoined
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#820000] hover:bg-red-700"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isJoined && onJoin) onJoin(communityId);
          }}
          disabled={isJoined}
        >
          {isJoined ? "Joined" : "Join"}
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;
