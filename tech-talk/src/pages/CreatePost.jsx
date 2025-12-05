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
import axios from "axios";
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
  const [selectedCommunity, setSelectedCommunity] = useState("Select a community");
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const editorRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/community/getAll")
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

    axios
      .post("http://localhost:8081/posts/create", {
        title: title,
        content: content,
        userId: currentUser.id,      
        communityId: selectedCommunityId,
      })
      .then(() => {
        setTitle("");
        setContent("");
        setSelectedCommunity("Select a community");
        setSelectedCommunityId(null);
        if (editorRef.current) editorRef.current.innerHTML = "";
        alert("Successfully Posted!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full flex flex-col max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create post</h1>

      {/* Community Dropdown */}
      <div className="mb-6 relative">
        <button
          className="flex items-center justify-between gap-2 border px-4 py-2 w-full rounded-full hover:bg-gray-100"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <span className="text-sm">{selectedCommunity}</span>
          <span className="text-xl">▾</span>
        </button>

        {openDropdown && (
          <div className="absolute top-12 left-0 w-full bg-white border rounded-xl shadow-lg z-20">
            {communities.map((c) => (
              <button
                key={c.id}
                className="p-3 text-left w-full hover:bg-gray-100"
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

      {/* Tabs */}
      <div className="flex gap-6 mb-4">
        {["text", "media", "link", "poll"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium border-b-2 transition ${
              activeTab === tab
                ? "border-[#820000] text-[#820000]"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Title Input */}
      <div className={`rounded-xl p-3 mb-2 border ${titleColor} hover:border-black`}>
        <input
          type="text"
          placeholder="Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={300}
          className="w-full outline-none"
        />
        <div className="text-xs text-gray-400 text-right">{title.length}/300</div>
      </div>
      <p className="text-red-500 text-sm w-full mb-2 pl-2">{errors.title}</p>

      {/* CONTENT EDITOR */}
      <div className={`border rounded-xl overflow-hidden ${contentColor} hover:border-black`}>
        <div className="flex gap-3 px-3 py-2 border-b bg-gray-50 text-gray-700 text-sm">
          <Bold className="w-4 h-4 cursor-pointer" onClick={() => applyFormat("bold")} />
          <Italic className="w-4 h-4 cursor-pointer" onClick={() => applyFormat("italic")} />
          <Underline className="w-4 h-4 cursor-pointer" onClick={() => applyFormat("underline")} />
          <LinkIcon
            className="w-4 h-4 cursor-pointer"
            onClick={() => {
              const url = prompt("Enter URL:");
              if (url) applyFormat("createLink", url);
            }}
          />
          <ImageIcon
            className="w-4 h-4 cursor-pointer"
            onClick={() => {
              const url = prompt("Enter Image URL:");
              if (url) applyFormat("insertImage", url);
            }}
          />
          <List className="w-4 h-4 cursor-pointer" onClick={() => applyFormat("insertUnorderedList")} />
          <ListOrdered className="w-4 h-4 cursor-pointer" onClick={() => applyFormat("insertOrderedList")} />
          <Quote className="w-4 h-4 cursor-pointer" onClick={() => applyFormat("formatBlock", "blockquote")} />
          <Code className="w-4 h-4 cursor-pointer" onClick={() => applyFormat("formatBlock", "pre")} />
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning={true}
          className="w-full min-h-[200px] p-4 focus:outline-none"
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
        />
      </div>

      <p className="text-red-500 text-sm w-full my-2 pl-2">{errors.content}</p>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button className="px-5 py-2 rounded-full bg-gray-300 text-sm hover:bg-[#820000] font-bold hover:text-white">
          Save Draft
        </button>
        <button
          className="px-5 py-2 rounded-full bg-[#820000] text-white font-bold text-sm hover:bg-white hover:text-black"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
