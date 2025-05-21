<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue"

import { useI18n, useRouter } from "#imports"
import { useI18nLocale } from "~/composables/useLocale"
import { themeColors } from "~/config/theme"
import type { FooterLink, FooterSection, FriendLink, SocialLink } from "~/types/components/layout/layoutfooter"

const { t } = useI18n()
const { getLocalePath } = useI18nLocale()
const router = useRouter()

// Get current year
const currentYear = new Date().getFullYear()

// Add loading state
const isLoading = ref(true)

// Initialize loading state
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

// Get friend links
const friendLinks = computed<FriendLink[]>(() => {
  return [
    {
      name: t("footer.friends_links.0.name"),
      url: t("footer.friends_links.0.url"),
    },
  ]
})

// Handle in-page scrolling
async function handleScrollToElement(path: string, elementId: string) {
  // If not on target path, navigate first
  if (path !== router.currentRoute.value.path) {
    await router.push(path)
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // Wait for DOM updates to complete
  await nextTick()

  // Scroll to target element
  const scrollToElement = () => {
    const element = document.getElementById(elementId)
    if (element) {
      // Get header height
      const headerHeight = document.querySelector("header")?.offsetHeight || 0
      // Get element position
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      // Calculate scroll position (subtract header height and extra space)
      const offsetPosition = elementPosition - headerHeight - 20

      // Smooth scroll to target position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL hash without triggering scroll
      window.history.pushState({}, "", getLocalePath(`#${elementId}`))
    }
    else {
      // If element not loaded yet, keep trying
      setTimeout(scrollToElement, 100)
    }
  }
  scrollToElement()
}

// Footer links
const footerLinks = computed<FooterSection[]>(() => [
  {
    title: t("footer.about"),
    links: [
      {
        key: "footer.features",
        href: getLocalePath("/#features"),
        isExternal: false,
        onClick: (e: Event) => {
          e.preventDefault()
          handleScrollToElement(getLocalePath("/"), "features")
        },
      },
      {
        key: "footer.showcase",
        href: getLocalePath("/#showcase"),
        isExternal: false,
        onClick: (e: Event) => {
          e.preventDefault()
          handleScrollToElement(getLocalePath("/"), "showcase")
        },
      },
    ],
  },
  {
    title: t("footer.support"),
    links: [
      {
        key: "footer.contact",
        href: "mailto:support@hieu98.space",
        isExternal: true,
      },
      {
        key: "footer.community",
        href: getLocalePath("/group"),
        isExternal: false,
        onClick: async (e: Event) => {
          e.preventDefault()
          await router.push(getLocalePath("/group"))
        },
      },
    ],
  },
  {
    title: t("footer.friends"),
    links: friendLinks.value.map(link => ({
      key: link.name,
      href: link.url,
      isExternal: true,
      isRawText: true,
    })),
  },
])

// Legal links
const legalLinks = computed<FooterLink[]>(() => [
  {
    key: "footer.privacy",
    href: getLocalePath("/privacy"),
    onClick: async (e: Event) => {
      e.preventDefault()
      await router.push(getLocalePath("/privacy"))
    },
  },
  {
    key: "footer.terms",
    href: getLocalePath("/terms"),
    onClick: async (e: Event) => {
      e.preventDefault()
      await router.push(getLocalePath("/terms"))
    },
  },
  {
    key: "footer.sales",
    href: getLocalePath("/sales"),
    onClick: async (e: Event) => {
      e.preventDefault()
      await router.push(getLocalePath("/sales"))
    },
  },
])

// Social media links
const socialLinks: SocialLink[] = [
  {
    icon: "simple-icons:discord",
    href: "https://discord.gg/yajD5sJN",
    label: t("footer.social.github"),
  },
  {
    icon: "lucide:mail",
    href: "mailto:support@hieu98.space",
    label: t("footer.social.email"),
  },
]

// Get theme color
const primaryColor = computed(() => ({
  light: themeColors.primary.hex,
  dark: themeColors.primary.gradient.dark,
}))

// Get background color
const bgColor = computed(() => ({
  light: {
    from: "white",
    via: `${themeColors.primary.hex}05`, // Use theme color with low opacity
    to: "white",
  },
  dark: {
    from: "gray-900",
    via: `${themeColors.primary.gradient.dark}00`, // Use dark theme color with low opacity
    to: "gray-900",
  },
}))
</script>

<template>
  <footer
    :style="{
      '--primary-light': primaryColor.light,
      '--primary-dark': primaryColor.dark,
      '--bg-via-light': bgColor.light.via,
      '--bg-via-dark': bgColor.dark.via,
    }"
    class="relative overflow-hidden bg-gradient-to-b from-white via-[var(--bg-via-light)] to-white dark:from-gray-900 dark:via-[var(--bg-via-dark)] dark:to-gray-900 transition-colors duration-200"
  >
    <!-- Background decorations -->
    <div class="absolute inset-0">
      <!-- Grid background -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] opacity-25 dark:opacity-15"
      />
    </div>

    <!-- Top gradient transition -->
    <div
      class="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent transition-colors duration-200"
    />

    <div class="container relative mx-auto transition-all duration-700">
      <div class="py-12 sm:py-16 px-6 sm:px-8 lg:px-10">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <!-- Left brand section -->
          <div class="lg:col-span-2 px-0">
            <template v-if="!isLoading">
              <UIScrollAnimation animation="fade-right" :duration="1000">
                <!-- Logo -->
                <div class="flex items-center justify-center lg:justify-start space-x-2 mb-6">
                  <img src="/logo.svg" alt="Logo" class="w-8 h-8">
                  <span class="text-xl font-bold text-gray-900 dark:text-white">{{ t('site.title') }}</span>
                </div>
                <!-- Description -->
                <p
                  class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto lg:mx-0 text-center lg:text-left whitespace-normal break-words leading-relaxed text-sm sm:text-base"
                >
                  {{ t('footer.description') }}
                </p>
                <!-- Social media links -->
                <div class="flex items-center justify-center lg:justify-start space-x-4">
                  <a
                    v-for="social in socialLinks" :key="social.href" :href="social.href" target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-500 hover:text-[var(--primary-light)] dark:text-gray-400 dark:hover:text-[var(--primary-dark)] transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    :aria-label="social.label"
                  >
                    <span class="sr-only">{{ social.label }}</span>
                    <UIcon :name="social.icon" class="w-5 h-5" />
                  </a>
                </div>
              </UIScrollAnimation>
            </template>
            <!-- Left skeleton -->
            <template v-else>
              <div class="animate-pulse space-y-6">
                <!-- Logo skeleton -->
                <div class="flex items-center justify-center lg:justify-start space-x-2">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                  <div
                    class="w-32 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                </div>
                <!-- Description skeleton -->
                <div class="space-y-2 text-center lg:text-left mx-auto lg:mx-0">
                  <div
                    class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-full relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                  <div
                    class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-3/4 relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                </div>
                <!-- Social media links skeleton -->
                <div class="flex items-center justify-center lg:justify-start space-x-4">
                  <div
                    v-for="i in 2" :key="i"
                    class="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Right links section -->
          <div class="lg:col-span-3">
            <!-- Grid layout, 3 columns centered on mobile, 3 columns on PC -->
            <div class="grid grid-cols-3 gap-6 sm:gap-8 lg:gap-12 justify-items-center lg:justify-items-end">
              <template v-if="!isLoading">
                <UIScrollAnimation
                  v-for="(section, index) in footerLinks" :key="index" animation="fade-up"
                  :delay="index * 100" :duration="1000"
                >
                  <div class="w-full">
                    <h3
                      class="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2 sm:mb-4 truncate text-center lg:text-left"
                    >
                      {{ section.title }}
                    </h3>
                    <ul class="space-y-2 sm:space-y-3">
                      <li v-for="link in section.links" :key="link.href">
                        <a
                          :href="link.href" :target="link.isExternal ? '_blank' : undefined"
                          :rel="link.isExternal ? 'noopener noreferrer' : undefined" class="text-xs sm:text-sm text-gray-600 hover:text-[var(--primary-light)] dark:text-gray-400 dark:hover:text-[var(--primary-dark)] transition-colors duration-300 line-clamp-1 block text-center lg:text-left"
                          @click="link.onClick"
                        >
                          {{ link.isRawText ? link.key : t(link.key) }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </UIScrollAnimation>
              </template>
              <!-- Right skeleton -->
              <template v-else>
                <div v-for="i in 3" :key="i" class="animate-pulse space-y-4 w-full">
                  <!-- Title skeleton -->
                  <div class="flex justify-center lg:justify-start">
                    <div
                      class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-24 relative overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                      />
                    </div>
                  </div>
                  <!-- Links list skeleton -->
                  <div class="space-y-2 sm:space-y-3 flex flex-col items-center lg:items-start">
                    <div
                      v-for="j in 3" :key="j"
                      class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-full sm:w-32 relative overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Bottom copyright info -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/80">
          <div class="container relative mx-auto">
            <div class="flex flex-wrap justify-center lg:justify-between items-center gap-2 text-center lg:text-left">
              <!-- Copyright info -->
              <template v-if="!isLoading">
                <UIScrollAnimation animation="fade-right" :duration="1000">
                  <div class="flex flex-wrap justify-center lg:justify-start items-center gap-2">
                    <div class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      © {{ currentYear }} • {{ t('site.title') }} {{ t('footer.copyright') }}
                    </div>
                    <!-- ICP info -->
                    <div class="flex items-center gap-2">
                      <a
                        v-if="t('footer.icp')" href="https://beian.miit.gov.cn/" target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm text-gray-500 hover:text-[var(--primary-light)] dark:text-gray-400 dark:hover:text-[var(--primary-dark)] transition-colors duration-300 whitespace-nowrap"
                      >
                        {{ t('footer.icp') }}
                      </a>
                      <a
                        v-if="t('footer.police')"
                        class="text-sm text-gray-500 hover:text-[var(--primary-light)] dark:text-gray-400 dark:hover:text-[var(--primary-dark)] transition-colors duration-300 whitespace-nowrap"
                      >
                        {{ t('footer.police') }}
                      </a>
                    </div>
                  </div>
                </UIScrollAnimation>
              </template>
              <!-- Copyright info skeleton -->
              <template v-else>
                <div class="animate-pulse flex flex-wrap justify-center lg:justify-start items-center gap-2">
                  <div
                    class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-48 relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                  <div class="flex items-center gap-2">
                    <div
                      class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-32 relative overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                      />
                    </div>
                  </div>
                </div>
              </template>

              <!-- Legal links -->
              <template v-if="!isLoading">
                <UIScrollAnimation animation="fade-left" :duration="1000">
                  <div class="flex items-center gap-6">
                    <template v-for="(link, index) in legalLinks" :key="link.href">
                      <a
                        :href="link.href"
                        class="text-sm text-gray-500 hover:text-[var(--primary-light)] dark:text-gray-400 dark:hover:text-[var(--primary-dark)] transition-colors duration-300 whitespace-nowrap"
                        @click="link.onClick"
                      >
                        {{ t(link.key) }}
                      </a>
                      <span
                        v-if="index !== legalLinks.length - 1"
                        class="text-gray-300 dark:text-gray-600"
                      >
                        |
                      </span>
                    </template>
                  </div>
                </UIScrollAnimation>
              </template>
              <!-- Legal links skeleton -->
              <template v-else>
                <div class="animate-pulse flex items-center gap-6">
                  <div
                    v-for="i in 3" :key="i"
                    class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-16 relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Gradient animation */
@keyframes gradient {
  0% {
    background-position: 0% center;
  }

  50% {
    background-position: 100% center;
  }

  100% {
    background-position: 0% center;
  }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 8s linear infinite;
}

/* Pulse animation */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
    transform: translateX(-50%) scale(1);
  }

  50% {
    opacity: 0.4;
    transform: translateX(-50%) scale(1.08);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Skeleton loading animation */
@keyframes skeletonLoading {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.skeleton-loading {
  animation: skeletonLoading 1.5s infinite;
}

/* Optimize skeleton effect in dark mode */
@media (prefers-color-scheme: dark) {
  .skeleton-loading {
    opacity: 0.1;
  }
}

/* Include skeleton animation even in reduced motion mode */
@media (prefers-reduced-motion: reduce) {
  .skeleton-loading {
    animation: none !important;
  }
}
</style>
