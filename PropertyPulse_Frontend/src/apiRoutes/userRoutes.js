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
