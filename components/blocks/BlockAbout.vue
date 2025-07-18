<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from '#imports'

const { t } = useI18n()

interface Tweened {
  number: number,
  user : number
}

const number = ref<number>(0)
const user = ref<number>(0)
const tweened = reactive<Tweened>({
  number: 0,
  user: 0,
})

const sectionRef = ref<HTMLElement | null>(null) 
let observer: IntersectionObserver | null = null 

const startAnimation = () => {
  number.value = 600 
  user.value = 135
}

watch(number, (newValue: number) => {
  const target: number = Number(newValue) || 0
  const start: number = tweened.number
  const duration: number = 500
  let startTime: number | null = null

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime
    const elapsed: number = currentTime - startTime
    const progress: number = Math.min(elapsed / duration, 1)

    tweened.number = start + (target - start) * progress

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
})

watch(user, (newValue: number) => {
  const target: number = Number(newValue) || 0
  const start: number = tweened.number
  const duration: number = 500
  let startTime: number | null = null

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime
    const elapsed: number = currentTime - startTime
    const progress: number = Math.min(elapsed / duration, 1)

    tweened.user = start + (target - start) * progress

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
})

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation() 
          observer?.unobserve(sectionRef.value!) 
        }
      })
    },
    {
      threshold: 0.1,
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value)
  }
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="md:py-24 bg-white font-montserrat lg:px-4 max-w-[1160px] mx-auto"
  >
  <UIScrollAnimation animation="fade-right" :duration="1000">
    <div class="mx-auto mb-10">
      <div class="flex flex-col lg:flex-row gap-10">
        <div class="space-y-10 p-4 lg:p-0 w-full lg:w-1/2">
          <h2 class="text-4xl md:text-6xl font-playfair font-semibold text-gray-900">
            {{ t('about.title') }}
          </h2>
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ t('about.description') }}
          </p>
          <div class="flex flex-row lg:flex-col gap-10">
            <div class="pt-4">
              <p class="text-5xl lg:text-[80px] text-[#079BEE] font-bold">
                {{ tweened.number.toFixed(0) }}<span class="text-2xl lg:text-4xl">{{ t('about.million') }}</span>+
              </p>
              <p class="text-2xl text-black font-semibold mt-1">
                {{ t('about.user') }}
              </p>
            </div>
            <div class="pt-4">
              <p class="text-5xl lg:text-[80px] font-bold text-[#079BEE]">
                {{ tweened.user.toFixed(0) }}+
              </p>
              <p class="text-2xl text-black font-semibold mt-1">
                {{ t('about.game') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-[#EEEEEE] shadow-sm space-y-8 h-full p-10 lg:py-28 w-full lg:w-1/2">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="bg-[#E3FCFF] rounded-full">
                <img src="/images/about/time.png" class="w-16 h-16" />
              </div>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ t('about.24_hour') }}
              </h3>
              <p class="text-gray-600 mt-1 text-sm">
                {{ t('about.24_hour_des') }}
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="bg-[#E3FCFF] rounded-full">
                <img src="/images/about/design.png" class="w-16 h-16" />
              </div>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ t('about.design') }}
              </h3>
              <p class="text-gray-600 mt-1 text-sm">
                {{ t('about.design_des') }}
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="bg-[#E3FCFF] rounded-full">
                <img src="/images/about/team.png" class="w-16 h-16" />
              </div>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ t('about.team') }}
              </h3>
              <p class="text-gray-600 mt-1 text-sm">
                {{ t('about.team_des') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative flex min-h-[360px] md:min-h-[540px] lg:min-h-[800px] justify-center items-center">
      <img
        class="absolute top-0 z-10 animate-float-around w-[300px] md:w-[400px] lg:w-[533px]"
        src="/images/about/witch.png"
        alt="witch"
      >
      <img class="absolute bottom-0 w-full" src="/images/about/world.png" alt="world">
    </div>
  </UIScrollAnimation>
  </section>
</template>

<style scoped>
@keyframes floatAroundWorld {
  0% {
    transform: rotate(0deg) translateX(75px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(75px) rotate(-360deg);
  }
}

.animate-float-around {
  animation: floatAroundWorld 5s linear infinite;
}
</style>