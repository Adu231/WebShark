import { useState, useEffect, useRef } from 'react';

export function useCounter(target: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, start]);

  return count;
}
