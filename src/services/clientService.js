import api from "./api";

export const getClients = async (params) => {
  // params: { search, page, limit }
  const response = await api.get("/clients", { params });
  return response.data.data;
};

export const createClient = async (clientData) => {
  const response = await api.post("/clients", clientData);
  return response.data.data;
};

export const getClientById = async (id) => {
  const response = await api.get(`/clients/${id}`);
  return response.data.data;
};

export const deleteClient = async (id) => {
  const response = await api.delete(`/clients/${id}`);
  return response.data.data;
};
