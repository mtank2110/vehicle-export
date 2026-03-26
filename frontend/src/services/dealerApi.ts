import api from "./api";

export const dealerApi = {
  getAll: async () => {
    const response = await api.get("/dealers");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/dealers/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post("/dealers", data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/dealers/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/dealers/${id}`);
    return response.data;
  },
};