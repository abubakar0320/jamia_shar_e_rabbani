'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';

interface PopupConfig {
  enabled: boolean;
  image: string;
  link: string;
  title: string;
  showOncePerDay: boolean;
}

export default function AnnouncementPopup() {
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/popup-announcement');
        if (!res.ok || !active) return;
        const data: PopupConfig = await res.json();
        if (!active) return;
        setConfig(data);

        if (data.enabled) {
          if (data.showOncePerDay) {
            const lastShown = localStorage.getItem('popupLastShown');
            const today = new Date().toLocaleDateString();
            if (lastShown !== today) {
              setIsVisible(true);
            }
          } else {
            setIsVisible(true);
          }
        }
      } catch {
        // Ignore non-critical popup config fetch failure
      }
    };

    fetchConfig();
    return () => {
      active = false;
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (config?.showOncePerDay) {
      localStorage.setItem('popupLastShown', new Date().toLocaleDateString());
    }
  };

  if (!isVisible || !config) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8 bg-black/50 animate-[heroFadeIn_0.2s_ease-out]"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[600px] bg-white border border-slate-300 shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Area */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-slate-900 text-lg font-semibold truncate pr-4">
            {config.title}
          </h3>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image Container */}
        {config.link ? (
          <Link
            href={config.link}
            onClick={handleClose}
            className="block relative w-full aspect-[4/5] md:aspect-square bg-slate-100 hover:opacity-95 transition-opacity"
          >
            <OptimizedImage
              src={config.image}
              alt={config.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </Link>
        ) : (
          <div className="relative w-full aspect-[4/5] md:aspect-square bg-slate-100">
            <OptimizedImage
              src={config.image}
              alt={config.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        )}
      </div>
    </div>
  );
}
