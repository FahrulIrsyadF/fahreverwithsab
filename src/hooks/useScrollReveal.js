import { useState, useEffect, useRef } from 'react';

/**
 * Custom Hook untuk memicu animasi reveal saat elemen masuk ke viewport.
 * Menggunakan IntersectionObserver bawaan browser (0 KB additional bundle size).
 */
export function useScrollReveal(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve setelah trigger agar animasi tidak berulang dan menghemat CPU
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.12,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return [ref, isVisible];
}

export default useScrollReveal;
