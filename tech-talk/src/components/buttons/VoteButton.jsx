import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function VoteButton({
  votes = 0,
  voteStatus = null,
  onUpVote,
  onDownVote,
  disabled = false,
}) {
  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 text-sm font-semibold ${
        voteStatus === "up"
          ? "bg-green-100 text-green-700"
          : voteStatus === "down"
          ? "bg-red-100 text-[#820000]"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          !disabled && onUpVote?.();
        }}
        disabled={disabled}
        className="p-1 hover:scale-110 transition-transform"
        title="Upvote"
      >
        <FaThumbsUp size={12} />
      </button>

      <span className="mx-1 min-w-[1.5rem] text-center text-xs font-bold">
        {votes}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          !disabled && onDownVote?.();
        }}
        disabled={disabled}
        className="p-1 hover:scale-110 transition-transform"
        title="Downvote"
      >
        <FaThumbsDown size={12} />
      </button>
    </div>
  );
}
