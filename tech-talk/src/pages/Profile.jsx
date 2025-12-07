import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Profile() {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-pink-300" />
          <div>
            <h1 className="text-2xl font-bold">{currentUser?.displayName}</h1>
            <p className="text-gray-600 text-sm">{currentUser?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b pb-2 text-gray-600 font-medium">
          <button className="text-black border-b-2 border-black pb-2">
            Posts
          </button>
          <button>Overview</button>
          <button>Comments</button>
          <button>Saved</button>
        </div>

        {/* Create Post + Filter */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Showing all posts</span>
          </div>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300">
            + Create Post
          </button>
        </div>

        {/* No Posts Section */}
        <div className="flex flex-col items-center mt-20 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            You don't have any posts yet
          </h2>
          <p className="text-gray-600 max-w-md">
            Once you post to a community, it'll show up here. If you'd rather
            hide your posts, update your settings.
          </p>
          <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Update Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
