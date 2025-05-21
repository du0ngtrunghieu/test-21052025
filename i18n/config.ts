import type { LocaleObject } from "@nuxtjs/i18n"

// List of supported languages
export const LOCALES: LocaleObject[] = [
  {
    code: "en",
    iso: "en-US",
    name: "English",
    dir: "ltr",
    file: "en/index.ts",
  },
  {
    code: "vi",
    iso: "vi-VN",
    name: "Vietnamese",
    dir: "ltr",
    file: "vi/index.ts",
  },
]

// Default language
export const DEFAULT_LOCALE = "en"

// i18n configuration
export const i18nConfig = {
  defaultLocale: DEFAULT_LOCALE,
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    alwaysRedirect: true,
    redirectOn: "root" as const,
  },
  langDir: "locales",
  lazy: false,
  locales: LOCALES,
  strategy: "prefix_except_default" as const,
  customRoutes: "config",
  vueI18n: "../i18n.config.ts",
  precompile: {
    strictMessage: true,
    escapeHtml: true,
  },
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  fallbackLocale: DEFAULT_LOCALE as "en" | "vi",
  messages: {
    en: {},
    vi: {},
  },
  bundle: {
    optimizeTranslationDirective: false,
  },
} as const
