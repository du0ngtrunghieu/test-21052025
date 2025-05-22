<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

import { useI18n } from "#imports"

const { t } = useI18n()

// Reactive variables for countdown
const days = ref<number>(0)
const hours = ref<number>(0)
const minutes = ref<number>(0)
const seconds = ref<number>(0)

// Define the target date
const now = new Date()
const targetDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

// Use requestAnimationFrame for smoother updates
let rafId: number | undefined
let lastUpdate = 0

function updateCountdown(timestamp: number): void {
  if (timestamp - lastUpdate < 1000) {
    rafId = requestAnimationFrame(updateCountdown)
    return
  }
  lastUpdate = timestamp

  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()

  if (diff > 0) {
    const newDays = Math.floor(diff / (1000 * 60 * 60 * 24))
    const newHours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const newMinutes = Math.floor((diff / (1000 * 60)) % 60)
    const newSeconds = Math.floor((diff / 1000) % 60)

    if (days.value !== newDays)
      days.value = newDays
    if (hours.value !== newHours)
      hours.value = newHours
    if (minutes.value !== newMinutes)
      minutes.value = newMinutes
    if (seconds.value !== newSeconds)
      seconds.value = newSeconds

    rafId = requestAnimationFrame(updateCountdown)
  }
  else {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = undefined
    }
  }
}

onMounted(() => {
  updateCountdown(performance.now())
})

onUnmounted(() => {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = undefined
  }
})
</script>

<template>
  <section
    class="block-hero"
  >
    <img
      v-once src="/images/hero/wizard.png"
      alt="Wizard"
      class="absolute left-[55%] translate-x-[-50%] bottom-[-180px] w-[220px] z-40 md:left-0 md:translate-x-0 md:bottom-0 md:w-[35%] md:z-10"
    >

    <div class="flex flex-col items-center z-20 pt-28 pb-12 md:pt-24  max-lg:gap-10 ">
      <h1
        class="font-playfair text-white text-5xl leading-[50px] md:text-[80px] md:leading-[88px] font-extrabold md:mb-8 text-center drop-shadow-lg md:w-full"
      >
        {{ t('hero.ready') }}
      </h1>
      <div class="flex flex-col items-center p-4 hero-absolute lg:w-[960px] ">
        <div
          class="flex items-center justify-center space-x-4 w-full text-4xl bg-white rounded-2xl shadow-lg py-6 px-8 mb-8 lg:text-6xl lg:w-[756px] lg:h-[150px] lg:space-x-12 md:mt-4"
        >
          <div class="flex flex-col items-center">
            <span class="font-playfair md:text-6xl font-extrabold">{{ days }}</span>
            <span class="text-xs md:text-base font-bold font-sans mt-2">{{ t('hero.day') }}</span>
          </div>
          <span class="md:text-6xl mx-2">:</span>
          <div class="flex flex-col items-center">
            <span class="font-playfair md:text-6xl font-extrabold">{{ hours }}</span>
            <span class="text-xs md:text-base font-bold font-sans mt-2">{{ t('hero.hour') }}</span>
          </div>
          <span class="md:text-6xl mx-2">:</span>
          <div class="flex flex-col items-center">
            <span class="font-playfair md:text-6xl font-extrabold">{{ minutes }}</span>
            <span class="text-xs md:text-base font-bold font-sans mt-2">{{ t('hero.minute') }}</span>
          </div>
          <span class="md:text-6xl mx-2">:</span>
          <div class="flex flex-col items-center">
            <span class="font-playfair md:text-6xl sm:text-4xl font-extrabold">{{ seconds }}</span>
            <span class="text-xs md:text-base font-bold font-sans mt-2">{{ t('hero.second') }}</span>
          </div>
        </div>
        <p class="text-xs md:text-lg text-white text-center max-w-xl md:mb-4 md:pt-[100px] pb-2">
          {{ t('hero.description') }}
        </p>
        <form class="flex bg-white rounded-lg overflow-hidden shadow md:w-[560px] md:h-[56px] w-full h-[60px]">
          <input type="email" :placeholder="t('hero.input')" class="flex-1 px-4 py-3 outline-none">
          <button type="submit" class="px-5 bg-white text-gray-900 font-bold flex items-center justify-center">
            <UIcon name="lucide:arrow-right" class="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.block-hero {
  background: url('/images/hero/BG.png') center/cover no-repeat;
  aspect-ratio: 16/8;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @apply top-[-10px] mb-60 md:mb-0 relative md:min-h-[988px] flex flex-col justify-center items-center font-montserrat;
}
@media (max-width: 768px) {
  .block-hero {
    background: url('/images/hero/BG_mobile.png') center/fill no-repeat;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.hero-absolute {
  background: radial-gradient(
    50.72% 50.79% at 50.81% 50.15%,
    #210544 0%,
    rgba(23, 5, 68, 0.71) 70.52%,
    rgba(23, 5, 68, 0) 100%
  );
  backdrop-filter: blur(5px);
  border-radius: 50%;
}

@media (max-width: 1023px) {
  .banner-absolute {
    width: 100%;
    padding: 0px 16px;
    top: 136px;
    border-radius: unset;
    gap: 40px;
    backdrop-filter: unset;
  }
}
</style>
