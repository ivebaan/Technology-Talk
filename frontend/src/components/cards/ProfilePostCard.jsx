import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePostCard = ({ post, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async (e) => {
    e.stopPropagation();
    if (onDelete) await onDelete(post.id);
    setConfirmDelete(false);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setConfirmDelete(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start gap-3 mb-2">
        <h3 className="text-sm font-semibold text-gray-900 flex-1 line-clamp-2">
          {post.title}
        </h3>
        <span className="bg-[#820000] text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
          {post.community?.name}
        </span>
      </div>
      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{post.content}</p>
      <div className="flex gap-3 text-xs text-gray-500 mb-3">
        <span>Votes: {post.votes}</span>
        <span>Comments: {post.comments || 0}</span>
      </div>
      <div className="flex gap-2">
        <button
          className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
          onClick={() => onEdit(post.id)}
        >
          Edit
        </button>

        {!confirmDelete ? (
          <button
            className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        ) : (
          <>
            <button
              className="px-2 py-1 text-xs bg-gray-100 rounded"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 text-xs bg-red-600 text-white rounded"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </>
        )}

        <button
          className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
          onClick={() => navigate(`/app/post/${post.id}`)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ProfilePostCard;
