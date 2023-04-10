import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";
import { STORAGE_NAME, LOCALES, DEFAULT_LOCALE } from "../utils/constants";
import router from "../router";

const storedLocale = localStorage.getItem(STORAGE_NAME.LOCALE);

// List of all locales.
export const allLocales = LOCALES;

// Create Vue I18n instance.
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: storedLocale || DEFAULT_LOCALE,
  fallbackLocale: storedLocale || DEFAULT_LOCALE,
  messages: messages,
});

// Set new locale.
export async function setLocale(locale: string) {
  // Load locale if not available yet.
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await loadLocale(locale);

    // fetch() error occurred.
    if (messages === undefined) {
      return;
    }
    // Add locale.
    i18n.global.setLocaleMessage(locale, messages);
  }

  // Set locale.
  localStorage.setItem(STORAGE_NAME.LOCALE, locale);
  i18n.global.locale.value = locale;
  // router.go();
}

function loadLocale(locale: string) :Promise<Object> {
  return fetch(`../locales/${locale}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong!");
    })
    .catch((error) => {
      console.error(error);
    });
}
