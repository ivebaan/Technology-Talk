import React, { useEffect, useState, useContext } from "react";
import { FaCommentAlt, FaCheckCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getCommentsCountForPost } from "../../api/api";
import VoteButton from "../buttons/VoteButton";
import FavoriteButton from "../buttons/FavoriteButton";


function Postcard({
  post,
  handleVote,
  handleThreeDots,
  openDropdown,
  handleAddToFavorites = () => {},
  isFavorite,
}) {
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(post.comments || 0);


  useEffect(() => {
    getCommentsCountForPost(post.id).then(setCommentCount);
  }, [post.id]);

  return (
    <div
      className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 cursor-pointer group bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#820000] hover:shadow-xl"
      onClick={() => navigate(`/app/post/${post.id}`)}
    >
      {/* Header: Author with Avatar & Three-dots */}
      <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Author Avatar */}
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm bg-[#820000]">
            {(post.createdBy?.displayName || post.createdBy?.username || "U")
              .charAt(0)
              .toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm truncate text-gray-900">
                {post.createdBy?.displayName ||
                  post.createdBy?.username ||
                  "Unknown"}
              </span>
              {post.createdBy?.verified && (
                <span className="text-blue-400">
                  <FaCheckCircle size={12} />
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {post.dateCreated
                ? new Date(post.dateCreated).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                : 'Just now'}
            </span>
          </div>
        </div>

        {/* Three-dots dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleThreeDots(e, post.id);
            }}
            className="transition-colors p-1 rounded text-gray-400 hover:text-[#820000]"
          >
            <HiDotsHorizontal size={16} />
          </button>

          {openDropdown === post.id && (
            <div
              className="absolute right-0 mt-1 w-40 rounded-lg shadow-lg z-20 bg-white border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="block w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:bg-red-50 text-gray-900 hover:text-[#820000] border-b border-gray-100">
                Edit
              </button>
              <button className="block w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:bg-red-50 text-gray-900 hover:text-[#820000] border-b border-gray-100">
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToFavorites(post.id);
                }}
                className="block w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:bg-red-50 text-gray-900 hover:text-[#820000]"
              >
                <span className={isFavorite ? "text-yellow-500" : "text-gray-600"}>
                  {isFavorite ? "★" : "☆"}
                </span>
                {isFavorite ? " Saved" : " Save"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Title & Content */}
      <h2 className="text-base font-bold mb-2 group-hover:text-red-500 transition-colors line-clamp-2 text-gray-900">
        {post.title}
      </h2>
      <p className="text-sm mb-4 line-clamp-2 leading-normal text-gray-700">
        {post.content}
      </p>

      {/* Post Image Preview */}
      {post.image && (
        <div className="relative mt-3 mb-4 rounded-lg overflow-hidden group/image h-48 bg-gray-200">
          <img
            src={post.image}
            alt="Post preview"
            className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Community Badge & Category */}
      <div className="flex items-center gap-2 mb-4">
        <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#820000] text-white">
          r/{post.community?.name || "Uncategorized"}
        </div>
        {post.community?.category && (
          <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
            {typeof post.community.category === 'string' ? post.community.category : post.community.category?.name}
          </span>
        )}
      </div>

      {/* Actions: Votes, Comments, Favorites */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
          {/* Votes */}
          <VoteButton
            votes={post.votes || 0}
            voteStatus={post.voteStatus || null}
            onUpVote={() => handleVote(post.id, "up")}
            onDownVote={() => handleVote(post.id, "down")}
          />

          {/* Comments */}
          <button
            className="flex items-center gap-1.5 px-2 py-1 rounded transition-all font-semibold hover:text-blue-600 hover:bg-blue-50"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/app/post/${post.id}`);
            }}
          >
            <FaCommentAlt size={12} />
            <span>{commentCount}</span>
          </button>
        </div>

        {/* Favorite */}
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => {
            handleAddToFavorites(post.id);
          }}
          label={false}
          variant="compact"
        />
      </div>
    </div>
  );
}

export default Postcard;
