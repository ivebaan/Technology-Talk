import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileCommentCard = ({ comment }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/app/post/${comment.post?.id}`)}
      className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-[#820000] hover:shadow-sm transition"
    >
      <div className="text-xs font-semibold text-[#820000] mb-1 line-clamp-1">
        On: {comment.post?.title || "Unknown Post"}
      </div>
      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
        {comment.content}
      </p>
      <div className="text-xs text-gray-400">
        {comment.dateCommented?.replace("T", " ").slice(0, 16)}
      </div>
    </div>
  );
};

export default ProfileCommentCard;
