import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081", // Backend base URL
  headers: { "Content-Type": "application/json" },
});

// Users

// Get all users
export const getAllUsers = () => API.get("/users");

// Create a new user
export const createUser = (userData) => API.post("/users", userData);

// Update existing user
export const updateUser = (userId, data) => API.put(`/users/${userId}`, data);

// Communities

// Get all communities
export const getAllCommunities = () => API.get("/community");

// Get community by name
export const getCommunityByName = (name) => API.get(`/community/name/${name}`);

// Create a community
export const createCommunity = (communityData) =>
  API.post("/community", communityData);

// Posts

// Get all posts
export const getAllPosts = () => API.get("/posts/getAll");

// Create a post
export const createPost = (postData) => API.post("/posts", postData);

// Update a post
export const updatePost = (postId, postData) =>
  API.put(`/posts/update/${postId}`, postData);

// Delete a post
export const deletePost = (postId) => API.delete(`/posts/delete/${postId}`);

// Vote on post (upvote/downvote)
export const votePost = (postId, type, userId) =>
  API.patch(`/posts/${postId}/vote?type=${type}&userId=${userId}`);

// Get posts by user
export const getUserPosts = (userId) => API.get(`/posts/user/${userId}`);

// Categories

// Get all categories
export const getAllCategories = () => API.get("/categories");

// Create a new category
export const createCategory = (categoryData) =>
  API.post("/categories", categoryData);

// UserCommunity

// Join community
export const joinCommunity = (userId, communityId) =>
  API.post("/usercommunity", null, { params: { userId, communityId } });

// Leave community
export const leaveCommunity = (userId, communityId) =>
  API.delete("/usercommunity", { params: { userId, communityId } });

// Get all joined communities
export const getJoinedCommunities = (userId) =>
  API.get(`/usercommunity/user/${userId}`);

// Get all users in a community
export const getUsersInCommunity = (communityId) =>
  API.get(`/usercommunity/community/${communityId}`);

// ---------------- FAVORITES ----------------

// Get all favorites
export const getAllFavorites = () => API.get("/favorites");

// Add favorite
export const addToFavorites = (postId, userId) =>
  API.post("/favorites", { postId, userId });

// Remove favorite by user + post
export const deleteFavoriteByUserAndPost = (userId, postId) =>
  API.delete("/favorites/delete-by-user-post", { data: { userId, postId } });

// Remove favorite by ID
export const deleteFavoriteById = (favoriteId) =>
  API.delete(`/favorites/delete/${favoriteId}`);

// Comments

// Update comment
export const updateComment = (commentId, data) =>
  API.put(`/comments/${commentId}`, data);

// Delete comment
export const deleteComment = (commentId) =>
  API.delete(`/comments/${commentId}`);

// Count comments for a post
export const getCommentsCountForPost = async (postId) => {
  const res = await API.get(`/comments`);
  return res.data.filter((c) => c.post && c.post.postId === postId).length;
};

// Get comments by user
export const getUserComments = async (userId) => {
  const res = await API.get(`/comments`);
  return res.data.filter((c) => c.user && c.user.userId === userId);
};

export default API;
