import { useState, useEffect } from 'react';

const useDebounce = <T,>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    // useEffect 내부에서 return하면 컴포넌트가 제거될 때 해당 코드가 실행된다. (clean-up)
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // 컴포넌트가 제거될 때 clearTim out을 활용하여 setTimeout의 시간을 초기화 시킨다.
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
