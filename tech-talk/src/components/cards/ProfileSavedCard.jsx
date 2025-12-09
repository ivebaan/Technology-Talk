import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileSavedCard = ({ favorite }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/app/post/${favorite.post?.id}`)}
      className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-[#820000] hover:shadow-sm transition"
    >
      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
        {favorite.post?.title}
      </h3>
      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
        {favorite.post?.content}
      </p>
      <span className="text-xs text-gray-500">
        Votes: {favorite.post?.votes}
      </span>
    </div>
  );
};

export default ProfileSavedCard;
