/**
* components/common/CommonLocaleSwitch.vue
* Language Switch Component
* Provides multi-language switching functionality with dropdown menu selection
* Includes accessibility support and responsive design
*/
<script setup lang="ts">
// Import required dependencies
import { onClickOutside } from "@vueuse/core"

import { useI18n } from "#imports"
import { useI18nLocale } from "~/composables/useLocale"
import type { LocaleItem, LocaleObject } from "~/types/i18n"

// Define component props
interface Props {
  /** Whether to always show language name */
  alwaysShowName?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alwaysShowName: false,
})

// Get i18n related methods and state
const { locales, locale, t } = useI18n()
const { switchLocale } = useI18nLocale()

/**
 * Compute current selected language configuration
 * If current language not found, return first language option
 */
const currentLocale = computed<LocaleObject>(() => {
  const found = (locales.value as LocaleObject[]).find(l => l.code === locale.value)
  if (!found) {
    console.warn(`Current language configuration not found: ${locale.value}`)
    return (locales.value as LocaleObject[])[0]
  }
  return found
})

/**
 * Process language option list
 * Convert language config to dropdown menu item format
 */
const localeItems = computed<LocaleItem[]>(() =>
  (locales.value as LocaleObject[]).map(l => ({
    label: l.name || l.code, // Display name, use language code if name not available
    value: l.code, // Language code as value
  })),
)

// Control language selection menu display state
const isLocaleMenuOpen = ref(false)

// Get menu DOM reference for click outside handling
const localeMenuRef = ref<HTMLElement | null>(null)

/**
 * Listen for click outside events
 * Automatically close menu when clicking outside component
 */
onClickOutside(localeMenuRef, () => {
  isLocaleMenuOpen.value = false
})

/**
 * Toggle language selection menu display state
 */
function toggleLocaleMenu() {
  isLocaleMenuOpen.value = !isLocaleMenuOpen.value
}

/**
 * Handle language switch
 * @param item - Selected language option
 */
async function handleLocaleSwitch(item: LocaleItem) {
  // If current language selected, just close menu
  if (item.value === locale.value) {
    isLocaleMenuOpen.value = false
    return
  }

  try {
    // Switch to new language
    await switchLocale(item.value)
    // Close menu after successful switch
    isLocaleMenuOpen.value = false
  }
  catch (error) {
    console.error("Failed to switch language:", error)
  }
}
</script>

<template>
  <!-- Language switch component container -->
  <div ref="localeMenuRef" class="relative">
    <!-- Language switch button with tooltip -->
    <UTooltip :text="t('components.locale_switch.tooltip')">
      <UButton
        color="gray" variant="ghost" :ui="{
          padding: {
            base: 'p-2',
            sm: 'p-2.5',
            md: 'p-3',
          },
          rounded: 'rounded-md',
        }" :aria-label="t('components.locale_switch.toggle_locale')" :aria-expanded="isLocaleMenuOpen"
        @click="toggleLocaleMenu"
      >
        <!-- Screen reader text -->
        <span class="sr-only">{{ t('components.locale_switch.toggle_locale') }}</span>
        <!-- Button content -->
        <div class="flex items-center space-x-1.5">
          <!-- Globe icon -->
          <UIcon name="lucide:globe" class="locale-icon" />
          <!-- Current language name -->
          <span
            class="text-sm font-medium" :class="[
              props.alwaysShowName ? 'inline' : 'hidden sm:inline',
            ]"
          >{{ currentLocale.name }}</span>
          <!-- Dropdown arrow icon -->
          <UIcon
            name="lucide:chevron-down"
            class="w-4 h-4 transition-transform duration-200"
            :class="{ 'rotate-180': isLocaleMenuOpen }"
          />
        </div>
      </UButton>
    </UTooltip>

    <!--
      Language selection dropdown menu
      Uses absolute positioning and transform for center alignment
      Adds frosted glass effect and shadow for visual hierarchy
     -->
    <div
      v-show="isLocaleMenuOpen"
      class="absolute left-1/2 -translate-x-1/2 top-[60px] w-36 rounded-lg bg-white py-1 shadow-lg ring-1 ring-gray-200/50 dark:bg-gray-800/95 dark:ring-gray-700/50 backdrop-blur-xl z-50"
      role="menu" aria-orientation="vertical"
    >
      <!-- Language option list -->
      <button
        v-for="item in localeItems" :key="item.value" class="locale-menu-item"
        :aria-label="t('components.aria.select_language', { name: item.label })"
        :aria-current="item.value === locale ? 'true' : undefined" role="menuitem" @click="handleLocaleSwitch(item)"
      >
        <div class="flex items-center w-full">
          <!-- Current selected language checkmark -->
          <div class="w-6 flex items-center justify-center">
            <UIcon
              v-if="item.value === locale" name="lucide:check" class="h-4 w-4"
              :aria-label="t('components.aria.current_language', { name: item.label })"
            />
          </div>
          <!-- Language name -->
          <span>{{ item.label }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
/**
 * Component level styles
 * Using Tailwind's @apply directive for utility classes
 */

/* Language switch icon styles */
.locale-icon {
  @apply w-5 h-5 sm:w-6 sm:h-6;
  /* Responsive sizing */
}

/* Language menu item styles */
.locale-menu-item {
  @apply flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200;
  /* Dark theme adaptation */
}
</style>
