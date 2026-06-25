'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import JSON directly to avoid HTTP fetching deadlocks during SSR/Build
import enCommon from '../public/locales/en/common.json';
import urCommon from '../public/locales/ur/common.json';
import arCommon from '../public/locales/ar/common.json';

const resources = {
  en: { common: enCommon },
  ur: { common: urCommon },
  ar: { common: arCommon }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ur',
    lng: typeof window !== 'undefined' ? (localStorage.getItem('i18nextLng') || 'ur') : 'ur',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    ns: ['common'],
    defaultNS: 'common',
    react: {
      useSuspense: false,
    }
  });

export default i18n;
