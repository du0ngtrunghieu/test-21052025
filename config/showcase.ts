import type { ShowcaseConfig, ShowcaseItem } from "~/types/config/showcase"

// Showcase configuration
export const showcaseConfig: ShowcaseConfig = {
  items: [
    {
      id: "project1",
      type: "web",
      image: "/images/showcase/project1.svg",
      link: "https://github.com/WaveAny/Nuxt Starter-Starter-Nuxt",
      platforms: [{ name: "Web", icon: "simple-icons:googlechrome" }],
      qrCode: "/images/showcase/qr-code-1.png",
      tags: [
        { name: "Vue.js", icon: "lucide:code", color: "text-emerald-500" },
        {
          name: "TypeScript",
          icon: "lucide:file-code",
          color: "text-blue-500",
        },
        { name: "Tailwind CSS", icon: "lucide:wind", color: "text-cyan-500" },
      ],
      isOnline: true,
    },
    {
      id: "project2",
      type: "web",
      image: "/images/showcase/project1.svg",
      link: "https://github.com/WaveAny/Nuxt Starter-Starter-Nextjs",
      platforms: [{ name: "Web", icon: "simple-icons:googlechrome" }],
      qrCode: "/images/showcase/qr-code-2.png",
      tags: [
        { name: "Next.js", icon: "lucide:code", color: "text-emerald-500" },
        {
          name: "TypeScript",
          icon: "lucide:file-code",
          color: "text-blue-500",
        },
        { name: "Tailwind CSS", icon: "lucide:wind", color: "text-cyan-500" },
      ],
      isOnline: false,
    },
    {
      id: "project3",
      type: "mobile",
      image: "/images/showcase/project1.svg",
      link: "https://hieu98.space/",
      platforms: [
        { name: "iOS", icon: "simple-icons:apple" },
        { name: "Web", icon: "simple-icons:googlechrome" },
      ],
      qrCode: "/images/qr-code-1.png",
      tags: [
        { name: "React", icon: "lucide:code", color: "text-sky-500" },
        { name: "Node.js", icon: "lucide:server", color: "text-green-500" },
        { name: "MongoDB", icon: "lucide:database", color: "text-green-600" },
      ],
      isOnline: false,
    },
    {
      id: "project4",
      type: "desktop",
      image: "/images/showcase/project1.svg",
      link: "https://hieu98.space/",
      platforms: [
        { name: "iOS", icon: "simple-icons:apple" },
        { name: "Android", icon: "simple-icons:android" },
      ],
      qrCode: "/images/qr-code-1.png",
      tags: [
        { name: "Java", icon: "lucide:coffee", color: "text-red-500" },
        { name: "Spring Boot", icon: "lucide:leaf", color: "text-green-500" },
        { name: "MySQL", icon: "lucide:database", color: "text-blue-600" },
      ],
      isOnline: false,
    },
    {
      id: "project5",
      type: "desktop",
      image: "/images/showcase/project1.svg",
      link: "https://hieu98.space/",
      platforms: [
        { name: "iOS", icon: "simple-icons:apple" },

      ],
      qrCode: "/images/qr-code-1.png",
      tags: [
        { name: "Java", icon: "lucide:coffee", color: "text-red-500" },
        { name: "Spring Boot", icon: "lucide:leaf", color: "text-green-500" },
        { name: "MySQL", icon: "lucide:database", color: "text-blue-600" },
      ],
      isOnline: true,
    },
    {
      id: "project6",
      type: "desktop",
      image: "/images/showcase/project1.svg",
      link: "https://hieu98.space/",
      platforms: [
        { name: "iOS", icon: "simple-icons:apple" },

      ],
      qrCode: "/images/qr-code-1.png",
      tags: [
        { name: "Java", icon: "lucide:coffee", color: "text-red-500" },
        { name: "Spring Boot", icon: "lucide:leaf", color: "text-green-500" },
        { name: "MySQL", icon: "lucide:database", color: "text-blue-600" },
      ],
      isOnline: true,
    },
  ],
}

// Get showcase items
export function getShowcaseItems() {
  return showcaseConfig.items
}

// Get showcase item by index
export function getShowcaseItemByIndex(index: number) {
  return showcaseConfig.items[index]
}

// Validate showcase item configuration
export function validateShowcaseItem(item: ShowcaseItem): boolean {
  return Boolean(
    item.type
    && item.image
    && Array.isArray(item.platforms)
    && item.platforms.every(p => p.name && p.icon)
    && Array.isArray(item.tags)
    && item.tags.every(t => t.name && t.icon && t.color),
  )
}
