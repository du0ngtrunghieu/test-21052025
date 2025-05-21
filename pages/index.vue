/**
* pages/index.vue - Homepage
* Contains the main content of the website, including Hero section, product features, showcase and call-to-action sections
*/
<script setup lang="ts">
// Import SEO related composable function
import { useSeo } from "~/composables/useSeo"

// Get SEO update method
const { updatePageSeo } = useSeo()

// Update homepage SEO information
// 'home' parameter corresponds to homepage SEO config defined in i18n
updatePageSeo("home")
</script>

<template>
  <!-- Page main container -->
  <div>
    <!-- Main content area -->
    <main>
      <BlockHero />
    </main>
  </div>
</template>

<style scoped>
/**
 * Page level styles
 * Using scoped attribute to ensure styles only apply to current component
 */
</style>
