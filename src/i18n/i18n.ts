import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Import translation files
import enTranslation from './locales/en/translation.json'
import viTranslation from './locales/vi/translation.json'

const resources = {
  en: {
    translation: enTranslation
  },
  vi: {
    translation: viTranslation
  }
}

i18n
  // Load translation using http backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: 'en',

    defaultNS: 'translation',
    ns: ['translation'],

    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n
