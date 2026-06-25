'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends ImageProps {
  fallbackSrc?: string;
  section?: 'hero' | 'course' | 'faculty' | 'campus' | 'student' | 'news';
}

const PLACEHOLDERS = {
  hero: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000',
  course: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800',
  faculty: '/images/WhatsApp.jpeg',
  campus: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000',
  student: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200',
  news: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000',
};

export default function OptimizedImage({ src, fallbackSrc, section, alt, ...props }: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setError(false);
  }, [src]);

  const handleError = () => {
    if (!error) {
      setError(true);
      setImgSrc(fallbackSrc || (section ? PLACEHOLDERS[section] : PLACEHOLDERS.hero));
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Jamia Image"}
      onError={handleError}
      className={`${props.className || ''} ${error ? 'opacity-90 grayscale-[20%]' : ''}`}
    />
  );
}
