'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; 

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [pathname]); 

  return null; 
}