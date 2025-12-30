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

export const updateClient = async (id, clientData) => {
  const response = await api.patch(`/clients/${id}`, clientData);
  return response.data.data;
};

export const uploadClientDocument = async (id, formData) => {
  // formData must contain 'document' and 'docType'
  const response = await api.post(`/clients/${id}/documents`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};
