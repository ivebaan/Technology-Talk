import React, { useEffect, useState, useContext } from "react";
import {
  getAllCommunities,
  getAllPosts,
  getAllFavorites,
  addToFavorites,
  deleteFavoriteById,
  votePost,
} from "../api/api";
import { UserContext } from "../context/UserContext";

import Postcard from "../components/cards/Postcard";
import PopularCommunitiesCard from "../components/cards/PopularCommunitiesCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { currentUser } = useContext(UserContext);
  const userId = currentUser?.id || currentUser?.userId;

  // Fetch Data
  const fetchAllData = async () => {
    try {
      const [communityRes, postsRes, favRes] = await Promise.all([
        getAllCommunities(),
        getAllPosts(),
        getAllFavorites(),
      ]);

      setCommunities(communityRes.data);

      const normalizedPosts = postsRes.data
        .map((post) => ({
          ...post,
          voteStatus: null,
        }))
        .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

      setPosts(normalizedPosts);

      const userFavorites = favRes.data
        .filter((fav) => fav.post && fav.user?.id === userId)
        .map((fav) => fav.post.id);

      setFavorites(userFavorites);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [userId]);

  const handleVote = async (postId, type) => {
    if (!userId) {
      console.warn("No userId found");
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
          }

          if (type === "down") {
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

  
    try {
      const response = await votePost(postId, type, userId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, votes: response.data.votes } : post
        )
      );
    } catch (err) {
      console.error("Vote sync failed:", err);
      console.error("Error status:", err.response?.status);
      console.error("Error data:", err.response?.data);
      console.error("Error message:", err.message);

      setPosts(oldPosts);
    }
  };

  const handleThreeDots = (e, id) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleAddToFavorites = async (postId) => {
    try {
      if (!userId) return;

      const isFavorite = favorites.includes(postId);

      if (isFavorite) {
        const favRes = await getAllFavorites();

        const favItem = favRes.data.find(
          (f) => f.post?.postId === postId && f.user?.id === userId
        );

        if (favItem) {
          await deleteFavoriteById(favItem.favoriteId);
        }
      } else {
        await addToFavorites(postId, userId);
      }

      const updatedFavs = await getAllFavorites();

      const updatedUserFavorites = updatedFavs.data
        .filter((fav) => fav.post && fav.user?.id === userId)
        .map((fav) => fav.post.postId);

      setFavorites(updatedUserFavorites);
    } catch (err) {
      console.error("Favorite update failed:", err);
    }
  };

  const [sortBy, setSortBy] = useState("new");

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "new") {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    } else if (sortBy === "hot") {
      return (b.votes || 0) - (a.votes || 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen py-4 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 flex gap-6">
        <main className="flex-1 space-y-3">
          <div className="flex gap-2 mb-4 rounded-lg p-3 bg-white border border-gray-200">
            <button
              onClick={() => setSortBy("new")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sortBy === "new"
                  ? "bg-[#820000] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              New
            </button>
            <button
              onClick={() => setSortBy("hot")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sortBy === "hot"
                  ? "bg-[#820000] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Hot
            </button>
          </div>

          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <Postcard
                key={post.id}
                post={post}
                handleVote={handleVote}
                handleThreeDots={handleThreeDots}
                handleAddToFavorites={handleAddToFavorites}
                isFavorite={favorites.includes(post.id)}
                openDropdown={openDropdown}
              />
            ))
          ) : (
            <div className="rounded-xl p-8 text-center border shadow-md bg-gradient-to-br from-white to-gray-50 border-gray-200">
              <p className="font-medium text-base text-gray-500">
                No posts yet
              </p>
            </div>
          )}
        </main>

        <aside className="w-80 flex-shrink-0">
          <div className="sticky top-4">
            <PopularCommunitiesCard communities={communities} />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
