import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllPosts, updatePost } from "../../api/api";
import Popup from "../../components/cards/Popup";

function PostEdit() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    getAllPosts()
      .then((res) => {
        const found = res.data.find((p) => String(p.id) === String(postId));
        if (found) {
          setPost(found);
          setTitle(found.title);
          setContent(found.content);
        } else {
          setError("Post not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch post.");
        setLoading(false);
      });
  }, [postId]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updatePost(postId, { title, content });
      setPopup({ message: "Post updated successfully!", type: "success" });
      setTimeout(() => navigate(`/app/post/${postId}`), 1500);
    } catch (err) {
      setPopup({ message: "Failed to save post.", type: "error" });
      setError("Failed to save post.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-bold text-gray-900 mb-4">Edit Post</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#820000] focus:border-[#820000]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 min-h-[150px] resize-none focus:outline-none focus:ring-1 focus:ring-[#820000] focus:border-[#820000]"
                rows={6}
                required
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="px-3 py-2 bg-[#820000] text-white text-xs font-medium rounded-lg hover:shadow-md transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="px-3 py-2 bg-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-300 transition"
                onClick={() => navigate(`/app/post/${postId}`)}
              >
                Cancel
              </button>
            </div>
          </form>
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

export default PostEdit;
