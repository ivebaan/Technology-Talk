import axios from "axios";
const API_BASE = "http://localhost:8081";
export const getCommentsCountForPost = async (postId) => {
  const res = await axios.get(`${API_BASE}/comments`);
  return res.data.filter((c) => c.post && c.post.postId === postId).length;
};
