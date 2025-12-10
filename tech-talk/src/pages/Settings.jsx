import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Popup from "../components/Popup";
import { updateUser } from "../api/api";

const Settings = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [activeCategory, setActiveCategory] = useState("Account");
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [popup, setPopup] = useState(null);

  const categories = ["Account", "Privacy"];

  const handleSaveUsername = async () => {
    if (!usernameInput || usernameInput.trim() === "") {
      setPopup({ message: "Username cannot be empty", type: "error" });
      return;
    }
    try {
      // Send a full payload so backend doesn't clear other fields like email
      const payload = {
        id: currentUser.id,
        username: usernameInput,
        email: currentUser.email,
        displayName: currentUser.displayName,
      };
      const res = await updateUser(currentUser.id, payload);
      const resData = res?.data || {};
      const updatedUser = {
        id: resData.id ?? payload.id,
        email: resData.email ?? payload.email,
        username: resData.username ?? payload.username,
        displayName: resData.displayName ?? payload.displayName,
      };
      setCurrentUser(updatedUser);
      setEditingUsername(false);
      setPopup({ message: "Username updated", type: "success" });
    } catch (err) {
      setPopup({ message: "Failed to update username", type: "error" });
    }
  };

  const handleSaveDisplayName = async () => {
    if (!displayNameInput || displayNameInput.trim() === "") {
      setPopup({ message: "Display name cannot be empty", type: "error" });
      return;
    }
    try {
      // Send full payload including email to avoid backend overwriting other fields
      const payload = {
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        displayName: displayNameInput,
      };
      const res = await updateUser(currentUser.id, payload);
      const resData = res?.data || {};
      const updatedUser = {
        id: resData.id ?? payload.id,
        email: resData.email ?? payload.email,
        username: resData.username ?? payload.username,
        displayName: resData.displayName ?? payload.displayName,
      };
      setCurrentUser(updatedUser);
      setEditingDisplayName(false);
      setPopup({ message: "Display name updated", type: "success" });
    } catch (err) {
      setPopup({ message: "Failed to update display name", type: "error" });
    }
  };

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
              {!editingUsername ? (
                <>
                  <p className="text-xs text-gray-600">{currentUser?.username || "User"}</p>
                  <p className="text-xs text-gray-400 mt-2">You can change your username below</p>
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setEditingUsername(true);
                        setUsernameInput(currentUser?.username || "");
                      }}
                      className="px-3 py-1 text-xs bg-[#820000] text-white rounded"
                    >
                      Edit
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveUsername}
                      className="px-3 py-1 text-xs bg-[#820000] text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUsername(false)}
                      className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Display Name Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Display Name</h3>
              {!editingDisplayName ? (
                <>
                  <p className="text-xs text-gray-600 mb-2">{currentUser?.displayName || "User"}</p>
                  <p className="text-xs text-gray-400">Update your display name to customize your profile</p>
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setEditingDisplayName(true);
                        setDisplayNameInput(currentUser?.displayName || "");
                      }}
                      className="px-3 py-1 text-xs bg-[#820000] text-white rounded"
                    >
                      Edit
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveDisplayName}
                      className="px-3 py-1 text-xs bg-[#820000] text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingDisplayName(false)}
                      className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
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
        {popup && <Popup message={popup.message} type={popup.type} onClose={() => setPopup(null)} />}
      </div>
    </div>
  );
};

export default Settings;

