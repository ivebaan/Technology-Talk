import React, { useState, useEffect } from "react";
import axios from "axios";
import Postcard from "../components/cards/Postcard";
import PopularCommunitiesCard from "../components/cards/PopularCommunitiesCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/community/getAll")
      .then((res) => setCommunities(res.data))
      .catch((err) => console.error("Error fetching communities:", err));

    axios
      .get("http://localhost:8081/posts/getAll")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleVote = (id, type) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          let updatedVotes = post.votes;
          let newStatus = post.voteStatus;

          if (type === "up") {
            if (post.voteStatus === "up") {
              updatedVotes -= 1;
              newStatus = null;
            } else {
              updatedVotes += post.voteStatus === "down" ? 2 : 1;
              newStatus = "up";
            }
          } else if (type === "down") {
            if (post.voteStatus === "down") {
              updatedVotes += 1;
              newStatus = null;
            } else {
              updatedVotes -= post.voteStatus === "up" ? 2 : 1;
              newStatus = "down";
            }
          }

          return { ...post, votes: updatedVotes, voteStatus: newStatus };
        }
        return post;
      })
    );
  };

  const handleThreeDots = (e, id) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleAddToFavorites = async (postId) => {
    const isAlreadyFavorite = favorites.includes(postId);

    try {
      if (isAlreadyFavorite) {
        const favRes = await axios.get("http://localhost:8081/favorites/getAll");
        const favItem = favRes.data.find((f) => f.postId === postId);

        if (favItem) {
          await axios.delete("http://localhost:8081/favorites/delete/{id}");
          setFavorites((prev) => prev.filter((id) => id !== postId));
        }
      } else {
        const newFav = await axios.post("http://localhost:8081/favorites/add", {
          postId,
        });

        setFavorites((prev) => [...prev, postId]);
      }
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
