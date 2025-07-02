// hooks/useAuth.js
import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const auth = useAuthContext();

  // 🔒 Add additional auth logic here later if needed
  return auth;
};
