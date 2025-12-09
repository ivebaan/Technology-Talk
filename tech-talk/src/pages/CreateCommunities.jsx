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
    <div className="w-full flex flex-col max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create Community</h1>

      {/* Name */}
      <div className="mb-4">
        <label className="text-sm font-medium">Community Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg outline-none"
          placeholder="e.g. r/learnprogramming"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg min-h-[140px] outline-none"
          placeholder="Describe what this community is about"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="text-sm font-medium">Category</label>

        {category && (
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2">
              <span className="text-sm">{category.name}</span>
              <button
                className="text-xs text-gray-600"
                onClick={removeCategory}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="mt-3 text-sm text-gray-600">
          Suggested:{" "}
          {suggestedCategories.map((s) => (
            <button
              key={s.categoryId}
              className="mr-2 mb-2 px-2 py-1 bg-white border rounded-full text-xs"
              onClick={() => addCategory(s)}
            >
              {s.name}
            </button>
          ))}
        </div>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          className="px-5 py-2 rounded-full bg-gray-300 text-sm hover:bg-gray-400"
          onClick={() => {
            setName("");
            setDescription("");
            setCategory(null);
          }}
        >
          Reset
        </button>
        <button
          className="px-5 py-2 rounded-full bg-[#820000] text-white font-bold text-sm hover:bg-[#a00000]"
          onClick={handleCreate}
        >
          Create Community
        </button>
      </div>
    </div>
  );
}
