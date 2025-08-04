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
    this.lang = 'fr'
  }

  translate() {
    console.log(languages[this.lang], languages, this.lang)
    return languages[this.lang].dictionary
  }
}

export {
  languages
}