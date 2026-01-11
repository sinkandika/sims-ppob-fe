import api from "./api"

// get api banner

// banner (https://take-home-test-api.nutech-integrasi.com/banner)
export const getBanners = async () => {
  const response = await api.get("/banner");
  return response.data.data;
};