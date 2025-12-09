import React, { useEffect, useState } from "react";
import { FaCommentAlt, FaCheckCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getCommentsCountForPost } from "../../api/postComments";
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
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-[#820000] transition-all duration-200 p-4 cursor-pointer group"
      onClick={() => navigate(`/app/post/${post.id}`)}
    >
      {/* Header: Author & Three-dots */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-800">
            {post.createdBy?.displayName ||
              post.createdBy?.username ||
              "Unknown"}
          </span>
          {post.createdBy?.verified && (
            <span className="text-green-600 text-xs">
              <FaCheckCircle size={12} />
            </span>
          )}
        </div>

        {/* Three-dots dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleThreeDots(e, post.id);
            }}
            className="text-gray-400 hover:text-[#820000] transition-colors p-1"
          >
            <HiDotsHorizontal size={16} />
          </button>

          {openDropdown === post.id && (
            <div
              className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="block w-full text-left px-3 py-2 text-xs hover:bg-red-50 hover:text-[#820000] transition-colors font-medium">
                Edit
              </button>
              <button className="block w-full text-left px-3 py-2 text-xs hover:bg-red-50 hover:text-[#820000] transition-colors font-medium">
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToFavorites(post.id);
                }}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-red-50 hover:text-[#820000] transition-colors font-medium"
              >
                <span className={isFavorite ? "text-yellow-500" : "text-gray-600"}>
                  ★
                </span>
                {isFavorite ? " Saved" : " Save"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Title & Content */}
      <h2 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-[#820000] transition-colors line-clamp-2">
        {post.title}
      </h2>
      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
        {post.content}
      </p>

      {/* Community Badge */}
      <div className="inline-block bg-[#820000] text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-3">
        r/{post.community?.name || "Uncategorized"}
      </div>

      {/* Actions: Votes, Comments, Favorites */}
      <div className="flex items-center gap-2 text-gray-600 text-xs">
        {/* Votes */}
        <VoteButton
          votes={post.votes || 0}
          voteStatus={post.voteStatus || null}
          onUpVote={() => handleVote(post.id, "up")}
          onDownVote={() => handleVote(post.id, "down")}
        />

        {/* Comments */}
        <button
          className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 transition-all font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/app/post/${post.id}`);
          }}
        >
          <FaCommentAlt size={12} />
          <span>{commentCount}</span>
        </button>

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
