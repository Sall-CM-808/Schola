import { useState, useEffect } from 'react';

/**
 * Hook pour éviter les erreurs d'hydratation avec Math.random()
 * Retourne true uniquement côté client après le premier rendu
 */
export const useClientSideAnimations = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
