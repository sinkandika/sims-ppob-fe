import api from "./api";

// get api topup

export const topupBalance = async (amount) => {
  const response = await api.post("/topup", {
    top_up_amount: amount,
  });
  return response.data;
};
