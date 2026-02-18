'use client'
import { useEffect, useState, useRef } from "react";
import { UseTimerReturn } from '../type/Tariffs'

 
export function useTimer(duration: number): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isExpired, setIsExpired] = useState<boolean>(false);
	const [isLast30Sec, setIsLast30Sec] = useState<boolean>(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const target: number = Date.now() + duration;

    intervalRef.current = setInterval((): void => {
      const diff: number = target - Date.now();
			
			if( diff < 30000 && diff !== 0)
					setIsLast30Sec(true)
			
      if (diff <= 0) {
        setTimeLeft(0);
        setIsExpired(true);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        return;
      }

      setTimeLeft(diff);
    }, 1000);

    return (): void => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration]);

  return { timeLeft, isExpired, isLast30Sec };
}
