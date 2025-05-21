import type { SEOConfig, TwitterCard } from "~/types/config/seo"
import { useRuntimeConfig } from "#imports"

// Get siteUrl from runtime config
function getSiteUrl() {
  const { public: { siteUrl } } = useRuntimeConfig()
  return siteUrl || ""
}

// Handle URL path
const normalizeUrl = (path: string) => path.startsWith("/") ? path : `/${path}`

export const seoConfig: SEOConfig = {

  // Default SEO configuration
  defaults: {
    titleTemplate: `%s - ${process.env.NUXT_PUBLIC_SITE_NAME}`,
    author: "Nuxt Starter Team",
    ogImage: "/images/social/og-image.svg",
  },

  // Social media configuration
  social: {
    twitter: {
      card: "summary_large_image" as TwitterCard,
      creator: "@Nuxt Starter",
      site: "@Nuxt Starter",
    },
    facebook: {
      appId: "", // Configure here if you have a Facebook app
    },
  },

  // Predefined page names for i18n lookup
  pages: ["home", "privacy", "terms", "group", "sales"],

  // Get site URL
  getSiteUrl,

  // Generate full URL
  generateUrl: (path: string) => {
    const siteUrl = getSiteUrl()
    return `${siteUrl}${normalizeUrl(path)}`
  },

  // Generate full image URL
  generateImageUrl: (imagePath: string): string => {
    if (imagePath.startsWith("http")) {
      return imagePath
    }
    const siteUrl = getSiteUrl()
    return `${siteUrl}${normalizeUrl(imagePath)}`
  },
}
