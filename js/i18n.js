// English Only Support
class I18n {
  constructor() {
    this.currentLang = 'en';
    this.translations = translations;
    this.init();
  }

  init() {
    this.updatePageLanguage();
  }

  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations.en;
    
    for (let k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value || key;
  }

  updatePageLanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.getAttribute('placeholder')) {
          element.setAttribute('placeholder', translation);
        }
      } else {
        element.textContent = translation;
      }
    });

    // Update all elements with data-i18n-html attribute
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const translation = this.getTranslation(key);
      element.innerHTML = translation;
    });

    // Update option elements
    document.querySelectorAll('[data-i18n-value]').forEach(element => {
      const key = element.getAttribute('data-i18n-value');
      const translation = this.getTranslation(key);
      element.textContent = translation;
    });

    // Set page language
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }

  // Helper method to get translation with array index
  getListTranslation(key, index) {
    const keys = key.split('.');
    let value = this.translations.en;
    
    for (let k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    if (Array.isArray(value) && value[index]) {
      return value[index];
    }
    return key;
  }
}

// Initialize i18n when DOM is ready
let i18n;
document.addEventListener('DOMContentLoaded', () => {
  i18n = new I18n();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    i18n = new I18n();
  });
} else {
  i18n = new I18n();
}
