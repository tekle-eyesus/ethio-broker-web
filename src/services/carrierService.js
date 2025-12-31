import api from "./api";

export const getCarriers = async () => {
  const response = await api.get("/carriers");
  return response.data.data;
};

export const createCarrier = async (carrierData) => {
  const response = await api.post("/carriers", carrierData);
  return response.data.data;
};

export const updateCarrier = async (id, carrierData) => {
  const response = await api.patch(`/carriers/${id}`, carrierData);
  return response.data.data;
};

export const deleteCarrier = async (id) => {
  const response = await api.delete(`/carriers/${id}`);
  return response.data.data;
};
