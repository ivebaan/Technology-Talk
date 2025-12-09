import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  getUserPosts,
  getJoinedCommunities,
  getAllFavorites,
  deletePost,
} from "../api/api";
import { getUserComments } from "../api/userComments";
import { useNavigate } from "react-router-dom";
import ProfilePostCard from "../components/cards/ProfilePostCard";
import ProfileCommunityCard from "../components/cards/ProfileCommunityCard";
import ProfileCommentCard from "../components/cards/ProfileCommentCard";
import ProfileSavedCard from "../components/cards/ProfileSavedCard";

function Profile() {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("Posts");
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
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 py-4 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 bg-white rounded-lg p-4 border border-gray-200">
          <div className="w-12 h-12 rounded-full bg-[#820000] text-white flex items-center justify-center font-bold text-lg" >
            {(currentUser?.username || currentUser?.displayName || "U")[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold">
              {currentUser?.username || currentUser?.displayName || "User"}
            </h2>
            {currentUser?.email && (
              <p className="text-gray-500 text-xs">{currentUser.email}</p>
            )}
          </div>
        </div>

      <div className="flex gap-4 bg-white rounded-lg p-3 border border-gray-200">
        {["Posts", "Communities", "Comments", "Saved"].map((tab) => (
          <button
            key={tab}
            className={`text-xs font-semibold px-3 py-1 rounded transition-all ${
              activeTab === tab
                ? "bg-[#820000] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "Posts" &&
            (posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">You haven't posted yet</p>
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
                      } catch (err) {
                        alert("Failed to delete post.");
                      }
                    }}
                  />
                ))}
              </div>
            ))}

          {activeTab === "Communities" &&
            (communities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No joined communities</p>
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
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No comments made yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <ProfileCommentCard key={comment.commentId} comment={comment} />
                ))}
              </div>
            ))}

          {activeTab === "Saved" &&
            (favorites.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No saved posts</p>
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
    </div>
  );
}

export default Profile;
