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
