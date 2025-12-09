import axios from "axios";

const API_BASE = "http://localhost:8081";

export const getUserComments = async (userId) => {
  const res = await axios.get(`${API_BASE}/comments`);
  return res.data.filter((c) => c.user && c.user.userId === userId);
};
