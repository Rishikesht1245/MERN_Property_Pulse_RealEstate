import axios from "axios";

export const registerUser = async (formData) => {
  return await axios.post("/api/auth/signup", formData);
};

export const loginUser = async (formData) => {
  return await axios.post("/api/auth/signin", formData);
};

export const googleOAuth = async (formData) => {
  return await axios.post("/api/auth/google", formData);
};

export const getUser = async (userId) => {
  return await axios.get(`/api/user/${userId}`);
};
export const updateUser = async (formData, id) => {
  return await axios.post(`/api/user/update/${id}`, formData);
};

export const deleteUser = async (id) => {
  return await axios.delete(`/api/user/delete/${id}`);
};

export const createListing = async (formData) => {
  return await axios.post("/api/listing/create", formData);
};

export const getAllListings = async (id) => {
  return await axios.get(`/api/user/listings/${id}`);
};

export const deleteListing = async (listingId) => {
  return await axios.delete(`/api/listing/delete/${listingId}`);
};

export const getListing = async (listingId) => {
  return await axios.get(`/api/listing/view/${listingId}`);
};

export const updateListing = async (formData, listingId) => {
  return await axios.post(`/api/listing/update/${listingId}`, formData);
};

export const getSearchedListings = async (searchQuery) => {
  return await axios.get(`/api/listing/get?${searchQuery}`);
};

export const getAllConversations = async (userId) => {
  return await axios.get(`/api/conversation/${userId}`);
};

export const getAllMessages = async (conversationId) => {
  return await axios.get(`/api/conversation/messages/${conversationId}`);
};

export const sendMessage = async (message) => {
  return await axios.post("/api/conversation/message", message);
};

// create or get existing conversation
export const getOrCreateConversation = async (userId, ownerId, listingId) => {
  return await axios.post(`/api/conversation/create`, {
    userId,
    ownerId,
    listingId,
  });
};
