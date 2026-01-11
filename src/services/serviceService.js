import api from "./api";

// get api service

// service (https://take-home-test-api.nutech-integrasi.com/service)
export const getServices = async () => {
  const response = await api.get("/services");
  return response.data.data; // only array
};
