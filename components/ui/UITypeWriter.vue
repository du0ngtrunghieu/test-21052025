<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue"

import type { TypeWriterProps } from "~/types/components/ui/uitypewriter"

const props = defineProps<TypeWriterProps>()

const config = useRuntimeConfig()

const isEnabled = config.public.typewriterEnabled
const defaultSpeed = Number(config.public.typewriterSpeed)

const displayText = ref("")
let currentIndex = 0
let timer: NodeJS.Timeout | null = null

// Clear timer
function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

// Start typewriter effect
function startTyping() {
  clearTimer()
  currentIndex = 0

  // If typewriter effect is disabled, display full text immediately
  if (!isEnabled) {
    displayText.value = props.text
    return
  }

  displayText.value = ""
  const type = () => {
    if (currentIndex < props.text.length) {
      displayText.value += props.text[currentIndex]
      currentIndex++
      timer = setTimeout(type, props.typeSpeed || defaultSpeed)
    }
  }

  timer = setTimeout(type, props.startDelay || 0)
}

// Watch text changes to restart typing effect
watch(
  () => props.text,
  () => {
    startTyping()
  },
  { immediate: true },
)

// Clean up on component unmount
onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <span>{{ displayText }}</span>
</template>

<style scoped>
.typewriter-container {
  display: inline-flex;
  align-items: center;
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.1s ease;
}

.cursor-blink {
  opacity: 0;
}
</style>
