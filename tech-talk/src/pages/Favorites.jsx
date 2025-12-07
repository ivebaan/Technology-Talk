import React, { useState, useEffect } from "react";
import axios from "axios";
import Postcard from "../components/cards/Postcard";
import { addToFavorites, deleteFavoriteById, getAllFavorites, getAllPosts } from "../api/api";

function Favorites() {
  const [posts, setPosts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Fetch favorites + posts
  useEffect(() => {
    const fetchFavoritesAndPosts = async () => {
      try {
      const favRes = getAllFavorites();
        setFavoriteIds(favRes.data.map((fav) => fav.postId));

        const postsRes = getAllPosts();
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchFavoritesAndPosts();
  }, []);

  const handleThreeDots = (e, id) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleAddToFavorites = async (postId) => {
    const isAlreadyFavorite = favoriteIds.includes(postId);

    try {
      if (isAlreadyFavorite) {
        const favRes = getAllFavorites();

        const favItem = favRes.data.find((f) => f.postId === postId);

        if (favItem) {
          deleteFavoriteById(favItem.id);
          setFavoriteIds((prev) => prev.filter((id) => id !== postId));
        }
      } else {
        const newFav = addToFavorites({
          postId,
        });

        setFavoriteIds((prev) => [...prev, postId]);
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  // List only posts that match favorite IDs
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
