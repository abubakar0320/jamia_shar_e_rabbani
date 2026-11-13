'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AnnouncementPopup = dynamic(() => import('./AnnouncementPopup'), { ssr: false });

export default function DeferredPopup() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    let done = false;
    const trigger = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, trigger, { once: true, passive: true }));
    const timer = setTimeout(trigger, 5500);

    return () => {
      clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, trigger));
    };
  }, [ready]);

  return ready ? <AnnouncementPopup /> : null;
}
