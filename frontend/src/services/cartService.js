import api from './api';

export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity = 1) =>
    api.post('/cart', { productId, quantity }),
  updateQuantity: (productId, quantity) =>
    api.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete('/cart/clear'),
};
