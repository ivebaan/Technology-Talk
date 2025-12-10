import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { createCommunity, getAllCategories, joinCommunity, createCategory } from "../api/api";
import Popup from "../components/cards/Popup";

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
  const [popup, setPopup] = useState(null);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);

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

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      setPopup({ message: "Category name is required", type: "warning" });
      return;
    }

    setCreatingCategory(true);
    try {
      const res = await createCategory({ name: newCategoryName.trim() });
      const newCategory = res.data;
      setSuggestedCategories((prev) => [...prev, newCategory]);
      setCategory(newCategory);
      setNewCategoryName("");
      setShowNewCategoryForm(false);
      setPopup({ message: "Category created successfully", type: "success" });
    } catch (err) {
      console.error(err);
      setPopup({ message: "Failed to create category", type: "error" });
    } finally {
      setCreatingCategory(false);
    }
  };

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
      setPopup({ message: "You must be logged in to create a community.", type: "warning" });
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

      setPopup({ message: "Community created successfully", type: "success" });

      // Reset form
      setName("");
      setDescription("");
      setCategory(null);
    } catch (err) {
      console.error(err);
      setPopup({ message: "Failed to create community. Make sure the backend is running and JSON is valid.", type: "error" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-bold text-gray-900 mb-4">Create Community</h1>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="text-xs font-medium text-gray-900">Community Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#820000] focus:border-[#820000]"
              placeholder="e.g. r/learnprogramming"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-gray-900">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 min-h-[80px] resize-none focus:outline-none focus:ring-1 focus:ring-[#820000] focus:border-[#820000]"
              placeholder="Describe what this community is about"
            />
            {errors.description && (
              <p className="text-red-600 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-gray-900">Category</label>

            {category && (
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                <div className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <span>{category.name}</span>
                  <button
                    className="text-gray-500 hover:text-gray-700 font-bold"
                    onClick={removeCategory}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {!showNewCategoryForm && (
              <div className="mt-2 text-xs text-gray-700">
                <div className="font-medium mb-2">Suggested:</div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {suggestedCategories.map((s) => (
                    <button
                      key={s.categoryId}
                      className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition"
                      onClick={() => addCategory(s)}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
                <button
                  className="px-3 py-1 text-xs font-medium bg-[#820000] text-white rounded-lg hover:shadow-md transition"
                  onClick={() => setShowNewCategoryForm(true)}
                >
                  + Add New Category
                </button>
              </div>
            )}

            {showNewCategoryForm && (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name..."
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#820000] focus:border-[#820000]"
                />
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    onClick={() => {
                      setShowNewCategoryForm(false);
                      setNewCategoryName("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 text-xs font-medium bg-[#820000] text-white rounded-lg hover:shadow-md transition disabled:opacity-50"
                    onClick={handleCreateCategory}
                    disabled={creatingCategory}
                  >
                    {creatingCategory ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>
            )}

            {errors.category && (
              <p className="text-red-600 text-xs mt-2">{errors.category}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-3 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              onClick={() => {
                setName("");
                setDescription("");
                setCategory(null);
              }}
            >
              Reset
            </button>
            <button
              className="px-3 py-2 text-xs font-medium bg-[#820000] text-white rounded-lg hover:shadow-md transition"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}

