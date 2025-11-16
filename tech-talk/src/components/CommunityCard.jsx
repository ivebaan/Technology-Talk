import React from "react";

const CommunityCard = ({ name, members, description, category }) => (
  <div className="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
    <h3 className="font-bold text-maroon-800 mb-1">{name}</h3>
    <p className="text-sm text-gray-500 mb-2">{members} members</p>
    <p className="text-gray-700 mb-3">{description}</p>
    <div className="flex justify-between items-center mb-2">
      <div className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
        {category}
      </div>
      <button className="px-4 py-2 rounded-full bg-[#820000] text-white text-sm hover:bg-red-300 transition cursor-pointer font-bold">
        Join now
      </button>
    </div>
  </div>
);

export default CommunityCard;
