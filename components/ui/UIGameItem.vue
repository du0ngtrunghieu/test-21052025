<script setup lang="ts">
defineProps<{
  game: {
    id: number
    title: string
    des: string
    img: string
  }
}>()
</script>

<template>
  <article class="bg-white relative shadow rounded">
    <img :src="game.img" :alt="game.title" class="rounded-xl">
    <div class="absolute bottom-4 left-3">
      <h2 class="text-2xl font-bold text-white mb-3">
        {{ game.title }}
      </h2>
      <p class="text-white text-sm">
        {{ game.des }}
      </p>
    </div>
  </article>
</template>
