'use client';

import { useEffect } from 'react';

const ADSENSE_SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5810661605612266';

export default function AdSenseLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
      return;
    }

    let loaded = false;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    const loadAdSense = () => {
      if (loaded) return;
      loaded = true;
      cleanup();

      if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
        return;
      }

      const script = document.createElement('script');
      script.src = ADSENSE_SRC;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    };

    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    const onFirstInteraction = () => loadAdSense();

    const cleanup = () => {
      events.forEach((evt) => window.removeEventListener(evt, onFirstInteraction));
      if (fallbackTimer !== undefined) {
        clearTimeout(fallbackTimer);
        fallbackTimer = undefined;
      }
    };

    events.forEach((evt) => window.addEventListener(evt, onFirstInteraction, { once: true, passive: true }));
    fallbackTimer = setTimeout(loadAdSense, 5000);

    return cleanup;
  }, []);

  return null;
}
