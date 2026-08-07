import api from './api';

export const productService = {
  getAll: (params) => api.get('/products', { params }),
  getBySlug: (slug) => api.get(`/products/${slug}`),
  getById: (id) => api.get(`/products/${id}`),
  search: (q) => api.get('/products', { params: { search: q } }),
};
