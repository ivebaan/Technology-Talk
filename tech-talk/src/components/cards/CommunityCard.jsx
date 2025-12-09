import React from "react";

const CommunityCard = ({
  name,
  description,
  category,
  communityId,
  isJoined,
  onJoin,
}) => {
  const CircleIcon = ({ bgColor, text }) => (
    <div
      className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm`}
    >
      {text}
    </div>
  );

  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3 mb-3">
        <CircleIcon
          bgColor="bg-[#820000]"
          text={name ? name[0].toUpperCase() : "?"}
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-[#820000] text-lg">{name}</h3>
          {/* <p className="text-sm text-gray-500">{members}</p> */}
        </div>
      </div>

      <p className="text-gray-700 mb-3">{description}</p>

      <div className="flex justify-between items-center">
        <div className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
          {category?.name}
        </div>
        <button
          className={`px-3 py-2 rounded-full text-white text-sm font-bold transition cursor-pointer ${
            isJoined
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#820000] hover:bg-red-700"
          }`}
          onClick={() => !isJoined && onJoin && onJoin(communityId)}
          disabled={isJoined}
        >
          {isJoined ? "Joined" : "Join now"}
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;
