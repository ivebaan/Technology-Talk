import { Vote } from "lucide-react";
import React, { useState } from "react";

function Counter() {
  const sampleCount = [
    { id: 1, vote: 21, voteStatus: null },
    { id: 2, vote: 14, voteStatus: null },
  ];
  const [posts, setPost] = useState(sampleCount);

  const handleVote = (type) => {
    setPost(
      posts.map((post) => {
        let updatedVotes = post.vote;
        let updatedStatus = post.voteStatus;

        if (type === "up") {
          if (post.voteStatus === "up") {
            updatedVotes -= 1;
            updatedStatus = null;
          } else {
            updatedVotes += post.voteStatus === "down" ? 2 : 1;
            updatedStatus = "up";
          }
        } else if (type === "down") {
          if (post.voteStatus === "down") {
            updatedVotes += 1;
            updatedStatus = null;
          } else {
            updatedVotes -= post.voteStatus === "up" ? 2 : 1;
            updatedStatus = "down";
          }
        }
        return { ...post, vote: updatedVotes, voteStatus: updatedStatus };
      })
    );
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <div
                className={`flex items-center px-3 py-1 rounded-full transition-colors duration-200 text-white ${
                  post.voteStatus === "up"
                    ? "bg-green-800"
                    : post.voteStatus === "down"
                    ? "bg-red-800"
                    : "bg-gray-500 hover:bg-gray-300"
                }`}
              >
                <button onClick={() => handleVote("up")}>↑</button>
                <span>{post.vote}</span>
                <button onClick={() => handleVote("down")}>↓</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Counter;
