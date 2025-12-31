import api from "./api";

export const getPolicies = async (params) => {
  // params: { page, limit, status, search, expiringSoon }
  const response = await api.get("/policies", { params });
  return response.data.data;
};

export const getPolicyById = async (id) => {
  const response = await api.get(`/policies/${id}`);
  return response.data.data;
};

export const createPolicy = async (data) => {
  const response = await api.post("/policies", data);
  return response.data.data;
};

export const updatePolicy = async (id, data) => {
  const response = await api.patch(`/policies/${id}`, data);
  return response.data.data;
};

export const deletePolicy = async (id) => {
  const response = await api.delete(`/policies/${id}`);
  return response.data.data;
};

export const uploadPolicyDocument = async (id, formData) => {
  const response = await api.post(`/policies/${id}/documents`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};
