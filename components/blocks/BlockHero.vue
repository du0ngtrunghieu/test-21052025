<script setup lang="ts">
import { useI18n } from "#imports"

const { t } = useI18n()

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
</script>

<template>
    <section
        class="block-hero relative overflow-hidden bg-gradient-to-b from-white via-gray-50/80 to-white py-16 dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900 sm:py-20 transition-colors duration-200">
        <div class="">

            <img src="/images/hero/wizard.png" alt="Wizard"
                class="absolute w-[100px] z-40 md:left-0 md:translate-x-0 md:bottom-0 md:w-[33%] md:z-10">
        </div>

        <div class="flex flex-col items-center z-20 pt-40 pb-12 md:pt-24">
            <h1
                class="font-playfair text-white text-5xl leading-[50px] md:text-[80px] md:leading-[88px] font-extrabold mb-8 text-center drop-shadow-lg">
                {{ t('hero.ready') }}</h1>
            <div class="flex flex-col items-center p-4">
                <div
                    class="flex items-center justify-center space-x-4 w-full text-4xl bg-white rounded-2xl shadow-lg py-4 px-8 mb-8 lg:text-6xl lg:w-[756px] lg:h-[150px] lg:space-x-12">
                    <div class="flex flex-col items-center">
                        <span class="font-playfair md:text-6xl font-extrabold">{{ days }}</span>
                        <span class="text-xs md:text-base font-bold font-sans mt-2">{{ t('hero.day') }}</span>
                    </div>
                    <span class="md:text-6xl mx-2">:</span>
                    <div class="flex flex-col items-center">
                        <span class="font-playfair md:text-6xl font-extrabold">{{ hours }}</span>
                        <span class="text-xs md:text-base font-bold font-sans mt-2">{{  t('hero.hour') }}</span>
                    </div>
                    <span class="md:text-6xl mx-2">:</span>
                    <div class="flex flex-col items-center">
                        <span class="font-playfair md:text-6xl font-extrabold">{{ minutes }}</span>
                        <span class="text-xs md:text-base font-bold font-sans mt-2">{{ t('hero.minute') }}</span>
                    </div>
                    <span class="md:text-6xl mx-2">:</span>
                    <div class="flex flex-col items-center">
                        <span class="font-playfair md:text-6xl font-extrabold">{{ seconds }}</span>
                        <span class="text-xs md:text-base font-bold font-sans mt-2">{{  t('hero.second') }}</span>
                    </div>
                </div>
                <p class="text-xs md:text-lg text-white text-center mb-6 max-w-xl">
                    {{  t('hero.description') }}
                </p>
                <form class="w-full flex bg-white rounded-lg overflow-hidden shadow">
                    <input type="email" class="flex-1 px-4 py-3 outline-none" />
                    <button type="submit" class="px-5 bg-white text-gray-900 font-bold">
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
.block-hero {
    background: url('/images/hero/BG.png') center/cover no-repeat;
    @apply top-[0px] mb-60 md:mb-0 relative md:min-h-[1088px] flex flex-col justify-center items-center;
}

@media (max-width: 768px) {
    .block-hero {
        background: url('/images/hero/coming-soon-bg_phone.png') center/cover no-repeat;
    }
}
</style>
