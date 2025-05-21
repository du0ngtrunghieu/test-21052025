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
  isMobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alwaysShowName: false,
  isMobile : false
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
    flag: l.flag || "",
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
  <div ref="localeMenuRef" :class="[
      'relative',
      !!props.isMobile ? 'border border-gray-700 rounded-lg bg-gray-200' : ''
    ]">
    <!-- Language switch button with tooltip -->
    <UTooltip :text="t('components.locale_switch.tooltip')">
      <UButton color="gray" variant="ghost" :ui="{
        padding: {
          base: 'p-2',
          sm: 'p-2.5',
          md: 'p-3',
        },
        rounded: 'rounded-md',
      }" :aria-label="t('components.locale_switch.toggle_locale')" :aria-expanded="isLocaleMenuOpen"
        @click="toggleLocaleMenu">
        <!-- Screen reader text -->
        <span class="sr-only">{{ t('components.locale_switch.toggle_locale') }}</span>
        <!-- Button content -->
        <div class="flex items-center space-x-1.5">
          <!-- Globe icon -->
          <!-- <UIcon name="lucide:globe" class="locale-icon" /> -->
          <!-- Current language name -->

          <img :src="currentLocale.flag" :alt="currentLocale.name" class="w-6 h-6 object-cover rounded-sm" />
          <!-- Dropdown arrow icon -->
          <UIcon name="lucide:chevron-down" class="w-4 h-4 transition-transform duration-200 bg-white"
            :class="{ 'rotate-180': isLocaleMenuOpen, '!bg-gray-900' : !!props.isMobile }" />
        </div>
      </UButton>
    </UTooltip>

    <div v-show="isLocaleMenuOpen"
      class=""
      :class="[
        'absolute  top-[60px] w-[196px] rounded-lg bg-white py-1 shadow-lg ring-1 ring-gray-200/50 dark:bg-gray-800/95 dark:ring-gray-700/50 backdrop-blur-xl z-50',
        !!props.isMobile ? 'left-0 -translate-x-3/2' : 'left-3/2 -translate-x-1/2'
      ]"
      role="menu" aria-orientation="vertical">
      <!-- Language option list -->
      <button v-for="(item, idx) in localeItems" :key="item.value" class="locale-menu-item"
        :class="{ 'border-b border-gray-200': idx < localeItems.length - 1 }"
        :aria-label="t('components.aria.select_language', { name: item.label })"
        :aria-current="item.value === locale ? 'true' : undefined" role="menuitem" @click="handleLocaleSwitch(item)">
        <div class="flex items-center w-full">
          <span v-if="item.value === locale" class="min-w-4 text-black mr-2">
            <UIcon name="lucide:check" class="theme-icon font-bold text-black" />
          </span>
          <span v-else class="min-w-4 mr-2"></span>
          <!-- Current selected language checkmark -->
          <img :src="item.flag" :alt="item.label" class="w-8 rounded-sm mr-3">
          <!-- Language name -->
          <span class="text-black text-md font-montserrat font-bold">{{ item.label }}</span>
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

.theme-icon {
  @apply w-5 h-5 sm:w-6 sm:h-6;
  transform: none;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
