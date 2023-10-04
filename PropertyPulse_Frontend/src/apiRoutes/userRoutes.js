import axios from "axios";

export const registerUser = async (formData) => {
  return await axios.post("/api/auth/signup", formData);
};

export const loginUser = async (formData) => {
  return await axios.post("/api/auth/signin", formData);
};
