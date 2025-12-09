import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { createCommunity, getAllCategories, joinCommunity } from "../api/api";

export default function CreateCommunities() {
  const { currentUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [suggestedCategories, setSuggestedCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((res) => setSuggestedCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addCategory = (catObj) => {
    if (!catObj) return;
    setCategory(catObj);
  };

  const removeCategory = () => setCategory(null);

  const handleCreate = async () => {
    const newErrors = { name: "", description: "", category: "" };
    let valid = true;

    if (!name.trim()) {
      newErrors.name = "Community name is required";
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (!category) {
      newErrors.category = "Please select a category";
      valid = false;
    }
    if (!currentUser) {
      alert("You must be logged in to create a community.");
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const communityData = {
        name: name.trim(),
        description: description.trim(),
        createdBy: { userId: currentUser.userId }, // Backend expects UserEntity
        category: { categoryId: category.categoryId }, // Backend expects CategoryEntity
      };

      // 1️⃣ Create the community
      const res = await createCommunity(communityData);
      const newCommunityId = res.data.communityId;

      // 2️⃣ Add the current user to the community
      await joinCommunity(currentUser.userId, newCommunityId);

      alert("Community created successfully");

      // Reset form
      setName("");
      setDescription("");
      setCategory(null);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to create community. Make sure the backend is running and JSON is valid."
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-bold text-gray-900 mb-4">Create Community</h1>

        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-gray-700">Community Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#820000]"
              placeholder="e.g. r/learnprogramming"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg min-h-[80px] resize-none focus:outline-none focus:ring-1 focus:ring-[#820000]"
              placeholder="Describe what this community is about"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-semibold text-gray-700">Category</label>

            {category && (
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <span>{category.name}</span>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={removeCategory}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            <div className="mt-2 text-xs text-gray-600">
              <div className="font-semibold mb-1">Suggested:</div>
              <div className="flex flex-wrap gap-2">
                {suggestedCategories.map((s) => (
                  <button
                    key={s.categoryId}
                    className="px-2 py-1 bg-gray-100 border border-gray-200 text-gray-700 rounded text-xs font-semibold hover:bg-gray-200 transition"
                    onClick={() => addCategory(s)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
            {errors.category && (
              <p className="text-red-500 text-xs mt-2">{errors.category}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
              onClick={() => {
                setName("");
                setDescription("");
                setCategory(null);
              }}
            >
              Reset
            </button>
            <button
              className="px-3 py-1 text-xs font-semibold bg-[#820000] text-white rounded hover:bg-red-700 transition"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
