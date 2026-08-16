'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('app_lang');
      if (savedLang && translations[savedLang]) {
        setLanguageState(savedLang);
      }
    } catch (e) {
      console.error('Failed to read app_lang from localStorage', e);
    }
  }, []);

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem('app_lang', lang);
      } catch (e) {
        console.error('Failed to save app_lang to localStorage', e);
      }
    }
  };

  const t = (key) => {
    if (!key) return '';
    const activeDict = translations[language];
    if (activeDict && activeDict[key] !== undefined) {
      return activeDict[key];
    }
    const fallbackDict = translations.en;
    if (fallbackDict && fallbackDict[key] !== undefined) {
      return fallbackDict[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: (key) => (translations.en && translations.en[key]) || key,
    };
  }
  return context;
}
