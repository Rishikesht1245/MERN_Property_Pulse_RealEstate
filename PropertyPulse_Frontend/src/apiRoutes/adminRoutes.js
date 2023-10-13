import axios from "axios";
export const loginUser = async (formData) => {
  return await axios.post("/api/admin/signin", formData);
};
