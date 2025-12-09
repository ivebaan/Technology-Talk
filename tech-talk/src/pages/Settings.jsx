import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Settings = () => {
  const { currentUser } = useContext(UserContext);
  const [activeCategory, setActiveCategory] = useState("Account");

  const categories = ["Account", "Privacy"];

  const renderContent = () => {
    switch (activeCategory) {
      case "Account":
        return (
          <div>
            {/* Email Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Email Address</h3>
              <p className="text-xs text-gray-600">{currentUser?.email || "No email"}</p>
              <p className="text-xs text-gray-400 mt-2">Email changes will require verification</p>
            </div>

            {/* Username Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Username</h3>
              <p className="text-xs text-gray-600">{currentUser?.username || "User"}</p>
              <p className="text-xs text-gray-400 mt-2">Usernames cannot be changed</p>
            </div>

            {/* Display Name Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Display Name</h3>
              <p className="text-xs text-gray-600 mb-2">{currentUser?.displayName || "User"}</p>
              <p className="text-xs text-gray-400">Update your display name to customize your profile</p>
            </div>
          </div>
        );

      case "Privacy":
        return (
          <div>
            {/* Privacy Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Profile Visibility</h3>
              <p className="text-xs text-gray-600 mb-3">Your profile is public and visible to all users</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-600">Public Profile</span>
              </div>
            </div>

            {/* Community Privacy */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Community Data</h3>
              <p className="text-xs text-gray-600">Your posts and comments in communities are visible to all members</p>
            </div>

            {/* Data Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Data Privacy</h3>
              <p className="text-xs text-gray-600 mb-3">We keep your data secure and never share it with third parties</p>
              <div className="text-xs text-gray-400 space-y-1">
                <p>• Your email is private</p>
                <p>• Your password is encrypted</p>
                <p>• Posts can be deleted anytime</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-bold text-gray-900 mb-4">Settings</h1>

        {/* Category Tabs */}
        <div className="flex gap-2 bg-white rounded-lg border border-gray-200 p-3 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-xs font-semibold px-3 py-1 rounded transition-all ${
                activeCategory === category
                  ? "bg-[#820000] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;

