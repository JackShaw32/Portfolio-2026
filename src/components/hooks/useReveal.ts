import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useReveal(containerRef?: RefObject<HTMLElement | null>) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    // When returning from a project detail page, skip animations (mark all as already revealed)
    if (sessionStorage.getItem('skip-reveal')) {
      const container = containerRef?.current ?? document;
      (container as HTMLElement | Document).querySelectorAll('.reveal')
        .forEach((el) => el.classList.add('active'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const container = containerRef?.current ?? document;
    const elements = container.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [hasMounted, containerRef]);
}