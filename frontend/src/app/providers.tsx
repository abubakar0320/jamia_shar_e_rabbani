'use client';

import { ReactNode, useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined' || sessionStorage.getItem('has_visited')) return;

    const recordVisit = () => {
      try {
        sessionStorage.setItem('has_visited', 'true');
        fetch('/api/visit', { method: 'POST', keepalive: true }).catch(() => null);
      } catch {
        // Ignore storage or network errors during passive telemetry
      }
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(recordVisit, { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }

    const timer = setTimeout(recordVisit, 2000);
    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
