import api from "./api";

// get API for profile

export const getProfile = async () => {
  try {
    const response = await api.get("/profile");

    if (response.data.status === 0) {
      return response.data.data;
    }

    throw new Error(response.data.message);
  } catch (error) {
    if (error.status === 108) {
      throw new Error("UNAUTHORIZED");
    }
    throw error;
  }
};
