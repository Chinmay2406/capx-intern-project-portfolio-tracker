import { useState, useEffect } from 'react';
import { getUser, onAuthStateChange } from '../lib/auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = onAuthStateChange((session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await getUser();
    setIsAuthenticated(!!user);
  };

  return { isAuthenticated, setIsAuthenticated };
}