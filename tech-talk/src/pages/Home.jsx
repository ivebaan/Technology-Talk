import React from "react";

function Home() {
  return (
    <div>
      <main className="p-6 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-[#820000] mb-2">
              Sample Post Title
            </h2>
            <p className="text-gray-600 mb-3">
              This is a placeholder post area. You can design and style this
              before connecting real posts later.
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Posted by u/demoUser</span>
              <div className="flex gap-4">
                <button className="hover:text-[#820000]">👍 Upvote</button>
                <button className="hover:text-[#820000]">💬 Comment</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-[#820000] mb-2">
              Another Sample Post
            </h2>
            <p className="text-gray-600 mb-3">
              Just another example to show how posts will stack in the centered
              feed layout.
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Posted by u/sampleUser</span>
              <div className="flex gap-4">
                <button className="hover:text-[#820000]">👍 Upvote</button>
                <button className="hover:text-[#820000]">💬 Comment</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
