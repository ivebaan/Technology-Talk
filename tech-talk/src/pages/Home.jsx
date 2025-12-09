import React, { useState, useEffect } from "react";
import {
  getAllCommunities,
  getAllPosts,
  getAllFavorites,
  addToFavorites,
  deleteFavoriteById,
  votePost,
} from "../api/api";
import Postcard from "../components/cards/Postcard";
import PopularCommunitiesCard from "../components/cards/PopularCommunitiesCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // --- Fetch data on mount ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [communityRes, postsRes, favRes] = await Promise.all([
          getAllCommunities(),
          getAllPosts(),
          getAllFavorites(),
        ]);

        setCommunities(communityRes.data);

        setPosts(
          postsRes.data
            .map((post) => ({
              ...post,
              voteStatus: post.voteStatus || null,
            }))
            .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
        );

        const userFavs = favRes.data
          .filter((f) => f.post && f.user?.id === userId)
          .map((f) => f.post.id);

        setFavorites(userFavs);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [userId]);

  // --- Handle voting ---
  const handleVote = async (postId, type) => {
    if (!userId) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          let newVotes = post.votes;
          let newStatus = post.voteStatus;

          if (type === "up") {
            if (post.voteStatus === "up") {
              newVotes -= 1;
              newStatus = null;
            } else {
              newVotes += post.voteStatus === "down" ? 2 : 1;
              newStatus = "up";
            }
          } else if (type === "down") {
            if (post.voteStatus === "down") {
              newVotes += 1;
              newStatus = null;
            } else {
              newVotes -= post.voteStatus === "up" ? 2 : 1;
              newStatus = "down";
            }
          }

          return { ...post, votes: newVotes, voteStatus: newStatus };
        }
        return post;
      })
    );

    try {
      const res = await votePost(postId, type, userId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, votes: res.data.votes, voteStatus: type }
            : post
        )
      );
    } catch (err) {
      console.error("Error saving vote:", err);
    }
  };

  // --- Handle three-dots menu ---
  const handleThreeDots = (e, id) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // --- Handle add/remove favorites ---
  const handleAddToFavorites = async (postId) => {
    try {
      const userObj = localStorage.getItem("user");
      if (!userObj) return;
      const userId = JSON.parse(userObj).id;

      const isAlreadyFavorite = favorites.includes(postId);

      if (isAlreadyFavorite) {
        const favRes = await getAllFavorites();
        const favItem = favRes.data.find(
          (f) => f.post && f.post.id === postId && f.user?.id === userId
        );
        if (favItem) await deleteFavoriteById(favItem.favoriteId);
      } else {
        await addToFavorites(postId, userId);
      }

      // Refresh favorites
      const updatedFavRes = await getAllFavorites();
      const updatedUserFavs = updatedFavRes.data
        .filter((f) => f.post && f.user?.id === userId)
        .map((f) => f.post.id);

      setFavorites(updatedUserFavs);
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  return (
    <div className="bg-[#f6f7f8] min-h-screen flex justify-center">
      <div className="w-full max-w-6xl mt-6 flex gap-6">
        <main className="flex-1 space-y-4">
          {posts.map((post) => (
            <Postcard
              key={post.id}
              post={post}
              handleVote={handleVote}
              handleThreeDots={handleThreeDots}
              handleAddToFavorites={handleAddToFavorites}
              isFavorite={favorites.includes(post.id)}
              openDropdown={openDropdown}
            />
          ))}
        </main>

        <aside className="w-80">
          <PopularCommunitiesCard communities={communities} />
        </aside>
      </div>
    </div>
  );
}

export default Home;
