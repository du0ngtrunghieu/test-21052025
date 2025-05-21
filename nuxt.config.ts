import { defineNuxtConfig } from "nuxt/config"

import { i18nConfig } from "./i18n/config"
import { metaConfig } from "./config/theme"

/**
 * Nuxt 3 Configuration File
 * Contains all core configurations like modules, runtime config, routing rules etc.
 * Detailed docs: https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  // Enable server-side rendering (SSR) to improve first load speed and SEO
  ssr: true,

  // Core module configuration
  modules: [
    "@nuxtjs/sitemap", // Auto-generate sitemap
    "@nuxt/ui", // UI component library
    "@nuxtjs/i18n", // Internationalization support
    "@nuxtjs/color-mode", // Color mode (dark/light)
    "@nuxt/icon", // Icon support
  ],

  // Icon configuration using iconify as provider
  icon: {
    provider: "iconify",
  },

  // Auto-import components configuration
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  devtools: { enabled: false },

  // Runtime configuration containing all environment variables
  runtimeConfig: {
    public: {
      environment: process.env.NODE_ENV,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      typewriterEnabled: process.env.NUXT_PUBLIC_TYPEWRITER_ENABLED,
      typewriterSpeed: process.env.NUXT_PUBLIC_TYPEWRITER_SPEED,
    },
  },

  // Global application configuration
  app: {
    head: {
      title: process.env.NUXT_PUBLIC_SITE_NAME,
      titleTemplate: `%s - ${process.env.NUXT_PUBLIC_SITE_NAME}`,
      htmlAttrs: {
        lang: i18nConfig.defaultLocale,
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "format-detection", content: "telephone=no" },
        ...metaConfig,
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        // Combine DNS prefetch and preconnect
        { rel: "dns-prefetch preconnect", href: "https://fonts.googleapis.com" },
        { rel: "dns-prefetch preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" as const },
      ],
    },
  },

  // Site configuration
  appConfig: {
    siteName: process.env.NUXT_PUBLIC_SITE_NAME,
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
  },

  // Color mode configuration
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    dataValue: "theme",
    storageKey: "nuxt-color-mode",
  },

  // Route rules configuration
  routeRules: {
    // Static generation for all routes
    "/**": {
      static: true,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  },

  // Experimental features configuration
  experimental: {
    viewTransition: true, // Enable view transitions
  },

  // Nitro server engine configuration
  nitro: {
    // Compress static assets
    compressPublicAssets: true,
  },

  // Vite build tool configuration
  vite: {
    build: {
      sourcemap: process.env.NODE_ENV === "development",
    },
    optimizeDeps: {
      include: ["@vueuse/core"],
    },
  },

  // Internationalization configuration
  i18n: i18nConfig,

  compatibilityDate: "2025-02-23",
})
