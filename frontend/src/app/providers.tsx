'use client';

import { ReactNode, useEffect, useState } from 'react';
import '../i18n';
import { useTranslation } from 'react-i18next';

export function Providers({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const updateAttributes = () => {
      const dir = i18n.language === 'ur' || i18n.language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.lang = i18n.language;
    };
    updateAttributes();
    i18n.on('languageChanged', updateAttributes);
    return () => i18n.off('languageChanged', updateAttributes);
  }, [i18n, mounted]);

  return <>{children}</>;
}
