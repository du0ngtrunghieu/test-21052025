import type { SocialConfig } from "~/types/config/social"

// Global social media platform configuration
export const globalSocialConfig: SocialConfig = {
  
  twitter: {
    name : "Twitter",
    url : "#",
    icon: "simple-icons:twitter",
  },
  facebook: {
    name: "Facebook",
    url: "/",
    icon: "simple-icons:facebook",
  },
  linkin: {
    name: "Linkin",
    url: "/",
    icon: "simple-icons:linkin",
  },
}

// Vietnamese social media platform configuration
export const viSocialConfig: SocialConfig = {
  blog: {
    name: "Blog",
    url: "https://hieu98.space",
    icon: "simple-icons:blogger",
  },
  github: {
    name: "GitHub",
    url: "#",
    icon: "lucide:github",
  },
}

/**
 * Get social media configuration based on language
 * @param locale - Language code ('vi' | 'en')
 * @returns Social media configuration for the corresponding language
 */
export function getSocialConfigByLocale(locale: string): SocialConfig {
  return locale === "vi" ? viSocialConfig : globalSocialConfig
}

/**
 * Get all available social media key names
 * @param locale - Language code ('vi' | 'en')
 * @returns Array of social media key names
 */
export function getAvailableSocialKeys(locale: string): string[] {
  const config = getSocialConfigByLocale(locale)
  return Object.keys(config)
}

/**
 * Validate if social media configuration is valid
 * @param config - Social media configuration object
 * @returns Whether the configuration is valid
 */
export function validateSocialConfig(config: SocialConfig): boolean {
  return Object.values(config).every(
    item =>
      item.name
      && item.icon
      && (item.url ? item.url.startsWith("https://") : true),
  )
}
