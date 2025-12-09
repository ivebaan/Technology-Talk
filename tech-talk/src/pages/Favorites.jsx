import React, { useState, useEffect } from "react";
import Postcard from "../components/cards/Postcard";
import {
  getAllFavorites,
  getAllPosts,
  addToFavorites,
  deleteFavoriteById,
} from "../api/api";

function Favorites() {
  const [posts, setPosts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchFavoritesAndPosts = async () => {
      try {
        const [postsRes, favRes] = await Promise.all([
          getAllPosts(),
          getAllFavorites(),
        ]);

        setPosts(postsRes.data);

        const userFavs = favRes.data
          .filter((f) => f.post && f.user?.id === userId)
          .map((f) => f.post.id);

        setFavoriteIds(userFavs);
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
        const favRes = await getAllFavorites();
        const favItem = favRes.data.find(
          (f) => f.post?.id === postId && f.user?.id === userId
        );
        if (favItem) await deleteFavoriteById(favItem.favoriteId);
        setFavoriteIds((prev) => prev.filter((id) => id !== postId));
      } else {
        await addToFavorites(postId, userId);
        setFavoriteIds((prev) => [...prev, postId]);
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  const favoritePosts = posts.filter((post) => favoriteIds.includes(post.id));

  return (
    <div className="max-w-2xl mx-auto p-5 space-y-5">
      <h1 className="text-2xl font-bold mb-5">My Favorites</h1>

      {favoritePosts.length === 0 ? (
        <p className="text-gray-500">You haven’t added any favorites yet.</p>
      ) : (
        favoritePosts.map((post) => (
          <Postcard
            key={post.id}
            post={post}
            handleVote={() => {}}
            handleThreeDots={handleThreeDots}
            handleAddToFavorites={handleAddToFavorites}
            isFavorite={favoriteIds.includes(post.id)}
            openDropdown={openDropdown}
          />
        ))
      )}
    </div>
  );
}

export default Favorites;
