import api from "./api";

// fetch transaction history
export const getTransactionHistory = async (limit) => {
  const params = {};
  if (limit) params.limit = limit; 
  params.offset = 0; // always start at 0

  const response = await api.get("/transaction/history", { params });
  return response.data.data;
};
