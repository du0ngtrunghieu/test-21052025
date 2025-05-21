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
const now: Date = new Date()
const targetDate: Date = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

// Define timer type
let timer: NodeJS.Timeout | undefined

// Update countdown function
function updateCountdown(): void {
  const now: Date = new Date()
  const diff: number = targetDate.getTime() - now.getTime()

  if (diff > 0) {
    days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24)
    minutes.value = Math.floor((diff / (1000 * 60)) % 60)
    seconds.value = Math.floor((diff / 1000) % 60)
  }
  else {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    if (timer) {
      clearInterval(timer)
      timer = undefined
    }
  }
}

// // Lifecycle hooks
// onMounted(() => {
//   updateCountdown()
//   timer = setInterval(updateCountdown, 1000)
// })

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
})
</script>

<template>
  <section
    class="block-hero"
  >
    <img
      src="/images/hero/wizard.png" alt="Wizard"
      class="absolute left-[55%] translate-x-[-50%] bottom-[-180px] w-[220px] z-40 md:left-0 md:translate-x-0 md:bottom-0 md:w-[35%] md:z-10"
    >

    <div class="flex flex-col items-center z-20 pt-40 pb-12 md:pt-24 bg-gradient-radial from-[#210544] via-[rgba(23,5,68,0.71)] to-[rgba(23,5,68,0)] bg-[length:27.72%_27.79%] bg-[center_68.15%]  backdrop-blur-[8px] max-lg:gap-10 ">
      <h1
        class="font-playfair text-white text-5xl leading-[50px] md:text-[80px] md:leading-[88px] font-extrabold mb-8 text-center drop-shadow-lg"
      >
        {{ t('hero.ready') }}
      </h1>
      <div class="flex flex-col items-center p-4">
        <div
          class="flex items-center justify-center space-x-4 w-full text-4xl bg-white rounded-2xl shadow-lg py-6 px-8 mb-8 lg:text-6xl lg:w-[756px] lg:h-[150px] lg:space-x-12 mt-4"
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
            <span class="font-playfair md:text-6xl font-extrabold">{{ seconds }}</span>
            <span class="text-xs md:text-base font-bold font-sans mt-2">{{ t('hero.second') }}</span>
          </div>
        </div>
        <p class="text-xs md:text-lg text-white text-center max-w-xl md:mb-4 md:pt-[100px]">
          {{ t('hero.description') }}
        </p>
        <form class="flex bg-white rounded-lg overflow-hidden shadow md:w-[560px] md:h-[56px]">
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(
    27.72% 27.79% at 50.81% 68.15%,
    #210544 0%,
    rgba(23, 5, 68, 0.71) 70.52%,
    rgba(23, 5, 68, 0) 100%
  );

  backdrop-filter: blur(5px);
  z-index: 10;
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
