import React, { useState } from "react";

const Settings = () => {
  const categories = ["Account", "Privacy", "Accessibility"];

  const [activeCategory, setActiveCategory] = useState("Account");

  // Toggle sections
  const [showEmail, setShowEmail] = useState(false);
  const [showGender, setShowGender] = useState(false);

  // Form states
  const [email, setEmail] = useState("kehrbymartinez@gmail.com");
  const [newEmail, setNewEmail] = useState("");
  const [gender, setGender] = useState("Male");

  // Authorization states
  const [googleConnected, setGoogleConnected] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const renderContent = () => {
    switch (activeCategory) {
      case "Account":
        return (
          <div className="text-maroon-900">
            {/* SECTION: General */}
            <h2 className="text-xl font-bold mb-4 text-maroon-800 border-b pb-2">General</h2>

            {/* Email */}
            <div className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowEmail(!showEmail)}
              >
                <span>Email address</span>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>{email}</span>
                  <span>{showEmail ? "▲" : "▼"}</span>
                </div>
              </div>

              {showEmail && (
                <div className="mt-3 ml-2">
                  <input
                    type="email"
                    placeholder="Enter new email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="border px-3 py-2 rounded w-full mb-2"
                  />
                  <button
                    className="bg-[#820000] text-white px-3 py-2 rounded"
                    onClick={() => {
                      if (newEmail) setEmail(newEmail);
                      setNewEmail("");
                      setShowEmail(false);
                    }}
                  >
                    Update Email
                  </button>
                </div>
              )}
            </div>


            {/* Gender */}
            <div className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowGender(!showGender)}
              >
                <span>Gender</span>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>{gender}</span>
                  <span>{showGender ? "▲" : "▼"}</span>
                </div>
              </div>

              {showGender && (
                <div className="mt-3 ml-2">
                  <select
                    className="border px-3 py-2 rounded w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                  </select>

                  <button
                    className="bg-[#820000] text-white px-3 py-2 rounded mt-2"
                    onClick={() => setShowGender(false)}
                  >
                    Save Gender
                  </button>
                </div>
              )}
            </div>

            {/* SECTION: Account Authorization */}
            <h2 className="text-xl font-bold mb-4 text-maroon-800 border-b pb-2">Account Authorization</h2>

            {/* Google Login */}
            <div className="mb-4">
              <p className="mb-2">Connect to log in with your Google account</p>
              <button
                className="bg-[#820000] text-white px-4 py-2 rounded"
                onClick={() => setGoogleConnected(!googleConnected)}
              >
                {googleConnected ? "Disconnect" : "Connect"}
              </button>
            </div>

            {/* Two-factor Authentication */}
            <div className="mb-4 flex justify-between items-center">
              <span>Two-factor authentication</span>

              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={() => setTwoFactor(!twoFactor)}
                  className="opacity-0 w-0 h-0"
                />
                <span
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                    twoFactor ? "bg-[#820000]" : "bg-gray-400"
                  }`}
                ></span>
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition ${
                    twoFactor ? "translate-x-6" : "translate-x-0"
                  }`}
                ></span>
              </label>
            </div>

            {/* SECTION: Advanced */}
            <h2 className="text-xl font-bold mb-4 text-maroon-800 border-b pb-2">Advanced</h2>

            {/* Delete Account */}
            <div className="pt-2">
              <button className="text-red-600 font-semibold hover:underline">
                Delete account
              </button>
            </div>
          </div>
        );

      case "Privacy":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-maroon-800">Privacy</h2>
            <p className="text-maroon-900">Control your privacy, data usage, and visibility preferences.</p>
          </div>
        );

      case "Accessibility":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-maroon-800">Accessibility</h2>
            <p className="text-maroon-900">Adjust accessibility features to improve usability.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen text-maroon-900 p-8 mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-maroon-800">Settings</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`cursor-pointer px-4 py-2 rounded-lg transition text-sm ${
              activeCategory === category
                ? "bg-[#820000] text-white"
                : "text-[#820000] hover:bg-[#820000] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Dynamic Content Section */}
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default Settings;
