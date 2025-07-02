// src/hooks/useAuth.js
import { useAuth as useAuthContext } from '../context/AuthContext';

/**
 * Custom hook to access auth state with optional future enhancements
 */
export const useAuth = () => {
  const auth = useAuthContext();

  // Example enhancements (uncomment and use if needed):
  // const isAgent = auth.user?.role === 'agent';
  // const isAdmin = auth.user?.role === 'admin';

  return {
    ...auth,
    // isAgent,
    // isAdmin
  };
};
