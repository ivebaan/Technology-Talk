import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { getCommentsCountForPost, updateComment, deleteComment } from "../api/api";

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

  // Fetch comments for this post and comment count (function moved to top-level)
  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/comments`);
      const filtered = res.data.filter((c) => c.post && c.post.postId === Number(postId));
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

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Editing state for inline comments
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

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
    <div className="bg-gray-50 min-h-screen py-4">
      <div className="max-w-2xl mx-auto px-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : post ? (
          <>
            {/* Post Header */}
            <div className="bg-white rounded-xl shadow-md border-l-4 border-[#820000] p-6 mb-4">
              <div className="flex justify-between items-start gap-3 mb-3">
                <h2 className="text-lg font-bold text-gray-900 flex-1">
                  {post.title}
                </h2>
                <span className="bg-[#820000] text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap">
                  {post.community?.name}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-4">{post.content}</p>
              <div className="flex gap-4 text-xs text-gray-600">
                <span>Votes: {post.votes}</span>
                <span>Comments: {commentCount}</span>
                <span>{post.dateCreated?.slice(0, 10)}</span>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Comments</h3>
              
              {/* Comment Form */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <textarea
                  className="w-full text-sm bg-white border border-gray-200 rounded-lg p-3 mb-2 resize-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#820000] focus:border-[#820000]"
                  rows={2}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
                <button
                  className="px-3 py-2 bg-[#820000] text-white text-xs font-semibold rounded-lg hover:shadow-md transition"
                  onClick={handleAddComment}
                >
                  Post
                </button>
              </div>

              {/* Comments List */}
              {comments.length === 0 ? (
                <div className="text-xs text-gray-500">No comments yet.</div>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.commentId} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-start gap-3">
                        <div className="text-xs font-semibold text-[#820000]">{comment.user?.displayName || "User"}</div>
                        <div className="text-xs text-gray-500">{comment.dateCommented?.replace("T", " ").slice(0, 16)}</div>
                      </div>
                      <div className="mt-3 text-sm text-gray-700">
                        {editingCommentId === comment.commentId ? (
                          <textarea
                            className="w-full text-sm bg-white border border-gray-200 rounded-2xl p-3 resize-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#820000]"
                            rows={3}
                            value={editingCommentContent}
                            onChange={(e) => setEditingCommentContent(e.target.value)}
                          />
                        ) : (
                          comment.content
                        )}
                      </div>
                      {currentUser?.id === comment.user?.userId && (
                        <div className="mt-3 flex items-center gap-2">
                          {editingCommentId === comment.commentId ? (
                            <>
                              <button
                                className="px-3 py-2 bg-[#820000] text-white text-xs font-semibold rounded-lg hover:shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
                                onClick={async () => {
                                  if (!editingCommentContent.trim()) return;
                                  try {
                                    const payload = {
                                      content: editingCommentContent,
                                      post: comment.post,
                                      user: comment.user,
                                      dateCommented: comment.dateCommented,
                                    };
                                    await updateComment(comment.commentId, payload);
                                    setEditingCommentId(null);
                                    setEditingCommentContent("");
                                    await fetchComments();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                disabled={!editingCommentContent.trim()}
                              >
                                Save
                              </button>
                              <button
                                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs"
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditingCommentContent("");
                                }}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="px-3 py-2 border border-gray-200 text-[#820000] rounded-lg text-xs"
                                onClick={() => {
                                  setEditingCommentId(comment.commentId);
                                  setEditingCommentContent(comment.content);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs"
                                onClick={async () => {
                                  if (!window.confirm("Delete this comment?")) return;
                                  try {
                                    await deleteComment(comment.commentId);
                                    await fetchComments();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">Post not found.</div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
