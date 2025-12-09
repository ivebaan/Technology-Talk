import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { getCommentsCountForPost } from "../api/postComments";

const API_BASE = "http://localhost:8081";

const PostPage = () => {
  const { postId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE}/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        setError("Failed to load post.");
      }
    };
    fetchPost();
  }, [postId]);

  // Fetch comments for this post and comment count
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_BASE}/comments`);
        // Filter comments for this post
        const filtered = res.data.filter(
          (c) => c.post && c.post.postId === Number(postId)
        );
        setComments(filtered);
        const count = await getCommentsCountForPost(Number(postId));
        setCommentCount(count);
      } catch (err) {
        setComments([]);
        setCommentCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  // Add a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;
    try {
      await axios.post(`${API_BASE}/comments`, {
        content: newComment,
        user: { userId: currentUser.id },
        post: { postId: Number(postId) },
      });
      setNewComment("");
      // Refresh comments and count
      const res = await axios.get(`${API_BASE}/comments`);
      const filtered = res.data.filter(
        (c) => c.post && c.post.postId === Number(postId)
      );
      setComments(filtered);
      const count = await getCommentsCountForPost(Number(postId));
      setCommentCount(count);
    } catch (err) {
      setError("Failed to add comment.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!post) return <div className="p-8">Post not found.</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : post ? (
        <>
          <div className="bg-gradient-to-br from-[#f6d365] to-[#fda085] rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-[#820000]">
                {post.title}
              </h2>
              <span className="bg-[#820000] text-white px-2 py-1 rounded text-xs font-medium">
                {post.community?.name}
              </span>
            </div>
            <p className="text-gray-800 mb-4">{post.content}</p>
            <div className="flex gap-6 text-sm text-gray-700">
              <span>Votes: {post.votes}</span>
              <span>Comments: {commentCount}</span>
              <span>Created: {post.dateCreated?.slice(0, 10)}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <div className="mb-4">
              <textarea
                className="w-full border rounded p-2"
                rows={3}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button
                className="mt-2 px-4 py-2 bg-[#820000] text-white rounded hover:bg-[#a83232]"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>
            {comments.length === 0 ? (
              <div className="text-gray-500">No comments yet.</div>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li key={comment.commentId} className="border-b pb-2">
                    <div className="font-semibold text-[#820000]">
                      {comment.user?.displayName || "User"}
                    </div>
                    <div className="text-gray-800">{comment.content}</div>
                    <div className="text-xs text-gray-400">
                      {comment.dateCommented?.replace("T", " ").slice(0, 16)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">Post not found.</div>
      )}
    </div>
  );
};

export default PostPage;
