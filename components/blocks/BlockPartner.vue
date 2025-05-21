<script setup lang="ts">
import { useI18n } from "#imports"
import { OUR_PARTNER } from '~/data/data_mock'
import 'vue3-carousel/dist/carousel.css'

const { t } = useI18n()

interface CarouselBreakpoint {
  itemsToShow: number
}

const carouselBreakpoints: Record<number, CarouselBreakpoint> = {
  0: { itemsToShow: 2 }, // Mobile
  600: { itemsToShow: 3 }, // Tablet
  1024: { itemsToShow: 5 }, // PC
}
</script>

<template>
<section id="partner" class="bg-[#F6F6F6] py-10">
    <div class="max-w-5xl mx-auto text-center mb-8">
      <h2 class="text-4xl font-playfair font-bold mb-2">{{ t('partner.title') }}</h2>
    </div>
    <CCarousel :wrap-around="true" :breakpoints="carouselBreakpoints" class="mx-auto max-w-6xl">
      <CSlide v-for="(partners, idx) in OUR_PARTNER" :key="idx">
        <div class="flex items-center justify-center h-16 w-44 lg:h-24 lg:w-64">
          <img :src="partners" class="max-h-20 object-contain" />
        </div>
      </CSlide>

      <template #addons>
        <CNavigation>
          <template #prev>
            <span class="bg-white shadow rounded-xl flex item-center justify-center ">
              <UIcon name="lucide:chevron-left" size="30" />
            </span>
          </template>
          <template #next>
            <span class="bg-white shadow rounded-xl flex item-center justify-center ">
              <UIcon name="lucide:chevron-right" size="30"/>
            </span>
          </template>
        </CNavigation>
      </template>
    </CCarousel>
    
  </section>
</template>


<style>
@media (min-width: 1025px) {
  .carousel__prev {
    left: -50px;
  }
  .carousel__next {
    right: -50px;
  }
}
</style>