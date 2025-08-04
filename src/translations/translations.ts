import enDictionnary from '~/translations/en-dictionnary'
import frDictionnary from '~/translations/fr-dictionnary'

const languages = {
  fr: {
    label: 'Français',
    dictionary: frDictionnary
  },
  en: {
    label: 'English',
    dictionary: enDictionnary
  }
}

export class TranslationHandler {
  lang: keyof typeof languages
  dictionnary: typeof languages[keyof typeof languages]['dictionary']

  constructor() {
    // Get browser language and extract the language code (e.g., 'en-US' -> 'en')
    const browserLang = navigator.language.split('-')[0] as keyof typeof languages

    this.lang = languages[browserLang] ? browserLang : 'en'
  }

  translate() {
    return languages[this.lang].dictionary
  }

  // New method to translate UI elements
  translateUI() {
    const translations = this.translate().ui || {}
    
    // Translate elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate')
      if (key && translations[key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
          element.textContent = translations[key]
        } else {
          element.textContent = translations[key]
        }
      }
    })

    // Translate elements with data-translate-placeholder attribute
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
      const key = element.getAttribute('data-translate-placeholder')
      if (key && translations[key]) {
        element.setAttribute('placeholder', translations[key])
      }
    })
  }

  // Method to change language and re-translate
  setLanguage(lang: keyof typeof languages) {
    this.lang = lang
    this.dictionnary = languages[lang].dictionary
    this.translateUI()
  }
}

export {
  languages
}