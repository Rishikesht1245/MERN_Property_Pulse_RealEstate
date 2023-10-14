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
