<script setup lang="ts">
import { GAME_DATA } from "~/data/data_mock"

import { useI18n } from "#imports"

const { t } = useI18n()

const games = GAME_DATA


// Offset logic for grid items
const shouldOffsetPC = (index: number): boolean => {
  return Math.floor((index - 1) / 3) % 2 !== 0
}

const shouldOffsetMobile = (index: number): boolean => {
  return Math.floor((index - 1) / 6) % 2 !== 0
}


</script>

<template>
  <section id="game" class="font-montserrat md:pb-32">
    <div class="mx-auto px-4 md:px-20 pb-[128px]">
      <h2 class="text-4xl md:text-5xl font-playfair font-bold text-center text-gray-900 mb-6">
        {{ t('game.our_game') }}
      </h2>
      <p class="text-center text-gray-600 text-sm md:text-base max-w-3xl mx-auto mb-12 md:mb-16">
        {{ t('game.our_game_des') }}
      </p>

      <div class="grid-container gap-4 md:gap-6">
        <div
          v-for="(game, index) in games"
          :key="game.id"
          :class="[
            'game-card relative rounded-xl overflow-hidden shadow-lg group w-full transition-transform duration-500',
            shouldOffsetMobile(index + 1) ? 'translate-y-[10%] lg:translate-y-0' : '',
            shouldOffsetPC(index + 1) ? 'lg:translate-y-[10%]' : '',
          ]"
        >
          <img
            :src="`${game.img}`"
            :alt="game.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 to-transparent p-2 lg:p-4 xl:p-8 flex flex-col justify-end">
            <h3 class="text-white text-2xl md:text-3xl font-montserrat font-bold mb-2">
              {{ game.title }}
            </h3>
            <p class="text-gray-300 text-xs md:text-sm leading-relaxed">
              {{ game.des }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 1fr);
}

@media (max-width: 1023px) {
  .grid-container {
    grid-auto-flow: column;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
