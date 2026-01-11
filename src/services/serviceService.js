import api from "./api";

// get api service

export const getServices = async () => {
  const response = await api.get("/services");
  return response.data.data; // only array
};
