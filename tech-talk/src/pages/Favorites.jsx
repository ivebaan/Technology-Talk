import React, { useState, useEffect, useContext } from "react";
import Postcard from "../components/cards/Postcard";
import {
  getAllFavorites,
  getAllPosts,
  addToFavorites,
  deleteFavoriteById,
  votePost,
} from "../api/api";
import { UserContext } from "../context/UserContext";
import { BookmarkIcon } from "@heroicons/react/24/solid";

function Favorites() {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Get logged-in user from context
  const { currentUser } = useContext(UserContext);
  const userId = currentUser?.id || currentUser?.userId;

  useEffect(() => {
    const fetchFavoritesAndPosts = async () => {
      if (!userId) {
        console.warn("No userId found");
        return;
      }

      try {
        const [postsRes, favRes] = await Promise.all([
          getAllPosts(),
          getAllFavorites(),
        ]);

        // Get all posts
        const allPosts = postsRes.data;

        // Filter favorites for current user
        const userFavs = favRes.data
          .filter((f) => f.post && f.user?.id === userId)
          .map((f) => f.post.id);

        setFavoriteIds(userFavs);

        // Get only the favorited posts
        const favPosts = allPosts.filter((post) => userFavs.includes(post.id));
        setFavoritePosts(favPosts);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavoritesAndPosts();
  }, [userId]);

  const handleThreeDots = (e, id) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleAddToFavorites = async (postId) => {
    if (!userId) return;

    try {
      const isFav = favoriteIds.includes(postId);
      if (isFav) {
        // Remove favorite
        const favRes = await getAllFavorites();
        const favItem = favRes.data.find(
          (f) => f.post?.id === postId && f.user?.id === userId
        );
        if (favItem) {
          await deleteFavoriteById(favItem.favoriteId);
          setFavoriteIds((prev) => prev.filter((id) => id !== postId));
          setFavoritePosts((prev) => prev.filter((post) => post.id !== postId));
        }
      } else {
        // Add favorite
        await addToFavorites(postId, userId);
        setFavoriteIds((prev) => [...prev, postId]);
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  const handleVote = async (postId, type) => {
    if (!userId) {
      console.warn("No userId found");
      return;
    }

    // Store old posts in case we need to revert
    const oldPosts = favoritePosts;

    // Instant UI update
    setFavoritePosts((prevPosts) =>
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
      setFavoritePosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, votes: response.data.votes } : post
        )
      );
    } catch (err) {
      console.error("Vote sync failed:", err);
      // Revert on error
      setFavoritePosts(oldPosts);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-4">
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h1 className="text-lg font-bold text-gray-900 mb-1">Saved Posts</h1>
          <p className="text-gray-600 text-xs">
            {favoritePosts.length === 0
              ? "No saved posts yet"
              : `${favoritePosts.length} saved post${favoritePosts.length === 1 ? "" : "s"}`}
          </p>
        </div>

        {/* Posts */}
        {favoritePosts.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <p className="text-gray-500 text-sm font-medium">No saved posts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoritePosts.map((post) => (
              <Postcard
                key={post.id}
                post={post}
                handleVote={handleVote}
                handleThreeDots={handleThreeDots}
                handleAddToFavorites={handleAddToFavorites}
                isFavorite={favoriteIds.includes(post.id)}
                openDropdown={openDropdown}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
