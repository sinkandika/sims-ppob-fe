import api from "./api";

// get API for balance

export const getBalance = async () => {
  try {
    const res = await api.get("/balance");
    return res.data.data.balance;
  } catch (error) {
    if (error.status === 108) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error(error.message || "Gagal mengambil saldo");
  }
};
