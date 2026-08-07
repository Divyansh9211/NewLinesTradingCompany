import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global ScrollToTop component for React Router v6.
 * Listens to pathname and search query changes and automatically
 * scrolls the window to (0, 0) on every route navigation.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}
