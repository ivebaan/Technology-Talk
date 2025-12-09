import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllPosts, updatePost } from "../api/api";

function PostEdit() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      navigate(`/app/post/${postId}`);
    } catch (err) {
      setError("Failed to save post.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={6}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          type="button"
          className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={() => navigate(`/app/post/${postId}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default PostEdit;
