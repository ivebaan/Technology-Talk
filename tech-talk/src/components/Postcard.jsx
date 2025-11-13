import React from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaBookmark } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

function Postcard({ post, handleVote, handleThreeDots, openDropdown }) {
  return (
    <div
      key={post.id}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 relative"
    >
      {/* Top info */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-gray-800">{post.author}</span>
          {post.verified && (
            <span className="flex items-center text-green-600 text-xs rounded-full px-2 py-[1px]">
              ✔ Verified
            </span>
          )}
          <span className="text-gray-400">• 17 days ago</span>
        </div>

        <div className="relative">
          <button
            onClick={(e) => handleThreeDots(e, post.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <HiDotsHorizontal size={18} />
          </button>

          {openDropdown === post.id && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Edit</button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Delete</button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Save Post</button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-[17px] font-semibold text-gray-900 mb-1">{post.title}</h2>

      {/* Content */}
      <p className="text-gray-700 text-[15px] mb-3">{post.content}</p>

      {/* Category tag */}
      <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mb-3">
        {post.community}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 text-gray-600 text-sm">
        <div
          className={`flex items-center px-3 py-1 rounded-full transition-colors duration-200 text-white ${
            post.voteStatus === "up"
              ? "bg-green-800"
              : post.voteStatus === "down"
              ? "bg-red-800"
              : "bg-gray-500 hover:bg-gray-300"
          }`}
        >
          <button
            onClick={() => handleVote(post.id, "up")}
            className={`transition-colors ${
              post.voteStatus === "up" ? "text-green-400" : "hover:text-[#00c52b]"
            }`}
          >
            <FaThumbsUp />
          </button>

          <span className="mx-2 font-medium">{post.votes}</span>

          <button
            onClick={() => handleVote(post.id, "down")}
            className={`transition-colors ${
              post.voteStatus === "down" ? "text-red-400" : "hover:text-[#820000]"
            }`}
          >
            <FaThumbsDown />
          </button>
        </div>

        <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
          <FaCommentAlt /> <span>{post.comments}</span>
        </button>

        <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
          <FaBookmark /> <span>Favorite</span>
        </button>
      </div>
    </div>
  );
}

export default Postcard;
