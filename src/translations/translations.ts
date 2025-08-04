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
}

export {
  languages
}