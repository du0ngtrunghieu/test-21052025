/**
 * components/layout/LayoutHeader.vue
 * Website header navigation component
 * Contains Logo, navigation menu, language switching, theme switching and other features
 * Supports responsive layout and mobile adaptation
 */
<script setup lang="ts">
import { nextTick, ref, watch, onMounted, onUnmounted } from "vue"
import { onClickOutside } from "@vueuse/core"

import CommonLocaleSwitch from "../common/CommonLocaleSwitch.vue"
import CommonThemeSwitch from "../common/CommonThemeSwitch.vue"

import { useRoute, useRouter, useI18n } from "#imports"
import { NAV_LINKS } from "~/config/nav"
import { useI18nLocale } from "~/composables/useLocale"
import { DEFAULT_LOCALE } from "~/i18n/config"

// Navigation link configuration
const navLinks = NAV_LINKS

// Mobile menu expanded state
const isMenuOpen = ref(false)

// Mobile menu container reference
const mobileMenuRef = ref<HTMLElement | null>(null)
// Menu button container reference
const menuButtonContainerRef = ref<HTMLElement | null>(null)

// Router related
const route = useRoute()
const router = useRouter()

// Internationalization related
const { t, locale } = useI18n()
const { getLocalePath } = useI18nLocale()

// Add loading state
const isLoading = ref(true)

// Initialization
onMounted(() => {
  // Ensure menu state and body style are reset when page loads
  isMenuOpen.value = false
  document.body.style.overflow = ""

  setTimeout(() => {
    isLoading.value = false
  }, 300)

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isMenuOpen.value) {
      isMenuOpen.value = false
    }
  }
  window.addEventListener("keydown", handleEsc)
  onUnmounted(() => {
    window.removeEventListener("keydown", handleEsc)
    // Ensure body style is cleaned up when component unmounts
    document.body.style.overflow = ""
  })
})

// Listen for clicks outside to close menu
onClickOutside(mobileMenuRef, (event) => {
  // If click is on menu button container, don't handle (let button click event handle)
  if (menuButtonContainerRef.value?.contains(event.target as Node)) {
    return
  }
  isMenuOpen.value = false
})

/**
 * Handle navigation link click event
 * @param href - Target link
 */
async function handleNavClick(href: string) {
  // Handle non-anchor links
  if (!href.startsWith("#")) {
    await router.push(getLocalePath(href))
    return
  }

  // Handle anchor links
  const hash = href.split("#")[1]
  if (!hash)
    return

  // Close mobile menu
  isMenuOpen.value = false

  // If not on homepage, redirect to homepage first
  if (route.path !== "/" && route.path !== `/${locale.value}` && (locale.value !== DEFAULT_LOCALE || route.path !== "/")) {
    await router.push(getLocalePath("/"))
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // Wait for DOM updates to complete
  await nextTick()

  // Scroll to target element
  const scrollToElement = () => {
    const element = document.getElementById(hash)
    if (element) {
      // Smooth scroll to target position
      element.scrollIntoView({ behavior: "smooth" })
      // Update URL hash without triggering scroll
      window.history.pushState({}, "", getLocalePath(`#${hash}`))
    }
    else {
      // If element not loaded yet, keep trying
      setTimeout(scrollToElement, 100)
    }
  }
  scrollToElement()
}

/**
 * Handle Logo click event
 * Return to homepage top
 */
async function handleLogoClick() {
  // Close mobile menu
  isMenuOpen.value = false

  // If not on homepage, redirect to homepage
  if (route.path !== "/" && route.path !== `/${locale.value}` && (locale.value !== DEFAULT_LOCALE || route.path !== "/")) {
    await router.push(getLocalePath("/"))
  }

  // Remove hash from URL
  if (window.location.hash) {
    window.history.pushState({}, "", getLocalePath("/"))
  }

  // Smooth scroll to page top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Modify watch logic to ensure states are properly cleaned up on route changes
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
    // Ensure body style is reset on route changes
    document.body.style.overflow = ""
  },
)

// Listen for scroll to close menu
onMounted(() => {
  const handleScroll = () => {
    if (isMenuOpen.value) {
      isMenuOpen.value = false
    }
  }
  window.addEventListener("scroll", handleScroll)
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })
})

// Optimize menu state monitoring logic
watch(isMenuOpen, (value) => {
  nextTick(() => {
    try {
      if (value) {
        document.body.style.overflow = "hidden"
      }
      else {
        document.body.style.overflow = ""
      }
    }
    catch (error) {
      console.error("Failed to update body overflow:", error)
      // Ensure reset to default state when error occurs
      document.body.style.overflow = ""
    }
  })
})
</script>

<template>
  <!--
    Header navigation container
    sticky: Fixed at top
    backdrop-blur-sm: Frosted glass effect
    backdrop-saturate-150: Increase saturation
   -->
  <header
    class="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm backdrop-saturate-150 transition-colors duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900/80"
  >
    <!-- Navigation bar -->
    <nav class="container mx-auto px-2 sm:px-4 lg:px-8">
      <!-- Actual content -->
      <template v-if="!isLoading">
        <!-- Navigation bar content -->
        <div class="flex h-16 sm:h-18 items-center justify-between">
          <!-- Logo and navigation links area -->
          <div class="flex items-center min-w-0">
            <!-- Logo link -->
            <a
              href="/"
              class="group flex items-center space-x-2 sm:space-x-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
              @click.prevent="handleLogoClick"
            >
              <!-- Logo image -->
              <img
                src="/logo.svg" alt="Nuxt Starter Logo"
                class="h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-200 ease-in-out group-hover:scale-110"
              >
              <!-- Website title -->
              <span
                class="text-base sm:text-lg font-bold text-gray-900 transition-colors duration-200 ease-in-out group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 truncate"
              >
                {{ t('site.title') }}
              </span>
            </a>

            <!-- Desktop navigation menu -->
            <div class="hidden md:flex md:space-x-1 lg:space-x-3 md:ml-4 lg:ml-8">
              <a
                v-for="link in navLinks" :key="link.href" :href="link.href"
                class="relative rounded-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-medium text-gray-600 transition-all duration-300 ease-in-out hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 whitespace-nowrap"
                @click.prevent="handleNavClick(link.href)"
              >
                <span class="relative z-10">{{ t(link.text) }}</span>
                <span
                  class="absolute inset-0 -z-10 scale-x-0 rounded-full bg-primary-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:opacity-100 dark:bg-primary-900/20"
                />
              </a>
            </div>
          </div>

          <!-- Right functionality area -->
          <div
            class="flex items-center justify-center h-full space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 shrink-0"
          >
            <!-- Show language and theme switch on desktop -->
            <div class="hidden md:flex items-center space-x-2">
              <CommonLocaleSwitch class="flex items-center" />
              <CommonThemeSwitch class="flex items-center" />
            </div>
            <!-- Only show menu button on mobile -->
            <div ref="menuButtonContainerRef" class="md:hidden">
              <UButton
                class="flex items-center transition-colors duration-200" color="gray" variant="ghost" size="sm"
                :ui="{
                  rounded: 'rounded-lg',
                  padding: {
                    base: 'p-2',
                    sm: 'p-2.5',
                    md: 'p-3',
                  },
                  icon: {
                    base: 'h-6 w-6',
                    sm: 'h-6 w-6',
                  },
                  color: {
                    gray: {
                      ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
                    },
                  },
                }" :icon="isMenuOpen ? 'lucide:x' : 'lucide:menu'" @click="isMenuOpen = !isMenuOpen"
              />
            </div>
          </div>
        </div>

        <!-- Mobile menu overlay and sidebar -->
        <Teleport to="body">
          <!-- Overlay animation -->
          <Transition
            enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0"
          >
            <!-- Overlay -->
            <div
              v-if="isMenuOpen" class="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm dark:bg-gray-900/80"
              aria-hidden="true"
            />
          </Transition>

          <!-- Sidebar animation -->
          <Transition
            enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="translate-x-full" enter-to-class="translate-x-0"
            leave-active-class="transition-transform duration-200 ease-in" leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <!-- Sidebar menu -->
            <div
              v-if="isMenuOpen" ref="mobileMenuRef"
              class="fixed right-0 top-0 bottom-0 z-50 w-[280px] max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl dark:shadow-primary-900/20 flex flex-col"
            >
              <!-- Menu content -->
              <nav class="flex-1 flex flex-col h-full">
                <!-- Sidebar header -->
                <div
                  class="sticky top-0 z-10 flex items-center justify-between px-3 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm backdrop-saturate-150 border-b border-gray-100 dark:border-gray-800"
                >
                  <div class="flex items-center space-x-3 px-4">
                    <img src="/logo.svg" alt="Logo" class="h-8 w-auto">
                    <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('site.title') }}</span>
                  </div>
                  <UButton
                    class="flex items-center transform-gpu transition-all duration-300 ease-in-out hover:rotate-90 hover:scale-110 active:scale-95 mr-3"
                    color="gray" variant="ghost" size="sm" :ui="{
                      rounded: 'rounded-full',
                      padding: {
                        base: 'p-2',
                        sm: 'p-2',
                        md: 'p-2',
                      },
                      icon: { base: 'h-5 w-5' },
                    }" icon="lucide:x" :aria-label="t('components.aria.close_menu')" @click="isMenuOpen = false"
                  />
                </div>

                <!-- Menu links list -->
                <div class="flex-1 overflow-y-auto">
                  <!-- Main navigation links -->
                  <div class="px-3 py-4 space-y-1">
                    <a
                      v-for="link in navLinks" :key="link.href" :href="link.href"
                      class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800/50 transition-all duration-200"
                      @click.prevent="handleNavClick(link.href)"
                    >
                      <span class="relative">
                        {{ t(link.text) }}
                        <span
                          class="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary-500 scale-x-0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                        />
                      </span>
                    </a>
                  </div>

                  <!-- Divider -->
                  <div class="h-px bg-gray-100 dark:bg-gray-800 mx-3" />

                  <!-- Function buttons area -->
                  <div class="px-3 py-4">
                    <!-- Language and theme switching -->
                    <div class="flex items-center justify-center gap-4 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <div class="flex-1 flex justify-center">
                        <CommonLocaleSwitch :always-show-name="true" />
                      </div>
                      <div class="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                      <div class="flex-1 flex justify-center">
                        <CommonThemeSwitch />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer information -->
                <div
                  class="shrink-0 px-3 py-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800"
                >
                  <div class="flex items-center justify-between px-4">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      © {{ new Date().getFullYear() }} {{ t('site.title') }}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </Transition>
        </Teleport>
      </template>

      <!-- Skeleton screen -->
      <template v-else>
        <div class="flex h-16 items-center justify-between">
          <!-- Logo placeholder -->
          <div class="flex items-center">
            <div
              class="h-8 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
          </div>

          <!-- Right functionality area placeholder -->
          <div class="flex items-center space-x-4">
            <!-- Desktop language and theme switch placeholder -->
            <div class="hidden md:flex items-center space-x-4">
              <div
                class="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                />
              </div>
              <div
                class="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                />
              </div>
            </div>
            <!-- Mobile menu button placeholder -->
            <div class="md:hidden">
              <div
                class="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </nav>
  </header>
</template>

<style scoped>
/* Skeleton screen animation */
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

/* Optimize skeleton screen effect in dark mode */
@media (prefers-color-scheme: dark) {
  .skeleton-loading {
    opacity: 0.1;
  }
}

/* Include skeleton screen animation even in reduced motion mode */
@media (prefers-reduced-motion: reduce) {
  .skeleton-loading {
    animation: none !important;
  }
}

/* Prevent sidebar content overflow */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}

/* Optimize sidebar animation performance */
.transform {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  will-change: transform;
}
</style>
