import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Popup from "../components/cards/Popup";
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
            <div className="rounded-xl border shadow-md p-5 mb-5 transition-all bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#820000] hover:shadow-lg">
              <h3 className="text-base font-semibold mb-2 text-gray-900">Email Address</h3>
              <p className="text-xs text-gray-600">{currentUser?.email || "No email"}</p>
              <p className="text-xs mt-2 font-medium text-gray-400">Email cannot be change</p>
            </div>

            {/* Display Name Section */}
            <div className="rounded-xl border shadow-md p-5 transition-all bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#820000] hover:shadow-lg">
              <h3 className="text-base font-semibold mb-3 text-gray-900">Display Name</h3>
              {!editingDisplayName ? (
                <>
                  <p className="text-xs mb-2 text-gray-600">{currentUser?.displayName || "User"}</p>
                  <p className="text-xs font-medium text-gray-400">Update your display name to customize your profile</p>
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setEditingDisplayName(true);
                        setDisplayNameInput(currentUser?.displayName || "");
                      }}
                      className="px-3 py-2 text-xs rounded-lg font-semibold transition-all shadow-sm bg-[#820000] text-white hover:shadow-md"
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
                    className="w-full rounded-lg px-3 py-2.5 text-sm mb-3 transition-all border shadow-sm bg-white border-gray-200 focus:ring-[#820000] focus:outline-none focus:ring-1"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveDisplayName}
                      className="px-3 py-2 text-xs rounded-lg font-semibold transition-all shadow-sm bg-[#820000] text-white hover:shadow-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingDisplayName(false)}
                      className="px-3 py-2 text-xs rounded-lg font-semibold transition-all shadow-sm bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
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
            <div className="rounded-xl border shadow-md p-5 mb-5 transition-all bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#820000] hover:shadow-lg">
              <h3 className="text-base font-semibold mb-2 text-gray-900">Profile Visibility</h3>
              <p className="text-xs mb-3 text-gray-600">Your profile is public and visible to all users</p>
              <div className="flex items-center gap-2">
              </div>
            </div>

            {/* Community Privacy */}
            <div className="rounded-xl border shadow-md p-5 mb-5 transition-all bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#820000] hover:shadow-lg">
              <h3 className="text-base font-semibold mb-2 text-gray-900">Community Data</h3>
              <p className="text-xs text-gray-600">Your posts and comments in communities are visible to all members</p>
            </div>

            {/* Data Info */}
            <div className="rounded-xl border shadow-md p-5 transition-all bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#820000] hover:shadow-lg">
              <h3 className="text-base font-semibold mb-2 text-gray-900">Data Privacy</h3>
              <p className="text-xs mb-3 font-medium text-gray-600">We keep your data secure and never share it with third parties</p>
              <div className="text-xs space-y-1 font-medium text-gray-400">
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
    <div className="min-h-screen py-4 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-bold mb-4 text-gray-900">
          Settings
        </h1>

        {/* Category Tabs */}
        <div className="flex gap-2 rounded-lg border p-3 mb-4 bg-white border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-xs font-semibold px-3 py-1 rounded transition-all ${
                activeCategory === category
                  ? 'bg-[#820000] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
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

