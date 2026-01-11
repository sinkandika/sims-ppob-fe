import api from "./api";

// get api transaction

export const createTransaction = async (serviceCode) => {
  const response = await api.post("/transaction", {
    service_code: serviceCode,
  });
  return response.data;
};
