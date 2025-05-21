import { useRoute, useI18n } from "#imports"
import { seoConfig } from "~/config/seo"
import type { OGType, SEOProps } from "~/types/config/seo"

export function useSeo() {
  const { t, locale } = useI18n()
  const route = useRoute()

  // Cache default config
  const defaultConfig = {
    get title() { return t("seo.defaults.title") },
    get description() { return t("seo.defaults.description") },
    get keywords() { return t("seo.defaults.keywords") },
  }

  // Get simplified version of page config
  const getPageConfig = (pageName: string): SEOProps | null => {
    if (!pageName || !seoConfig.pages.includes(pageName)) {
      return null
    }
    return {
      title: t(`seo.pages.${pageName}.title`),
      description: t(`seo.pages.${pageName}.description`),
      keywords: t(`seo.pages.${pageName}.keywords`),
    }
  }

  // Merge SEO config
  const mergeSeoConfig = (options?: SEOProps, pageName?: string | null) => {
    // Only get page config when pageName is valid
    const pageConfig = pageName ? getPageConfig(pageName) : null

    return {
      title: options?.title || pageConfig?.title || defaultConfig.title,
      description: options?.description || pageConfig?.description || defaultConfig.description,
      keywords: options?.keywords || pageConfig?.keywords || defaultConfig.keywords,
      image: options?.image || seoConfig.defaults.ogImage,
      type: options?.type || "website",
      url: seoConfig.generateUrl(route.path),
    }
  }

  const updateSeoMeta = (options?: SEOProps) => {
    // Safely get current route name
    const currentPath = typeof route.name === "string" ? route.name : null
    const config = mergeSeoConfig(options, currentPath)
    const ogImage = seoConfig.generateImageUrl(config.image)

    // Set all meta tags at once
    useSeoMeta({
      title: config.title,
      description: config.description,
      keywords: config.keywords,
      author: seoConfig.defaults.author,
      ogTitle: config.title,
      ogDescription: config.description,
      ogImage,
      ogUrl: config.url,
      ogType: config.type as OGType,
      twitterCard: seoConfig.social.twitter.card,
      twitterTitle: config.title,
      twitterDescription: config.description,
      twitterImage: ogImage,
      twitterCreator: seoConfig.social.twitter.creator,
      twitterSite: seoConfig.social.twitter.site,
    })

    useHead({
      titleTemplate: titleChunk => titleChunk ? `${titleChunk} - ${t("site.title")}` : t("site.title"),
      htmlAttrs: { lang: locale.value },
      link: [{ rel: "canonical", href: config.url }],
    })
  }

  const updatePageSeo = (pageName: string) => {
    // Validate page name
    if (!pageName) {
      console.warn("Page name is required")
      updateSeoMeta()
      return
    }

    if (!seoConfig.pages.includes(pageName)) {
      console.warn(`Page "${pageName}" is not defined in seoConfig.pages`)
      updateSeoMeta()
      return
    }

    const pageConfig = getPageConfig(pageName)
    updateSeoMeta(pageConfig || undefined)
  }

  return {
    updateSeoMeta,
    updatePageSeo,
  }
}
