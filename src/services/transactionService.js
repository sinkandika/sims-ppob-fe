import api from "./api";

// get api transaction

//transaction (https://take-home-test-api.nutech-integrasi.com/transaction)
export const createTransaction = async (serviceCode) => {
  const response = await api.post("/transaction", {
    service_code: serviceCode,
  });
  return response.data;
};
