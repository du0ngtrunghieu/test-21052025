<script setup lang="ts">

import { useI18n } from "#imports"
import type { SocialLink } from "~/types/components/layout/layoutfooter";

const { t } = useI18n()

const socialLinks: SocialLink[] = [
    {
        icon: "/images/contact/twitter-outlined.png",
        href: "#",
        label: t("footer.social.twitter"),
    },
    {
        icon: "/images/contact/facebook-filled.png",
        href: "#",
        label: t("footer.social.facebook"),
    },
    {
        icon: "/images/contact/linkedin-filled.png",
        href: "#",
        label: t("footer.social.linkedin"),
    },
]

</script>


<template>
    <section id="contact" class="relative">
        <UIScrollAnimation animation="fade-right" :duration="1000">
            <div class="absolute inset-0 w-full h-full">
                <img src="/images/contact/contact_bg_desktop.png" alt="Footer Background"
                    class="hidden md:block w-full h-full object-cover" />
                <img src="/images/contact/contact_bg_mobile.png" alt="Footer Background"
                    class="block md:hidden w-full h-full object-cover" />
            </div>
            <div
                class="relative z-10 container mx-auto px-4 py-12 flex flex-col lg:flex-row justify-between items-center gap-y-8 lg:gap-y-0">
                <div class="flex flex-col items-center lg:items-start">
                    <img src="/logo.svg" alt="Company Logo" class="h-16 mb-6" />
                    <div class="flex items-center justify-center lg:justify-start space-x-2">
                        <a v-for="social in socialLinks" :key="social.href" :href="social.href" target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-500 hover:text-[var(--primary-light)] dark:text-gray-400 dark:hover:text-[var(--primary-dark)] transition-colors duration-300 pt-2 rounded-lg hover:bg-gray-600/20 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                            :aria-label="social.label">
                            <img  :src="social.icon" class="h-7 w-7"/>
                        </a>
                    </div>
                </div>
                <div class="text-left text-white w-full lg:max-w-md">
                    <h3 class="text-xl font-bold mb-4">{{ t('contact.address') }}</h3>
                    <div class="flex items-start mb-2">
                        <img src="/images/contact/location.png" class="min-w-10 h-10 w-10" />
                        <div class="flex flex-col gap-y-2">
                            <span>{{ t('contact.address_us') }}</span>
                            <span>{{ t('contact.address_vn') }}</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <img src="/images/contact/mobile.png" class="min-w-10 h-10 w-10" />
                        <span>{{ t('contact.number') }}</span>
                    </div>
                </div>
                <div class="text-left w-full lg:max-w-xs">
                    <h3 class="text-xl font-bold mb-4 text-white">{{ t('contact.subscribe') }}</h3>
                    <p class="text-white mb-4">{{ t('contact.subscribe_des') }}</p>
                    <form class="flex bg-transparent border border-white rounded-lg text-white">
                        <input type="email" placeholder="Email" class="flex-1 bg-transparent px-4 py-2 rounded-l-lg outline-none" />
                        <button type="submit" class="px-4 pt-2">
                            <UIcon name="lucide:arrow-right" size="20"/>
                        </button>
                    </form>
                </div>
            </div>
        </UIScrollAnimation>
    </section>
</template>