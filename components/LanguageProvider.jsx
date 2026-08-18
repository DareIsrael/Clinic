'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { languages, translateText } from '@/lib/clientTranslations';

const LanguageContext = createContext(null);
const translatableAttributes = ['placeholder', 'aria-label', 'title'];

function translateDocument(language) {
  const root = document.querySelector('main')?.parentElement;
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const parent = node.parentElement;
    if (!parent || parent.closest('[data-no-translate], script, style')) return;
    const source = node.__clinicTranslationSource || node.nodeValue;
    if (!node.__clinicTranslationSource) node.__clinicTranslationSource = source;
    node.nodeValue = translateText(source, language);
  });
  root.querySelectorAll('*').forEach((element) => {
    if (element.closest('[data-no-translate]')) return;
    translatableAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const sourceAttribute = `data-i18n-${attribute}`;
      const source = element.getAttribute(sourceAttribute) ?? element.getAttribute(attribute);
      element.setAttribute(sourceAttribute, source);
      element.setAttribute(attribute, translateText(source, language));
    });
  });
}

export function LanguageProvider({ children }) {
  const pathname = usePathname();
  const adminRoute = pathname.startsWith('/admin');
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('clinic-language');
    const timer = window.setTimeout(() => {
      if (saved && languages[saved]) setLanguageState(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = adminRoute ? 'en' : language;
    if (adminRoute) {
      translateDocument('en');
      return undefined;
    }
    translateDocument(language);
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.type === 'childList' && mutation.addedNodes.length)) {
        translateDocument(language);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [adminRoute, language, pathname]);

  const setLanguage = useCallback((nextLanguage) => {
    if (!languages[nextLanguage]) return;
    window.localStorage.setItem('clinic-language', nextLanguage);
    setLanguageState(nextLanguage);
  }, []);

  const value = useMemo(() => ({
    language: adminRoute ? 'en' : language,
    setLanguage,
    t: (text) => translateText(text, adminRoute ? 'en' : language),
    languages,
  }), [adminRoute, language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
