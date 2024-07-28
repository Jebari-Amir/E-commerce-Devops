import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishTranslation from './an';
import frenchTranslation from './fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: englishTranslation },
      fr: { translation: frenchTranslation },
    },
    lng: 'fr', // Langue par défaut
    fallbackLng: 'en', // Langue de secours
    interpolation: {
      escapeValue: false, // Ne pas échapper les valeurs interpolées
    },
  });

export default i18n;
