import { useState, useRef, useCallback } from 'react';

export function useDebounced<T>(initialValue: T, delay: number = 300): [T, (val: T) => void] {
  const [state, setState] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setDebouncedState = useCallback((val: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setState(val);
    }, delay);
  }, [delay]);

  return [state, setDebouncedState];
}
