import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistService } from '../services/wishlistService';
import { useAuth } from './AuthContext';
import { getProductByIdOrSlug } from '../utils/productData';

const WishlistContext = createContext(null);

/**
 * Bulletproof helper to match product identifiers, ensuring no false positives or "undefined" collisions.
 */
export function matchesProductIdentifier(item, target) {
  if (!item || !target) return false;

  let targetKeys = [];
  if (typeof target === 'object' && target !== null) {
    if (target.id) targetKeys.push(String(target.id).trim().toLowerCase());
    if (target._id) targetKeys.push(String(target._id).trim().toLowerCase());
    if (target.productId) targetKeys.push(String(target.productId).trim().toLowerCase());
    if (target.slug) targetKeys.push(String(target.slug).trim().toLowerCase());
    if (target.sku) targetKeys.push(String(target.sku).trim().toLowerCase());
  } else if (target !== undefined && target !== null && String(target).trim() !== '' && String(target) !== 'undefined') {
    targetKeys.push(String(target).trim().toLowerCase());
  }

  if (targetKeys.length === 0) return false;

  const itemKeys = [
    item.id ? String(item.id).trim().toLowerCase() : null,
    item._id ? String(item._id).trim().toLowerCase() : null,
    item.productId ? String(item.productId).trim().toLowerCase() : null,
    item.slug ? String(item.slug).trim().toLowerCase() : null,
    item.sku ? String(item.sku).trim().toLowerCase() : null,
    item.numericId ? String(item.numericId).trim().toLowerCase() : null,
  ].filter((k) => k && k !== 'undefined');

  return targetKeys.some((tk) => itemKeys.includes(tk));
}

export function WishlistProvider({ children }) {
  const { isLoggedIn, user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getStorageKey = useCallback(() => {
    return user && (user._id || user.id)
      ? `nltc_wishlist_${user._id || user.id}`
      : 'nltc_wishlist_guest';
  }, [user]);

  // Load from local storage cache
  const loadLocalCache = useCallback(() => {
    try {
      const key = getStorageKey();
      const cached = localStorage.getItem(key);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setWishlistItems(parsed);
          setWishlistCount(parsed.length);
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

  const isWishlisted = useCallback(
    (productOrId) => {
      if (!productOrId) return false;
      return wishlistItems.some((item) => matchesProductIdentifier(item, productOrId));
    },
    [wishlistItems]
  );

  const addToWishlist = async (productOrId) => {
    const fullProduct = typeof productOrId === 'object' && productOrId !== null
      ? productOrId
      : getProductByIdOrSlug(productOrId);

    const already = isWishlisted(fullProduct);
    if (!already) {
      const updated = [fullProduct, ...wishlistItems];
      setWishlistItems(updated);
      setWishlistCount(updated.length);
      saveLocalCache(updated);
    }

    if (isLoggedIn) {
      try {
        const apiId = fullProduct._id || fullProduct.id || fullProduct.slug;
        await wishlistService.addToWishlist(apiId);
      } catch {
        // Keep persistent local state
      }
    }

    return { success: true, message: 'Added to wishlist' };
  };

  const removeFromWishlist = async (productOrId) => {
    const updated = wishlistItems.filter((item) => !matchesProductIdentifier(item, productOrId));
    setWishlistItems(updated);
    setWishlistCount(updated.length);
    saveLocalCache(updated);

    if (isLoggedIn) {
      try {
        const fullProduct = typeof productOrId === 'object' && productOrId !== null
          ? productOrId
          : getProductByIdOrSlug(productOrId);
        const apiId = fullProduct?._id || fullProduct?.id || productOrId;
        await wishlistService.removeFromWishlist(apiId);
      } catch {
        // Keep persistent local state
      }
    }

    return { success: true, message: 'Removed from wishlist' };
  };

  const toggleWishlist = async (productOrId) => {
    if (isWishlisted(productOrId)) {
      return await removeFromWishlist(productOrId);
    } else {
      return await addToWishlist(productOrId);
    }
  };

  const clearWishlist = async () => {
    setWishlistItems([]);
    setWishlistCount(0);
    saveLocalCache([]);
    if (isLoggedIn) {
      try {
        await wishlistService.clearWishlist();
      } catch {
        // Ignore
      }
    }
    return { success: true };
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        loading,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

export default WishlistContext;
