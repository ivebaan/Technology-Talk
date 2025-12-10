import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCommentCard = ({ comment, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(comment.content || "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async (e) => {
    e.stopPropagation();
    if (onDelete) await onDelete(comment.commentId);
    setConfirmDelete(false);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setConfirmDelete(false);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    if (onEdit) await onEdit(comment.commentId, value);
    setEditing(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setEditing(false);
    setValue(comment.content || "");
  };

  return (
    <div
      onClick={() => navigate(`/app/post/${comment.post?.id}`)}
      className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-[#820000] hover:shadow-sm transition relative"
    >
      <div className="absolute top-2 right-2 flex gap-2">
        {!editing && !confirmDelete && (
          <>
            <button
              onClick={handleEditClick}
              className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </>
        )}

        {confirmDelete && (
          <>
            <button
              onClick={handleCancelDelete}
              className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </>
        )}
      </div>

      <div className="text-xs font-semibold text-[#820000] mb-1 line-clamp-1">
        {comment.post?.title || "Unknown Post"}
      </div>

      {editing ? (
        <div className="space-y-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
            rows={3}
          />
          <div className="flex gap-2 justify-end">
            <button onClick={handleCancel} className="px-2 py-1 text-xs bg-gray-100 rounded">
              Cancel
            </button>
            <button onClick={handleSave} className="px-2 py-1 text-xs bg-[#820000] text-white rounded">
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-700 mb-2 line-clamp-2">{comment.content}</p>
          <div className="text-xs text-gray-400">{comment.dateCommented?.replace("T", " ").slice(0, 16)}</div>
        </>
      )}
    </div>
  );
};

export default ProfileCommentCard;
