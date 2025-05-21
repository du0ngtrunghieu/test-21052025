<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"

import { useNuxtApp } from "#app"

const loading = ref(false)
const progress = ref(0)
let progressInterval: NodeJS.Timeout | null = null

// Start loading animation
function startLoading() {
  loading.value = true
  progress.value = 0

  // Simulate progress increase
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      // Fast until 30%
      if (progress.value < 30) {
        progress.value += 4
      }
      // Slower from 30-60%
      else if (progress.value < 60) {
        progress.value += 1.5
      }
      // Even slower from 60-90%
      else {
        progress.value += 0.4
      }
    }
  }, 80)
}

// End loading animation
function finishLoading() {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }

  // Jump to 100%
  progress.value = 100

  // Hide progress bar after 400ms
  setTimeout(() => {
    loading.value = false
    progress.value = 0
  }, 400)
}

onMounted(() => {
  const nuxtApp = useNuxtApp()

  // When page starts loading
  nuxtApp.hook("page:start", () => {
    startLoading()
  })

  // When page finishes loading
  nuxtApp.hook("page:finish", () => {
    finishLoading()
  })

  // When page errors during loading
  nuxtApp.hook("app:error", () => {
    finishLoading()
  })
})

// Cleanup when component unmounts
onBeforeUnmount(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<template>
  <div v-if="loading" class="fixed top-0 left-0 right-0 z-[9999]">
    <div class="h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div
        class="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 transition-all duration-300 ease-in-out"
        :style="{ width: `${progress}%`, opacity: loading ? 1 : 0 }"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-to-r {
  background-size: 200% auto;
  animation: gradient 1.5s linear infinite;
}

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
</style>
