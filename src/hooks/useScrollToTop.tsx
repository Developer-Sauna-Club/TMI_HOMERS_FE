import { useCallback, useEffect, useRef, useState } from 'react';

const useScrollToTop = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  // eslint 경고 발생해서 useCallback 사용 (react-hooks/exhaustive-deps)
  const scrollToTop = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
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
    }
  }, [ref, showScrollToTopButton, scrollToTop]);

  return { ref, showScrollToTopButton, scrollToTop };
};

export default useScrollToTop;
