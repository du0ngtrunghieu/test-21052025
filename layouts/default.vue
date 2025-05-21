/**
 * layouts/default.vue - Default Layout Component
 * Provides base layout structure and global styles for all pages
 * Includes theme switching, scrollbar styling and page transition animations
 */
<template>
  <!--
    Main container
    min-h-screen: Minimum height set to viewport height
    bg-white/dark:bg-gray-900: Light/dark theme background colors
    transition-colors: Color transition animation
   -->
  <div class="min-h-screen bg-white transition-colors duration-200 ease-in-out dark:bg-gray-900">
    <!-- Page header -->
    <LayoutHeader />

    <!--
      Page wrapper
      Used for page transition animation effects
     -->
    <div class="page-wrapper">
      <!-- Page content slot -->
      <slot />
    </div>

    <!-- Page footer -->
    <LayoutFooter />
  </div>
</template>

<style>
/**
 * Global style definitions
 * Includes scrollbar styling, page transitions and smooth scrolling effects
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
  /* Transparent background */
}

/* Scrollbar thumb styles */
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  /* Light theme thumb color */
  border-radius: 4px;
  /* Rounded corners */
  visibility: hidden;
  /* Hidden by default */
  transition: opacity 0.3s ease;
  /* Opacity transition animation */
}

/* Dark theme scrollbar thumb styles */
.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
  /* Dark theme thumb color */
}

/* Dark theme scrollbar thumb hover styles */
.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
  /* Dark theme hover thumb color */
}

/*
 * Scrollbar visibility logic
 * Show scrollbar in these cases:
 * 1. Mouse hover over scrollable element
 * 2. Element has focus
 * 3. Child element has focus
 * 4. Mouse hover over scrollbar
 * 5. During scrolling
 */
:is(*:hover, *:focus, *:focus-within) ::-webkit-scrollbar-thumb,
*::-webkit-scrollbar-thumb:hover,
*::-webkit-scrollbar-thumb:active {
  visibility: visible;
}

/* Page wrapper styles */
.page-wrapper {
  position: relative;
  /* Relative positioning for page transition animations */
}

/*
 * Global smooth scrolling
 * Uses CSS scroll-behavior for smooth in-page navigation
 */
html {
  scroll-behavior: smooth;
}
</style>
