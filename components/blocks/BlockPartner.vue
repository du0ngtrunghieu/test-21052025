<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

import { useI18n } from "#imports"
import { OUR_PARTNER } from '~/data/data_mock'

const { t } = useI18n()

interface Partner {
  imageUrl: string
}

interface CarouselBreakpoint {
  itemsToShow: number
}

const carouselBreakpoints: Record<number, CarouselBreakpoint> = {
  0: { itemsToShow: 2 }, // Mobile
  600: { itemsToShow: 3 }, // Tablet
  1024: { itemsToShow: 5 }, // PC
}

const partners = OUR_PARTNER

// Carousel logic
const carouselRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const itemsToShow = ref(carouselBreakpoints[1024].itemsToShow) // Default for SSR

const updateItemsToShow = (): void => {
  if (typeof window === 'undefined') {
    itemsToShow.value = carouselBreakpoints[1024].itemsToShow // Fallback for SSR
    return
  }
  const width = window.innerWidth
  if (width >= 1024) {
    itemsToShow.value = carouselBreakpoints[1024].itemsToShow
  } else if (width >= 600) {
    itemsToShow.value = carouselBreakpoints[600].itemsToShow
  } else {
    itemsToShow.value = carouselBreakpoints[0].itemsToShow
  }
}

const scrollToIndex = (index: number): void => {
  if (!carouselRef.value) return
  const totalItems = partners.length
  currentIndex.value = (index + totalItems) % totalItems
  const itemWidth = carouselRef.value.scrollWidth / totalItems
  const scrollPosition = currentIndex.value * itemWidth

  carouselRef.value.scrollTo({
    left: scrollPosition,
    behavior: 'smooth',
  })
}

const prevSlide = (): void => {
  scrollToIndex(currentIndex.value - 1)
}

const nextSlide = (): void => {
  scrollToIndex(currentIndex.value + 1)
}

// Handle window resize for responsive itemsToShow
const handleResize = (): void => {
  updateItemsToShow()
  scrollToIndex(currentIndex.value) // Re-align on resize
}

onMounted(() => {
  updateItemsToShow()
  scrollToIndex(0) // Initialize carousel position
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})



</script>

<template>
<section id="partner" class="bg-[#F6F6F6] py-12">
    <div class="max-w-5xl mx-auto text-center mb-8">
      <h2 class="text-4xl font-playfair font-bold mb-2">{{ t('partner.title') }}</h2>
    </div>
    <div class="relative mx-auto max-w-6xl">
      <div
        ref="carouselRef"
        class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hidden"
        :style="{ scrollSnapType: 'x mandatory' }"
      >
        <div
          v-for="(partner, index) in partners"
          :key="index"
          class="flex-shrink-0 flex items-center justify-center h-16 w-44 lg:h-24 lg:w-64 snap-center"
          :style="{ width: `calc(100% / ${itemsToShow})` }"
        >
          <img :src="partner" class="max-h-20 object-contain" alt="Partner logo" />
        </div>
      </div>
      <button
        class="absolute top-1/2 -translate-y-1/2 bg-white shadow rounded-xl p-2 xl:-left-[50px] flex item-center"
        @click="prevSlide"
      >
        <UIcon name="lucide:chevron-left" size="20"/>
      </button>
      <button
        class="absolute top-1/2 -translate-y-1/2 bg-white shadow rounded-xl p-2 xl:-right-[50px] flex item-center"
        @click="nextSlide"
      >
      <UIcon name="lucide:chevron-right" size="20"/>
      </button>
    </div>
  </section>
</template>


<style scoped>

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>