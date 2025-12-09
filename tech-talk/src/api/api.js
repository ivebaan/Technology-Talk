// Get posts by user
export const getUserPosts = (userId) => API.get(`/posts/user/${userId}`);
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081", // Spring Boot backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Users
export const getAllUsers = () => API.get("/users");
export const createUser = (userData) => API.post("/users", userData);

// Communities
export const getAllCommunities = () => API.get("/community");
export const getCommunityByName = (name) => API.get(`/community/name/${name}`);
export const createCommunity = (communityData) =>
  API.post("/community", communityData);

// Posts
export const getAllPosts = () => API.get("/posts/getAll");
export const createPost = (postData) => API.post("/posts", postData);
export const updatePost = (postId, postData) =>
  API.put(`/posts/update/${postId}`, postData);
export const deletePost = (postId) => API.delete(`/posts/delete/${postId}`);
// Add userId to favorites if available

export const votePost = (postId, type, userId) =>
  API.patch(`/posts/${postId}/vote?type=${type}&userId=${userId}`);

// Categories
export const getAllCategories = () => API.get("/categories");

// UserCommunity (join/leave communities)
export const joinCommunity = (userId, communityId) =>
  API.post("/usercommunity", null, { params: { userId, communityId } });

export const leaveCommunity = (userId, communityId) =>
  API.delete("/usercommunity", { params: { userId, communityId } });

export const getJoinedCommunities = (userId) =>
  API.get(`/usercommunity/user/${userId}`);

export const getUsersInCommunity = (communityId) =>
  API.get(`/usercommunity/community/${communityId}`);

// Favorites
export const getAllFavorites = () => API.get("/favorites");

// Add userId to favorites
export const addToFavorites = (postId, userId) =>
  API.post("/favorites", { postId, userId });

// Delete favorite by userId & postId
export const deleteFavoriteByUserAndPost = (userId, postId) =>
  API.delete("/favorites/delete-by-user-post", { data: { userId, postId } });

// Delete favorite by ID
export const deleteFavoriteById = (favoriteId) =>
  API.delete(`/favorites/delete/${favoriteId}`);


export default API;
