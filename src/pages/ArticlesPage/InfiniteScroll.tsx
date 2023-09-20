import { useEffect, useRef } from 'react';

type InfiniteScrollProps = {
  fetchData: () => void;
  canFetchMore: boolean | undefined;
};

const InfiniteScroll = ({ fetchData, canFetchMore }: InfiniteScrollProps) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && canFetchMore) {
        fetchData();
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchData, canFetchMore]);

  return <div ref={observerRef} />;
};

export default InfiniteScroll;
