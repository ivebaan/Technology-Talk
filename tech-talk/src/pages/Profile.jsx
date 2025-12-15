import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  getUserPosts,
  getJoinedCommunities,
  getAllFavorites,
  deletePost,
  updateComment,
  deleteComment,
} from "../api/api";
import { getUserComments } from "../api/api";
import { useNavigate } from "react-router-dom";
import ProfilePostCard from "../components/cards/ProfilePostCard";
import ProfileCommunityCard from "../components/cards/ProfileCommunityCard";
import ProfileCommentCard from "../components/cards/ProfileCommentCard";
import ProfileSavedCard from "../components/cards/ProfileSavedCard";
import Popup from "../components/cards/Popup";

function Profile() {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("Posts");
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      getUserPosts(currentUser.id)
        .then((res) => setPosts(res.data))
        .catch(() => setPosts([]));
      getJoinedCommunities(currentUser.id)
        .then((res) => setCommunities(res.data.map((j) => j.community)))
        .catch(() => setCommunities([]));
      getUserComments(currentUser.id)
        .then((data) => setComments(data))
        .catch(() => setComments([]));
      getAllFavorites()
        .then((res) =>
          setFavorites(
            res.data.filter((f) => f.user && f.user.userId === currentUser.id)
          )
        )
        .catch(() => setFavorites([]));
    }
  }, [currentUser]);

  return (
    <div className="w-full min-h-screen py-4 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="rounded-xl mb-6 overflow-hidden border bg-white border-gray-200">
          {/* Cover Image */}
          <div className="h-25 bg-gradient-to-r bg-red-400 opacity-20"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6 relative -mt-12">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-2xl text-white border-4 bg-[#820000] border-white">
                {(currentUser?.username ||
                  currentUser?.displayName ||
                  "U")[0].toUpperCase()}
              </div>
              <div className="flex-1 pb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  @{currentUser?.displayName || currentUser?.username || "User"}
                </h1>
                {currentUser?.email && (
                  <p className="text-sm mb-4 text-gray-600">
                    {currentUser.email}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-sm border-t pt-4 border-gray-200">
              <div>
                <span className="font-bold text-lg text-[#820000]">
                  {posts.length}
                </span>
                <span className="text-xs ml-1 text-gray-600">Posts</span>
              </div>
              <div>
                <span className="font-bold text-lg text-[#820000]">
                  {communities.length}
                </span>
                <span className="text-xs ml-1 text-gray-600">Communities</span>
              </div>
              <div>
                <span className="font-bold text-lg text-[#820000]">
                  {comments.length}
                </span>
                <span className="text-xs ml-1 text-gray-600">Comments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-20 z-10 rounded-lg p-3 mb-4 border bg-white border-gray-200">
          <div className="flex gap-2 overflow-x-auto">
            {["Posts", "Communities", "Comments", "Saved"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#820000] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "Posts" &&
            (posts.length === 0 ? (
              <div className="text-center py-12 rounded-lg bg-gray-100">
                <h3 className="font-bold text-lg mb-1 text-gray-900">
                  No posts yet
                </h3>
                <p className="text-sm text-gray-600">
                  Start sharing your thoughts with the community
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <ProfilePostCard
                    key={post.id}
                    post={post}
                    onEdit={(id) => navigate(`/app/post/${id}/edit`)}
                    onDelete={async (id) => {
                      try {
                        await deletePost(id);
                        setPosts((prev) => prev.filter((p) => p.id !== id));
                        setPopup({ message: "Post deleted", type: "success" });
                      } catch (err) {
                        setPopup({
                          message: "Failed to delete post.",
                          type: "error",
                        });
                      }
                    }}
                  />
                ))}
              </div>
            ))}

          {activeTab === "Communities" &&
            (communities.length === 0 ? (
              <div className="text-center py-12 rounded-lg bg-gray-100">
                <h3 className="font-bold text-lg mb-1 text-gray-900">
                  No joined communities
                </h3>
                <p className="text-sm text-gray-600">
                  Join communities to start engaging with others
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {communities.map((c) => (
                  <ProfileCommunityCard key={c.communityId} community={c} />
                ))}
              </div>
            ))}

          {activeTab === "Comments" &&
            (comments.length === 0 ? (
              <div className="text-center py-12 rounded-lg bg-gray-100">
                <h3 className="font-bold text-lg mb-1 text-gray-900">
                  No comments yet
                </h3>
                <p className="text-sm text-gray-600">
                  Start commenting on posts to join the discussion
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <ProfileCommentCard
                    key={comment.commentId}
                    comment={comment}
                    onDelete={async (id) => {
                      try {
                        await deleteComment(id);
                        setComments((prev) =>
                          prev.filter((c) => c.commentId !== id)
                        );
                        setPopup({
                          message: "Comment deleted",
                          type: "success",
                        });
                        setTimeout(() => setPopup(null), 2000);
                      } catch (err) {
                        console.error("Delete error:", err);
                        setPopup({
                          message: "Failed to delete comment.",
                          type: "error",
                        });
                        setTimeout(() => setPopup(null), 2000);
                      }
                    }}
                    onEdit={async (id, newContent) => {
                      try {
                        // Find the comment to get full data
                        const commentToUpdate = comments.find(
                          (c) => c.commentId === id
                        );
                        if (!commentToUpdate) {
                          throw new Error("Comment not found");
                        }

                        // Send complete comment data with updated content
                        const payload = {
                          content: newContent,
                          post: commentToUpdate.post,
                          user: commentToUpdate.user,
                          dateCommented: commentToUpdate.dateCommented,
                        };

                        setComments((prev) =>
                          prev.map((c) =>
                            c.commentId === id
                              ? { ...c, content: newContent }
                              : c
                          )
                        );
                        setPopup({
                          message: "Comment updated",
                          type: "success",
                        });
                        setTimeout(() => setPopup(null), 2000);
                      } catch (err) {
                        console.error("Edit error:", err);
                        setPopup({
                          message: "Failed to update comment.",
                          type: "error",
                        });
                        setTimeout(() => setPopup(null), 2000);
                      }
                    }}
                  />
                ))}
              </div>
            ))}

          {activeTab === "Saved" &&
            (favorites.length === 0 ? (
              <div className="text-center py-12 rounded-lg bg-gray-100">
                <h3 className="font-bold text-lg mb-1 text-gray-900">
                  No saved posts
                </h3>
                <p className="text-sm text-gray-600">
                  Save posts to revisit them later
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {favorites.map((fav) => (
                  <ProfileSavedCard key={fav.favoriteId} favorite={fav} />
                ))}
              </div>
            ))}
        </div>
      </div>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}

export default Profile;
