"use client";

import { useEffect, useState } from 'react';

export const useClientSideAnimations = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
