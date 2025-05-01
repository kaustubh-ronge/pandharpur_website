'use client'

import { createContext, useContext, useState } from 'react'

const TranslationContext = createContext()

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [isTranslating, setIsTranslating] = useState(false)

  const changeLanguage = (newLang) => {
    setIsTranslating(true)
    
    // Load Google Translate script if not already loaded
    if (!window.googleTranslateElementInit) {
      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,mr,kn',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element')
      
      // Change to selected language
      if (window.google && window.google.translate) {
        const selectField = document.querySelector('.goog-te-combo')
        if (selectField) {
          selectField.value = newLang
          selectField.dispatchEvent(new Event('change'))
        }
      }
      
      setIsTranslating(false)
    }

    setLanguage(newLang)
  }

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, isTranslating }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => useContext(TranslationContext)