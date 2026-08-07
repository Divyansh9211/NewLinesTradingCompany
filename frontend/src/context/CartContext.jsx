import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';
import { getProductByIdOrSlug } from '../utils/productData';
import { matchesProductIdentifier } from './WishlistContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isLoggedIn, user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getStorageKey = useCallback(() => {
    return user && (user._id || user.id)
      ? `nltc_cart_${user._id || user.id}`
      : 'nltc_cart_guest';
  }, [user]);

  // Load from local storage cache
  const loadLocalCache = useCallback(() => {
    try {
      const key = getStorageKey();
      const cached = localStorage.getItem(key);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
          setCartCount(parsed.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0));
          setCartTotal(
            parsed.reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0)
          );
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, [getStorageKey]);

  // Save to local storage cache
  const saveLocalCache = useCallback(
    (items) => {
      try {
        const key = getStorageKey();
        localStorage.setItem(key, JSON.stringify(items));
      } catch {
        // Ignore storage errors
      }
    },
    [getStorageKey]
  );

  useEffect(() => {
    loadLocalCache();
  }, [loadLocalCache]);

  const recalculateCart = (items) => {
    const count = items.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0);
    const total = items.reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0);
    setCartItems(items);
    setCartCount(count);
    setCartTotal(total);
    saveLocalCache(items);
  };

  const addToCart = async (productOrId, quantity = 1) => {
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);
    const fullProduct =
      typeof productOrId === 'object' && productOrId !== null
        ? productOrId
        : getProductByIdOrSlug(productOrId);

    const existingIndex = cartItems.findIndex((item) => matchesProductIdentifier(item, fullProduct));

    let updated;
    if (existingIndex > -1) {
      updated = cartItems.map((item, idx) => {
        if (idx === existingIndex) {
          const newQ = (Number(item.quantity) || 1) + qtyToAdd;
          const price = Number(item.price) || 199;
          return {
            ...item,
            quantity: newQ,
            itemTotal: price * newQ,
          };
        }
        return item;
      });
    } else {
      const price = Number(fullProduct.price) || 199;
      const newItem = {
        ...fullProduct,
        quantity: qtyToAdd,
        itemTotal: price * qtyToAdd,
      };
      updated = [newItem, ...cartItems];
    }

    recalculateCart(updated);

    if (isLoggedIn) {
      try {
        const apiId = fullProduct._id || fullProduct.id || fullProduct.slug;
        await cartService.addToCart(apiId, qtyToAdd);
      } catch {
        // Keep optimistic state
      }
    }

    return { success: true, message: 'Added to cart successfully' };
  };

  const updateQuantity = async (productOrId, newQty) => {
    const targetQty = Math.max(1, parseInt(newQty, 10) || 1);

    const updated = cartItems.map((item) => {
      if (matchesProductIdentifier(item, productOrId)) {
        const price = Number(item.price) || 0;
        return {
          ...item,
          quantity: targetQty,
          itemTotal: price * targetQty,
        };
      }
      return item;
    });

    recalculateCart(updated);

    if (isLoggedIn) {
      try {
        const fullProduct = typeof productOrId === 'object' && productOrId !== null
          ? productOrId
          : getProductByIdOrSlug(productOrId);
        const apiId = fullProduct?._id || fullProduct?.id || productOrId;
        await cartService.updateQuantity(apiId, targetQty);
      } catch {
        // Keep optimistic state
      }
    }

    return { success: true };
  };

  const removeFromCart = async (productOrId) => {
    const updated = cartItems.filter((item) => !matchesProductIdentifier(item, productOrId));
    recalculateCart(updated);

    if (isLoggedIn) {
      try {
        const fullProduct = typeof productOrId === 'object' && productOrId !== null
          ? productOrId
          : getProductByIdOrSlug(productOrId);
        const apiId = fullProduct?._id || fullProduct?.id || productOrId;
        await cartService.removeFromCart(apiId);
      } catch {
        // Keep optimistic state
      }
    }

    return { success: true, message: 'Item removed from cart' };
  };

  const clearCart = async () => {
    recalculateCart([]);
    if (isLoggedIn) {
      try {
        await cartService.clearCart();
      } catch {
        // Ignore
      }
    }
    return { success: true };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
