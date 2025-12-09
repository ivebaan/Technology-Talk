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
    <div className="w-full min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-pink-300" />
          <div>
            <h2 className="text-2xl font-bold">
              {currentUser?.username || currentUser?.displayName || "User"}
            </h2>
            {currentUser?.email && (
              <p className="text-gray-500">{currentUser.email}</p>
            )}
          </div>
        </div>

        {/* Tabs */}

        <div className="flex gap-6 border-b pb-2 text-gray-600 font-medium">
          {["Posts", "Communities", "Comments", "Saved"].map((tab) => (
            <button
              key={tab}
              className={
                (activeTab === tab
                  ? "text-black border-b-2 border-black pb-2"
                  : "") + " px-2 py-1"
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "Posts" &&
            (posts.length === 0 ? (
              <div className="flex flex-col items-center mt-20 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  You don't have any posts yet
                </h2>
                <p className="text-gray-600 max-w-md">
                  Once you post to a community, it'll show up here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border rounded-lg p-4 bg-gradient-to-br from-[#f6d365] to-[#fda085] shadow-lg flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-xl mb-1 text-[#820000]">
                        {post.title}
                      </h3>
                      <span className="bg-[#820000] text-white px-2 py-1 rounded text-xs font-medium">
                        {post.community?.name}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-2">{post.content}</p>
                    <div className="flex gap-4 items-center text-xs">
                      <span className="text-gray-500">Votes: {post.votes}</span>
                      <span className="text-gray-500">
                        Comments: {post.comments || 0}
                      </span>
                      <span className="text-gray-500">
                        Created: {post.dateCreated?.slice(0, 10)}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        onClick={() => navigate(`/app/post/${post.id}/edit`)}
                      >
                        <span className="font-semibold">Edit</span>
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                        onClick={async () => {
                          try {
                            await deletePost(post.id);
                            setPosts((prev) =>
                              prev.filter((p) => p.id !== post.id)
                            );
                          } catch (err) {
                            alert("Failed to delete post.");
                          }
                        }}
                      >
                        <span className="font-semibold">Delete</span>
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-100 text-[#820000] rounded-lg shadow hover:bg-gray-200 transition font-semibold"
                        onClick={() => navigate(`/app/post/${post.id}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}

          {activeTab === "Communities" &&
            (communities.length === 0 ? (
              <div className="text-gray-500 mt-10">No joined communities.</div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-2">
                {communities.map((c) => (
                  <div
                    key={c.communityId}
                    className="bg-gradient-to-br from-[#f6d365] to-[#fda085] p-4 rounded-lg shadow flex flex-col items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#820000] text-white flex items-center justify-center text-lg font-bold mb-2">
                      {c.name[0]}
                    </div>
                    <div className="font-semibold text-[#820000]">{c.name}</div>
                  </div>
                ))}
              </div>
            ))}

          {activeTab === "Comments" &&
            (comments.length === 0 ? (
              <div className="text-gray-500 mt-10">No comments made yet.</div>
            ) : (
              <div className="space-y-4 mt-2">
                {comments.map((comment) => (
                  <div
                    key={comment.commentId}
                    className="border rounded-lg p-4 bg-gradient-to-br from-[#f6d365] to-[#fda085] shadow flex flex-col cursor-pointer"
                    onClick={() => navigate(`/app/post/${comment.post?.id}`)}
                  >
                    <div className="font-semibold text-[#820000] mb-1">
                      On post: {comment.post?.title || comment.post?.id}
                    </div>
                    <div className="text-gray-800 mb-2">{comment.content}</div>
                    <div className="text-xs text-gray-500">
                      {comment.dateCommented?.replace("T", " ").slice(0, 16)}
                    </div>
                  </div>
                ))}
              </div>
            ))}

          {activeTab === "Saved" &&
            (favorites.length === 0 ? (
              <div className="text-gray-500 mt-10">No saved posts.</div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {favorites.map((fav) => (
                  <div
                    key={fav.favoriteId}
                    className="border rounded-lg p-4 bg-gradient-to-br from-[#f6d365] to-[#fda085] shadow cursor-pointer flex flex-col"
                    onClick={() => navigate(`/app/post/${fav.post?.id}`)}
                  >
                    <h3 className="font-semibold text-lg mb-1 text-[#820000]">
                      {fav.post?.title}
                    </h3>
                    <p className="text-gray-800 mb-2">{fav.post?.content}</p>
                    <span className="text-xs text-gray-500">
                      Votes: {fav.post?.votes}
                    </span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
