const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
  constructor() {
    this.components = {
      americanOnly,
      americanToBritishSpelling,
      americanToBritishTitles,
      britishOnly,
    };

    this.localeValues = ['american-to-british', 'british-to-american'];
    this.translatedCount = 0;
    this.locale = null;
    this.matchQueue = [];
  }

  /**
   *
   * @param {string} text
   * @param {string} locale
   * @returns
   */
  translate(text, locale) {
    const invalidLocale =
      typeof locale === 'undefined' || !this.localeValues.includes(locale);

    if (invalidLocale) {
      throw {
        message: 'Invalid value for locale field',
        type: 'INVALID_LOCALE',
      };
    }

    const invalidText = typeof text !== 'string' || text === '';

    if (invalidText)
      throw { message: 'No text to translate', type: 'INVALID_TEXT' };

    this.locale = locale;

    // translate text
    let result = this[locale](text);

    // translate time
    result = this.translateTime(result);

    // check if the first letter/word is lowercase
    const isLowercaseRegex = /[a-z]/;
    const beginsWithLowercase = isLowercaseRegex.test(result[0]);

    if (beginsWithLowercase) {
      result = this.capitalizeFirstLetter(result);
      this.translatedCount++;
    }

    // fill in matches
    result = this.fillInPlaceholders(result);

    console.log({ text, result, count: this.translatedCount });

    if (this.translatedCount === 0) {
      result = 'Everything looks good to me!';
    }

    this.reset();

    return result;
  }

  ['american-to-british'](text) {
    console.log(this.locale);
    let translated = text;

    // create an array of component object keys so it can be used in a loop
    const componentNames = [
      'americanToBritishTitles',
      'americanOnly',
      'americanToBritishSpelling',
    ];

    // translate american to british
    for (const componentName of componentNames) {
      const translations = this.components[componentName];

      for (const americanTerm in translations) {
        const britishTerm = translations[americanTerm];
        translated = this.replaceText(
          translated,
          americanTerm,
          britishTerm,
          componentName
        );
      }
    }

    return translated;
  }

  ['british-to-american'](text = '') {
    console.log(this.locale);
    let translated = text;

    const componentNames = [
      'americanToBritishTitles',
      'americanToBritishSpelling',
    ];

    // translate british only terms
    for (const britishTerm in britishOnly) {
      const americanTerm = britishOnly[britishTerm];
      translated = this.replaceText(translated, britishTerm, americanTerm);
    }

    // translate spelling and titles
    for (const componentName of componentNames) {
      const component = this.components[componentName];

      for (const americanTerm in component) {
        const britishTerm = component[americanTerm];
        translated = this.replaceText(
          translated,
          britishTerm,
          americanTerm,
          componentName
        );
      }
    }

    return translated;
  }

  replaceText(text, searchTerm, replacementTerm, componentName = '') {
    const regex = new RegExp(searchTerm, 'gi');
    const result = text.replace(
      regex,
      this.replacer(replacementTerm, componentName)
    );

    return result;
  }

  replacer(replacementText, componentName = '') {
    let _this = this;
    return function (match, index, originalText) {
      const isCharRegex = /[\w]/;
      const charBefore = originalText[index - 1];
      const charAfter = originalText[index + match.length];

      // check if the match is a substring
      const isSubstring =
        (charBefore && isCharRegex.test(charBefore)) ||
        (charAfter && isCharRegex.test(charAfter));

      if (isSubstring) return match;

      const isAmericanTitle =
        componentName === 'americanToBritishTitles' &&
        _this.locale === 'british-to-american';
      const isFirstLetter = typeof charBefore === 'undefined';

      const needsFirstCapital = isAmericanTitle || isFirstLetter;

      if (needsFirstCapital) {
        replacementText = _this.capitalizeFirstLetter(replacementText);
      }

      // place in match queue
      _this.matchQueue.push(replacementText);

      // update our translate count
      _this.translatedCount++;

      const lastQueueIndex = _this.matchQueue.length - 1;

      return `{${lastQueueIndex}}`;
    };
  }

  containsKeyWord(text) {
    const regex = /{[\d]+}/;
  }

  capitalizeFirstLetter(text) {
    return text[0].toUpperCase() + text.slice(1) || '';
  }

  wrapText(text) {
    return `<span class="highlight">${text}</span>`;
  }

  translateTime(text) {
    let translated = text;
    const separtors = {
      'american-to-british': ':',
      'british-to-american': '.',
    };

    const separator = separtors[this.locale];
    const regex = new RegExp(`[\\d]?[\\d]${separator}[\\d][\\d]`, 'g');

    translated = translated.replace(regex, (match, index, originalText) => {
      const arr = match.split(separator);
      const joiner = separator === ':' ? '.' : ':';
      const result = arr.join(joiner);
      this.translatedCount++;

      return this.wrapText(result);
    });

    return translated;
  }

  fillInPlaceholders(text) {
    const regex = /{[\d]+}/g;
    const result = text.replace(regex, (match) => {
      const queueIndex = parseInt(match.slice(1, match.length - 1));
      const recplacementText = this.matchQueue[queueIndex];
      const wrappedText = this.wrapText(recplacementText);

      return wrappedText;
    });

    return result;
  }

  reset() {
    this.locale = null;
    this.matchQueue = [];
    this.translatedCount = 0;
  }
}

module.exports = Translator;
