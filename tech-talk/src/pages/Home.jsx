import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaCommentAlt, FaShare, FaAward } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

function Home() {
  const samplePosts = [
    {
      id: 1,
      title: "AUndang natag skwela",
      content: "Paeta",
      author: "u/AskPH",
      community: "r/AskPH",
      votes: 133,
      comments: 512,
      verified: true,
    },
    {
      id: 2,
      title: "Padayon gihapon ang pag skwela bisan earthquake",
      content:
        "Kusog- kusog sad jud to uyoga ba. Kamusta man mo diha? Stay safe intawn mo, ilabi na ang naas mga high rise nga buildings ug mga ga work pa.",
      author: "u/ivebaan",
      community: "r/cebu",
      votes: 27,
      comments: 45,
      verified: false,
    },
  ];

  const [posts, setPosts] = useState(samplePosts);

  // handle upvote/downvote
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



  return (
    <div className="bg-[#f6f7f8] min-h-screen flex justify-center">
      <main className="w-full max-w-2xl mt-6 space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5"
          >
            {/* Top info */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-800">{post.author}</span>
                {post.verified && (
                  <span className="flex items-center text-green-600 text-xs rounded-full px-2 py-[1px]">
                    ✔ Verified
                  </span>
                )}
                <span className="text-gray-400">• 17 days ago</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <HiDotsHorizontal size={18} />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-[17px] font-semibold text-gray-900 mb-1">
              {post.title}
            </h2>

            {/* Content */}
            <p className="text-gray-700 text-[15px] mb-3">{post.content}</p>

            {/* Category tag */}
            <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mb-3">
              Academics
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <div
  className={`flex items-center px-3 py-1 rounded-full transition-colors duration-200 text-white ${
    post.voteStatus === "up"
      ? "bg-green-800"
      : post.voteStatus === "down"
      ? "bg-red-800"
      : "bg-gray-500 hover:bg-gray-300"
  }`}
>
  <button
    onClick={() => handleVote(post.id, "up")}
    className={`transition-colors ${
      post.voteStatus === "up" ? "text-green-400" : "hover:text-[#00c52b]"
    }`}
  >
    <FaArrowUp />
  </button>

  <span className="mx-2 font-medium">{post.votes}</span>

  <button
    onClick={() => handleVote(post.id, "down")}
    className={`transition-colors ${
      post.voteStatus === "down" ? "text-red-400" : "hover:text-[#820000]"
    }`}
  >
    <FaArrowDown />
  </button>
</div>


              <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                <FaCommentAlt /> <span>{post.comments}</span>
              </button>

              <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                <FaAward /> <span>Award</span>
              </button>

              <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                <FaShare /> <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
