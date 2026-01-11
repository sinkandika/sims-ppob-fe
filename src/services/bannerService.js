import api from "./api"

// get api banner

export const getBanners = async () => {
  const response = await api.get("/banner");
  return response.data.data;
};