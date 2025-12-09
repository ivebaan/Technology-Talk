import React, { useState, useEffect } from "react";
import axios from "axios";
import Postcard from "../components/cards/Postcard";

function Trend() {
  const [posts, setPosts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/posts/getAll")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleVote = (id, type) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          let newVotes = post.votes;
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
  };

  const handleThreeDots = (e, id) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-2xl mx-auto p-5 space-y-5">
      <h1 className="text-2xl font-bold mb-5">Trending Posts</h1>

      {posts.map((post) => (
        <Postcard
          key={post.id}
          post={post}
          handleVote={handleVote}
          handleThreeDots={handleThreeDots}
          openDropdown={openDropdown}
        />
      ))}

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Recent Posts</h2>
        <div className="space-y-3">
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <div
                key={post.id}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
              >
                {/* Fix: render name, not the object */}
                <span className="text-gray-600 text-sm">
                  {post.community?.name || "Unknown Community"}
                </span>
                <h3 className="text-gray-900 font-medium">{post.title}</h3>
                <p className="text-gray-500 text-sm">
                  by {post.createdBy?.username || "Unknown"} •{" "}
                  {post.comments || 0} comments
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Trend;
