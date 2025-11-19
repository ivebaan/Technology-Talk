import React, { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link,
  Image as ImageIcon,
  List,
  ListOrdered,
  Code,
  Quote,
} from "lucide-react";
import axios from "axios";

export default function CreatePost() {
  const [activeTab, setActiveTab] = useState("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({ title: "", content: "" });
  const [data, setData] = useState([]);
  const [titleColor, setTitleColor] = useState("border-gray-300");
  const [contentColor, setContentColor] = useState("border-gray-300");
  const tabs = [
    { id: "text", label: "Text" },
    { id: "media", label: "Images & Video" },
    { id: "link", label: "Link" },
    { id: "poll", label: "Poll" },
  ];

  const handlePost = () => {
    const newErrors = { title: "", content: "" };
    let valid = true;

    if (!content) {
      newErrors.content = "Content cannot be empty!";
      valid = false;
      setContentColor("border-red-500");
    }
    if (!title) {
      newErrors.title = "Title cannot be empty!";
      valid = false;
      setTitleColor("border-red-500");
    }

    setErrors(newErrors);
    if (!valid) return;

    axios
      .post("http://localhost:3000/posts", {
        title: title,
        content: content,
        author: "u/teknoypogi",
        community: "r/Philippines",
        votes: 0,
        comments: 0,
        verified: true,
        isFavorite: false,
      })
      .then((res) => {
        setData(res.data);
        setTitle("");
        setContent("");
        setErrors({ title: "", content: "" });
        setContentColor("border-gray-300");
        setTitleColor("border-gray-300");
        alert("Successfully Posted!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full flex flex-col max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create post</h1>

      <div className="mb-6">
        <button className="flex items-center gap-2 border px-4 py-2 rounded-full hover:bg-gray-100">
          <div className="w-6 h-6 rounded-full bg-black"></div>
          <span className="text-sm">Select a community</span>
          <span className="text-xl -mt-[2px]">▾</span>
        </button>
      </div>
      
      <div className="flex gap-6 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-sm font-medium border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "border-[#820000] text-[#820000]"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Title Input */}
      <div
        className={`rounded-xl p-3 mb-2 border ${titleColor} hover:border-black`}
      >
        <input
          type="text"
          placeholder="Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={300}
          className="w-full outline-none"
        />
        <div className="text-xs text-gray-400 text-right">
          {title.length}/300
        </div>
      </div>
      <p className="text-red-500 text-sm w-full mb-2 pl-2">{errors.title}</p>

      {/* Add Tags */}
      <button className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 mb-3 w-fit">
        Add tags
      </button>

      <div
        className={`border rounded-xl overflow-hidden ${contentColor} hover:border-black`}
      >
        <div className="flex gap-3 px-3 py-2 border-b border-gray-300 bg-gray-50 text-gray-700 text-sm ">
          <Bold className="w-4 h-4 cursor-pointer" />
          <Italic className="w-4 h-4 cursor-pointer" />
          <Underline className="w-4 h-4 cursor-pointer" />
          <Link className="w-4 h-4 cursor-pointer" />
          <ImageIcon className="w-4 h-4 cursor-pointer" />
          <List className="w-4 h-4 cursor-pointer" />
          <ListOrdered className="w-4 h-4 cursor-pointer" />
          <Quote className="w-4 h-4 cursor-pointer" />
          <Code className="w-4 h-4 cursor-pointer" />
        </div>

        <textarea
          value={content}
          placeholder="Body text (optional)"
          onChange={(e) => setContent(e.target.value)}
          className={`w-full min-h-[200px] p-4 focus:outline-none`}
        ></textarea>
      </div>
      <p className="text-red-500 text-sm w-full my-2 pl-2">{errors.content}</p>

      <div className="flex justify-end gap-3 mt-4">
        <button className="px-5 py-2 rounded-full bg-gray-300 text-sm hover:bg-[#820000] font-bold cursor-pointer hover:text-white">
          Save Draft
        </button>
        <button
          className="px-5 py-2 rounded-full bg-[#820000] font-bold text-white text-sm hover:bg-white hover:text-black cursor-pointer"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
