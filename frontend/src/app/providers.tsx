'use client';

import { ReactNode, useEffect } from 'react';

export function Providers({ children }: { children?: ReactNode }) {
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

    // Defer passive visit telemetry until well after hydration and initial paint
    const timer = setTimeout(recordVisit, 5500);
    return () => clearTimeout(timer);
  }, []);

  return children ? <>{children}</> : null;
}
