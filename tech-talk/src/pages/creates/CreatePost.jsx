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
import {
  createPost,
  getAllCommunities,
  getJoinedCommunities,
} from "../../api/api";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Popup from "../../components/cards/Popup";

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
  const [isMember, setIsMember] = useState(false);
  const [joinedIds, setJoinedIds] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [popup, setPopup] = useState(null);
  const location = useLocation();

  const editorRef = useRef(null);

  useEffect(() => {
    getAllCommunities()
      .then((res) => setCommunities(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Keep joinedIds in sync with currentUser (run on login/change)
  useEffect(() => {
    if (currentUser) {
      getJoinedCommunities(currentUser.id)
        .then((r) => {
          const ids = r.data.map(
            (j) => j.community?.communityId || j.community?.id
          );
          setJoinedIds(ids);
        })
        .catch(() => setJoinedIds([]));
    } else {
      setJoinedIds([]);
    }
  }, [currentUser]);

  // If navigated from a community page, preselect that community
  useEffect(() => {
    if (location?.state?.communityId) {
      const id = location.state.communityId;
      const name =
        location.state.communityName || location.state.community || null;
      if (id) {
        setSelectedCommunityId(id);
        if (name) setSelectedCommunity(name);
      }
    }
  }, [location]);

  // Check membership for selected community when user or selectedCommunityId changes
  useEffect(() => {
    const checkMembership = async () => {
      if (!currentUser || !selectedCommunityId) {
        setIsMember(false);
        return;
      }

      try {
        const res = await getJoinedCommunities(currentUser.id);
        const joinedIds = res.data.map(
          (j) => j.community?.communityId || j.community?.id
        );
        setIsMember(joinedIds.includes(selectedCommunityId));
      } catch (err) {
        console.error("Error checking membership:", err);
        setIsMember(false);
      }
    };

    checkMembership();
  }, [currentUser, selectedCommunityId]);

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
      setPopup({ message: "Please select a community!", type: "warning" });
      valid = false;
    }

    if (!currentUser) {
      setPopup({ message: "You must be logged in to post.", type: "warning" });
      valid = false;
    }

    // Ensure user is a member of the selected community
    if (selectedCommunityId && currentUser && !isMember) {
      setPopup({
        message: "You must join the selected community to post.",
        type: "warning",
      });
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
        setPopup({ message: "Successfully Posted!", type: "success" });
      })
      .catch((err) => console.error("Error creating post:", err));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-bold text-gray-900 mb-4">Create Post</h1>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
          {/* Community Dropdown */}
          <div className="relative">
            <label className="text-xs font-semibold text-gray-900 block mb-2">
              Community
            </label>
            <button
              className="flex items-center justify-between gap-2 border border-gray-200 px-3 py-2 w-full rounded-lg bg-white text-xs text-gray-900 hover:border-[#820000] focus:outline-none focus:ring-1 focus:ring-[#820000] transition"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <span className="truncate">{selectedCommunity}</span>
              <span className="text-sm flex-shrink-0">▾</span>
            </button>

            {openDropdown && (
              <div className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md z-20 max-h-48 overflow-y-auto">
                {communities.map((c) => {
                  const id = c.communityId || c.id;
                  const name =
                    c.name || c.communityName || c.title || "Unknown";
                  const joined = joinedIds.includes(id);
                  return (
                    <button
                      key={id}
                      className="px-3 py-2 text-left w-full text-xs text-gray-900 hover:bg-gray-50 transition flex items-center justify-between"
                      onClick={() => {
                        setSelectedCommunity(name);
                        setSelectedCommunityId(id);
                        setOpenDropdown(false);
                      }}
                    >
                      <span>{name}</span>
                      {!joined && (
                        <span className="text-xs text-gray-400 ml-2">
                          (Not joined)
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="text-xs font-semibold text-gray-900 block mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={300}
              className={`w-full text-sm px-3 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#820000] ${titleColor}`}
            />
            <div className="text-xs text-gray-500 text-right mt-1">
              {title.length}/300
            </div>
            {errors.title && (
              <p className="text-red-600 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Content Editor */}
          <div>
            <label className="text-xs font-semibold text-gray-900 block mb-2">
              Content
            </label>
            <div
              className={`border rounded-lg overflow-hidden ${contentColor}`}
            >
              <div className="flex gap-2 px-3 py-2 border-b bg-gray-100 text-gray-700 text-sm">
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
                className="w-full min-h-[120px] p-3 text-sm text-gray-900 bg-white focus:outline-none"
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
              />
            </div>
            {errors.content && (
              <p className="text-red-600 text-xs mt-1">{errors.content}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-3 py-2 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
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
              className="px-3 py-2 text-xs font-semibold bg-[#820000] text-white rounded-lg hover:shadow-md transition"
              onClick={handlePost}
            >
              Post
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
