import api from "./api";

export const createTransaction = async (data) => {
  // data: { policyId, type, amount, paymentMethod, referenceNumber, date }
  const response = await api.post("/finance/transactions", data);
  return response.data.data;
};

export const getPolicyStatement = async (policyId) => {
  const response = await api.get(`/finance/policy/${policyId}`);
  return response.data.data;
};

export const getFinancialReport = async (params) => {
  // params: { startDate, endDate }
  const response = await api.get("/finance/report", { params });
  return response.data.data;
};
