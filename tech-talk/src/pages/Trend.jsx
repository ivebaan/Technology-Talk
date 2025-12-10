import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Postcard from "../components/cards/Postcard";
import {
  getAllFavorites,
  addToFavorites,
  deleteFavoriteById,
  votePost,
} from "../api/api";
import { UserContext } from "../context/UserContext";
import Popup from "../components/Popup";

function Trend() {
  const [posts, setPosts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
    const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  // Get logged-in user from context
  const { currentUser } = useContext(UserContext);
  const userId = currentUser?.id || currentUser?.userId;

  useEffect(() => {
    const fetchPostsAndFavorites = async () => {
      try {
        const [postsRes, favRes] = await Promise.all([
          axios.get("http://localhost:8081/posts/getAll"),
          userId ? getAllFavorites() : Promise.resolve({ data: [] }),
        ]);

        setPosts(postsRes.data);

        // Fetch user's favorites if logged in
        if (userId && favRes.data) {
          const userFavs = favRes.data
            .filter((f) => f.post && f.user?.id === userId)
            .map((f) => f.post.id);
          setFavoriteIds(userFavs);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPostsAndFavorites();
  }, [userId]);

  const handleVote = async (postId, type) => {
    if (!userId) {
      console.warn("⚠️ No userId found");
      return;
    }

    const oldPosts = posts;

    // Instant UI update
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          let newVotes = post.votes || 0;
          if (type === "up") {
            if (post.voteStatus === "up") {
              newVotes -= 1;
              return { ...post, votes: newVotes, voteStatus: null };
            }
            newVotes += post.voteStatus === "down" ? 2 : 1;
            return { ...post, votes: newVotes, voteStatus: "up" };
          } else if (type === "down") {
            if (post.voteStatus === "down") {
              newVotes += 1;
              return { ...post, votes: newVotes, voteStatus: null };
            }
            newVotes -= post.voteStatus === "up" ? 2 : 1;
            return { ...post, votes: newVotes, voteStatus: "down" };
          }
        }
        return post;
      })
    );

    // Sync with backend
    try {
      const response = await votePost(postId, type, userId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, votes: response.data.votes } : post
        )
      );
    } catch (err) {
      console.error("❌ Vote sync failed:", err);
      setPosts(oldPosts);
    }
  };

  const handleThreeDots = (e, id) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleAddToFavorites = async (postId) => {
    if (!userId) return;

    try {
      const isFav = favoriteIds.includes(postId);
      if (isFav) {
        const favRes = await getAllFavorites();
        const favItem = favRes.data.find(
          (f) => f.post?.id === postId && f.user?.id === userId
        );
        if (favItem) {
          await deleteFavoriteById(favItem.favoriteId);
          setFavoriteIds((prev) => prev.filter((id) => id !== postId));
                  setPopup({ message: "Post removed from favorites!", type: "success" });
        }
      } else {
        await addToFavorites(postId, userId);
        setFavoriteIds((prev) => [...prev, postId]);
        setPopup({ message: "Post added to favorites!", type: "success" });
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
      setPopup({ message: "Failed to update favorites.", type: "error" });
    }
  };

  const handleNavigateToCommunity = (communityName) => {
    navigate(`/app/community/${communityName}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4">
      <div className="max-w-2xl mx-auto px-4 space-y-3">
        {/* Trending Posts */}
        <section className="space-y-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Postcard
                key={post.id}
                post={post}
                handleVote={handleVote}
                handleThreeDots={handleThreeDots}
                handleAddToFavorites={handleAddToFavorites}
                isFavorite={favoriteIds.includes(post.id)}
                openDropdown={openDropdown}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
              <p className="text-gray-500 font-medium">No posts</p>
            </div>
          )}
        </section>

        {/* Recent Posts */}
        {posts.length > 0 && (
          <section className="mt-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Recent</h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
              {posts
                .slice()
                .reverse()
                .slice(0, 5)
                .map((post) => (
                  <div
                    key={post.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors text-xs"
                  >
                    <span
                      onClick={() =>
                        handleNavigateToCommunity(post.community?.name)
                      }
                      className="text-[#820000] font-semibold hover:underline"
                    >
                      r/{post.community?.name || "Unknown"}
                    </span>
                    <h3
                      onClick={() => navigate(`/app/post/${post.id}`)}
                      className="text-gray-900 font-semibold hover:text-[#820000] transition-colors truncate"
                    >
                      {post.title}
                    </h3>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
   
  );

        {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
}

export default Trend;
