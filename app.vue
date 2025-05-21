/**
* app.vue - Root component of the application
* This is the entry point of the entire application, containing global layout and base styles
*/
<script setup lang="ts">
// Using Vue's Composition API and TypeScript

// Get color mode instance for managing light/dark theme
// useColorMode is a composable function provided by Nuxt for theme switching
const colorMode = useColorMode()

// Set HTML tag class to implement theme switching
// useHead is a composable function provided by Nuxt for managing <head> tags
useHead({
  htmlAttrs: {
    // Use computed property to dynamically update theme class
    class: computed(() => colorMode.value),
  },
})
</script>

<template>
  <!-- Page loading progress bar component -->
  <UILoadingBar />

  <!-- Main content container -->
  <div>
    <!-- NuxtLayout: Layout component for wrapping page content -->
    <NuxtLayout>
      <!-- NuxtPage: Page component that dynamically loads based on route -->
      <NuxtPage />
    </NuxtLayout>

    <!-- Back to top button component -->
    <UIBackToTop />

    <!-- Global notifications component -->
    <UNotifications />
  </div>
</template>

<style>
/**
 * Global style definitions
 * Using Tailwind CSS @apply directive to apply utility classes
 */

/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 8px;
  /* Vertical scrollbar width */
  height: 8px;
  /* Horizontal scrollbar height */
}

/* Scrollbar track styles */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Scrollbar thumb styles */
::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600;
  /* Background color for light/dark themes */
  border-radius: 4px;
  /* Border radius */
}

/* Scrollbar thumb hover styles */
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
  /* Background color on hover */
}

/* Text selection styles */
::selection {
  @apply bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100;
}

/**
 * Theme switching animation
 * Using CSS View Transitions API for smooth theme switching effects
 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* Light theme transition animation */
::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2;
}

/* Dark theme transition animation */
.dark::view-transition-old(root) {
  z-index: 2;
}

.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
