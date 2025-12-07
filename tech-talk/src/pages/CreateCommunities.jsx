import React, { useState, useContext } from "react";
import API from "../api/api";
import { UserContext } from "../context/UserContext";

export default function CreateCommunities() {
  const { currentUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({ name: "", description: "" });
  const suggestedCategories = [
    "Coding",
    "Cooking",
    "Studying",
    "Gaming",
    "Music",
    "Art",
  ];

  const addCategory = (g) => {
    if (!g) return;
    const category = g.trim();
    if (!category) return;
    if (!categories.includes(category)) setCategories((s) => [...s, category]);
    setCategoryInput("");
  };

  const removeCategory = (g) => {
    setCategories((s) => s.filter((x) => x !== g));
  };

  const handleCreate = async () => {
    const newErrors = { name: "", description: "" };
    let valid = true;
    if (!name.trim()) {
      newErrors.name = "Community name is required";
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (!currentUser) {
      alert("You must be logged in to create a community.");
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) return;

    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        categories,
        ownerId: currentUser?.id || null,
      };
      await API.post("/community", payload);
      alert("Community created successfully");
      setName("");
      setDescription("");
      setGenres([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create community");
    }
  };

  return (
    <div className="w-full flex flex-col max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create Community</h1>

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

      <div className="mb-4">
        <label className="text-sm font-medium">Category (tags)</label>
        <div className="flex gap-2 mt-2">
          <input
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCategory(categoryInput);
              }
            }}
            className="flex-1 p-2 border rounded-full outline-none"
            placeholder="Add a category and press Enter (e.g. Coding)"
          />
          <button
            className="px-4 py-2 bg-gray-200 rounded-full"
            onClick={() => addCategory(categoryInput)}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {categories.map((g) => (
            <div
              key={g}
              className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2"
            >
              <span className="text-sm">{g}</span>
              <button
                className="text-xs text-gray-600"
                onClick={() => removeCategory(g)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 text-sm text-gray-600">
          Suggested: {suggestedCategories.map((s) => (
            <button
              key={s}
              className="mr-2 mb-2 px-2 py-1 bg-white border rounded-full text-xs"
              onClick={() => addCategory(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-5 py-2 rounded-full bg-gray-300 text-sm hover:bg-gray-400"
              onClick={() => {
                setName("");
                setDescription("");
                setCategories([]);
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
