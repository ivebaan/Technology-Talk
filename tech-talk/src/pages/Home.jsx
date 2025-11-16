import React, { useState, useEffect } from "react";
import axios from "axios";
import Postcard from "../components/Postcard";
import PopularCommunitiesCard from "../components/PopularCommunitiesCard";


function Home() {
  const [posts, setPosts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/communities")
      .then((res) => setCommunities(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
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
