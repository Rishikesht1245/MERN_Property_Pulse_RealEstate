import axios from "axios";

export const loginUser = async (formData) => {
  return await axios.post("/api/admin/signin", formData);
};

export const getAllUsers = async () => {
  return await axios.get("/api/admin/users");
};

export const blockOrUnblockUser = async (id, action) => {
  return await axios.put(`/api/admin/users/${id}/${action}`);
};

export const getAllListings = async () => {
  return await axios.get("/api/admin/listings");
};

export const blockOrUnblockListing = async (id, action) => {
  return await axios.put(`/api/admin/listings/${id}/${action}`);
};
