import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081",
});

export const getAllUsers = () => {
  return API.get("/users");
};
export const createUser = (userData) => {
  return API.post("/users", userData);
};
export const getAllCommunities = () => {
  return API.get("/community");
};
export const getAllPosts = () => {
  return API.get("/posts");
};
export const createPost = (postData) => {
  return API.post("/posts", postData);
};
export const getAllFavorites = () => {
  return API.get("/favorites");
};
export const deleteFavoriteById = (id) => {
  return API.delete(`/favorites/delete/${id}`);
};
export const addToFavorites = (postId) => {
  return API.post("/favorites", { postId });
};
export const getCommunityByName = (name) => {
  return API.get(`/community/name/${name}`);
};

export default API;
