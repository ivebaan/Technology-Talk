import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Code,
  Quote,
} from "lucide-react";
import { createPost, getAllCommunities } from "../api/api";
import { UserContext } from "../context/UserContext";

export default function CreatePost() {
  const { currentUser } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({ title: "", content: "" });
  const [titleColor, setTitleColor] = useState("border-gray-300");
  const [contentColor, setContentColor] = useState("border-gray-300");

  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] =
    useState("Select a community");
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const editorRef = useRef(null);

  useEffect(() => {
    getAllCommunities()
      .then((res) => setCommunities(res.data))
      .catch((err) => console.log(err));
  }, []);

  const applyFormat = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    setContent(editorRef.current.innerHTML);
  };

  const handlePost = () => {
    const newErrors = { title: "", content: "" };
    let valid = true;

    if (!title.trim()) {
      newErrors.title = "Title cannot be empty!";
      valid = false;
      setTitleColor("border-red-500");
    } else {
      setTitleColor("border-gray-300");
    }

    if (!content.trim()) {
      newErrors.content = "Content cannot be empty!";
      valid = false;
      setContentColor("border-red-500");
    } else {
      setContentColor("border-gray-300");
    }

    if (!selectedCommunityId) {
      alert("Please select a community!");
      valid = false;
    }

    if (!currentUser) {
      alert("You must be logged in to post.");
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    createPost({
      title: title,
      content: content,
      userId: currentUser.id,
      communityId: selectedCommunityId,
      votes: 0,
      isFavorites: false,
    })
      .then(() => {
        setTitle("");
        setContent("");
        setSelectedCommunity("Select a community");
        setSelectedCommunityId(null);
        if (editorRef.current) editorRef.current.innerHTML = "";
        alert("Successfully Posted!");
      })
      .catch((err) => console.error("Error creating post:", err));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-bold text-gray-900 mb-4">Create Post</h1>

        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          {/* Community Dropdown */}
          <div className="relative">
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Community
            </label>
            <button
              className="flex items-center justify-between gap-2 border border-gray-200 px-2 py-1 w-full rounded text-xs hover:border-[#820000] focus:outline-none focus:ring-1 focus:ring-[#820000] transition"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <span className="truncate">{selectedCommunity}</span>
              <span className="text-sm flex-shrink-0">▾</span>
            </button>

            {openDropdown && (
              <div className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded shadow-md z-20 max-h-48 overflow-y-auto">
                {communities.map((c) => (
                  <button
                    key={c.id}
                    className="px-2 py-1 text-left w-full text-xs hover:bg-gray-100 border-b last:border-0 transition"
                    onClick={() => {
                      setSelectedCommunity(c.name);
                      setSelectedCommunityId(c.id);
                      setOpenDropdown(false);
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={300}
              className={`w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-[#820000] ${titleColor}`}
            />
            <div className="text-xs text-gray-400 text-right mt-1">
              {title.length}/300
            </div>
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Content Editor */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              Content
            </label>
            <div className={`border rounded-lg overflow-hidden ${contentColor}`}>
              <div className="flex gap-2 px-3 py-2 border-b bg-gray-50 text-gray-700 text-sm">
                <Bold
                  className="w-4 h-4 cursor-pointer hover:text-[#820000]"
                  onClick={() => applyFormat("bold")}
                />
                <Italic
                  className="w-4 h-4 cursor-pointer hover:text-[#820000]"
                  onClick={() => applyFormat("italic")}
                />
                <Underline
                  className="w-4 h-4 cursor-pointer hover:text-[#820000]"
                  onClick={() => applyFormat("underline")}
                />
                <LinkIcon
                  className="w-4 h-4 cursor-pointer hover:text-[#820000]"
                  onClick={() => {
                    const url = prompt("Enter URL:");
                    if (url) applyFormat("createLink", url);
                  }}
                />
                <ImageIcon
                  className="w-4 h-4 cursor-pointer hover:text-[#820000]"
                  onClick={() => {
                    const url = prompt("Enter Image URL:");
                    if (url) applyFormat("insertImage", url);
                  }}
                />
                <List
                  className="w-4 h-4 cursor-pointer hover:text-[#820000]"
                  onClick={() => applyFormat("insertUnorderedList")}
                />
                <ListOrdered
                  className="w-4 h-4 cursor-pointer hover:text-[#820000]"
                  onClick={() => applyFormat("insertOrderedList")}
                />
                <Quote
                  className="w-4 h-4 cursor-pointer hover:text-[#820000]"
                  onClick={() => applyFormat("formatBlock", "blockquote")}
                />
                <Code
                  className="w-4 h-4 cursor-pointer hover:text-[#820000]"
                  onClick={() => applyFormat("formatBlock", "pre")}
                />
              </div>

              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning={true}
                className="w-full min-h-[120px] p-3 text-sm focus:outline-none"
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
              />
            </div>
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
              onClick={() => {
                setTitle("");
                setContent("");
                setSelectedCommunity("Select a community");
                setSelectedCommunityId(null);
                if (editorRef.current) editorRef.current.innerHTML = "";
              }}
            >
              Reset
            </button>
            <button
              className="px-3 py-1 text-xs font-semibold bg-[#820000] text-white rounded hover:bg-red-700 transition"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
