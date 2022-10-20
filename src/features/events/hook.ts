import React from 'react';

type IntervalCallback = () => void;

function useDispatch(callback: IntervalCallback, delay: number): void {
  const cachedCallback = React.useRef<IntervalCallback>();

  React.useEffect(() => {
    cachedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay !== 0) {
      const id = setInterval(() => cachedCallback?.current?.(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const IntervalHooks = {
  useDispatch,
};