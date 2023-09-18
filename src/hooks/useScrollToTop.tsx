import { useEffect, useRef, useState } from 'react';

const useScrollToTop = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentRef = ref.current;
    const handleScroll = () => {
      const scrollPosition = currentRef?.scrollTop || 0;
      if (scrollPosition > 0) {
        setShowScrollToTopButton(true);
      } else {
        setShowScrollToTopButton(false);
      }
    };
    currentRef?.addEventListener('scroll', handleScroll);
    return () => {
      currentRef?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { ref, showScrollToTopButton, scrollToTop };
};

export default useScrollToTop;
