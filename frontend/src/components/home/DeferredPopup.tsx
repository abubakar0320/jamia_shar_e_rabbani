'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AnnouncementPopup = dynamic(() => import('./AnnouncementPopup'), { ssr: false });

export default function DeferredPopup() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return ready ? <AnnouncementPopup /> : null;
}
