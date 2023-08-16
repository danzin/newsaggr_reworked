import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationBg from '../locales/bg/translation';
import translationEn from '../locales/en/translation';

const resources = {
  bg: { translation: translationBg },
  en: { translation: translationEn },
};

i18n.use(initReactI18next).init({
  resources, // resources are important to load translations for the languages.
  lng: 'en', // It acts as default language. When the site loads, content is shown in this language.
  debug: true,
  fallbackLng: 'en', // use de if selected language is not available
  interpolation: {
    escapeValue: false,
  },
  ns: 'translation', // namespaces help to divide huge translations into multiple small files.
  defaultNS: 'translation',
});

export default i18n;
