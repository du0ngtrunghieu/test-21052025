import { useI18n, useRoute, computed, navigateTo } from "#imports"
import { LOCALES, DEFAULT_LOCALE } from "~/i18n/config"
import type { Locale } from "~/types/i18n"

/**
 * Language switching composable function
 * @description Provides language switching and initialization functionality, including error handling and performance optimization
 */
export function useI18nLocale() {
  const { locale, t, setLocale } = useI18n()
  const route = useRoute()

  // Cache commonly used values to avoid recalculation
  const localesMap = computed(() => new Map(
    LOCALES.map(l => [l.code, l]),
  ))

  /**
   * Check path type and normalize
   * @param path Input path
   * @returns Normalized path
   */
  const normalizePath = (path: string) => {
    // Ensure path starts with / (unless it's an external link or anchor)
    if (!path.startsWith("/") && !path.startsWith("http") && !path.startsWith("#")) {
      path = `/${path}`
    }
    return path
  }

  /**
   * Get localized path
   * @param path Target path
   * @returns Localized path with language prefix (default language has no prefix)
   */
  const getLocalePath = (path: string) => {
    // Handle special paths
    if (path.startsWith("http"))
      return path

    // Handle anchor links
    if (path.startsWith("#")) {
      const currentPath = route.path === "/" ? "" : route.path
      return `${currentPath}${path}`
    }

    // Normalize path
    const normalizedPath = normalizePath(path)

    // Default language doesn't add prefix
    if (locale.value === DEFAULT_LOCALE) {
      return normalizedPath
    }

    // Other languages add prefix
    return `/${locale.value}${normalizedPath}`
  }

  /**
   * Extract language code from path
   * @param path Path
   * @returns Language code or null
   */
  const extractLocaleFromPath = (path: string): Locale | null => {
    const segments = path.split("/")
    const possibleLocale = segments[1]
    return LOCALES.some(l => l.code === possibleLocale) ? possibleLocale as Locale : null
  }

  /**
   * Remove language prefix from path
   * @param path Path with language prefix
   * @returns Path without language prefix
   */
  const removeLocalePrefix = (path: string): string => {
    const localeCode = extractLocaleFromPath(path)
    if (!localeCode)
      return path
    return path.substring(localeCode.length + 1) || "/"
  }

  /**
   * Set language cookie
   * @param locale Language code
   */
  const setLocaleCookie = (locale: string) => {
    const date = new Date()
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000) // One year expiry
    document.cookie = `i18n_redirected=${locale}; expires=${date.toUTCString()}; path=/`
  }

  /**
   * Switch language
   * @param newLocale New language
   */
  const switchLocale = async (newLocale: Locale) => {
    try {
      // Validate language code
      if (!localesMap.value.has(newLocale)) {
        console.warn(`Invalid locale: ${newLocale}`)
        return
      }

      // If new language is same as current, do nothing
      if (locale.value === newLocale)
        return

      // Update language
      await setLocale(newLocale)

      // Set language cookie
      if (process.client) {
        setLocaleCookie(newLocale)
      }

      // Get current path without language prefix
      const pathWithoutLocale = removeLocalePrefix(route.path)

      // Build new path
      const newPath = newLocale === DEFAULT_LOCALE
        ? pathWithoutLocale
        : `/${newLocale}${pathWithoutLocale}`

      // Use replace mode for navigation, so it doesn't create new history entry
      await navigateTo({
        path: newPath,
        query: route.query,
      }, {
        replace: true,
      })
    }
    catch (error) {
      console.error("Failed to switch locale:", error)
    }
  }

  /**
   * Get current language display name
   */
  const currentLocaleName = computed(() =>
    localesMap.value.get(locale.value)?.name || locale.value,
  )

  /**
   * Get all available language options
   */
  const availableLocales = computed(() =>
    LOCALES.map(locale => ({
      value: locale.code,
      label: locale.name || locale.code,
    })),
  )

  return {
    locale,
    t,
    switchLocale,
    currentLocaleName,
    availableLocales,
    getLocalePath,
  }
}
