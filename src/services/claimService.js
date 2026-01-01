import api from "./api";

export const getClaims = async (params) => {
  const response = await api.get("/claims", { params });
  return response.data.data;
};

export const getClaimById = async (id) => {
  const response = await api.get(`/claims/${id}`);
  return response.data.data;
};

export const createClaim = async (data) => {
  const response = await api.post("/claims", data);
  return response.data.data;
};

export const updateClaim = async (id, data) => {
  const response = await api.patch(`/claims/${id}`, data);
  return response.data.data;
};

export const uploadClaimDocument = async (id, formData) => {
  const response = await api.post(`/claims/${id}/documents`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};
