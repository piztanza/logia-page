import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToHashElement() {
  const location = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    const hash = location.hash;
    
    if (hash) {
      // Remove the '#' from the hash
      const id = hash.replace('#', '');
      
      // Use setTimeout to ensure the DOM has been updated
      setTimeout(() => {
        const element = document.getElementById(id);
        
        if (element) {
          // Get the element's position
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 76; // 76px is the header height
          
          // Scroll to the element with smooth behavior, accounting for fixed header
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
      
      lastHash.current = hash;
    }
  }, [location]);

  return null;
}

