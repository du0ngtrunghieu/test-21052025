import type { ColorTag, IconItem } from "../core/common"

/**
 * Platform type
 */
export interface Platform extends IconItem {
  name: string
}

/**
 * Showcase item type
 */
export interface ShowcaseItem {
  id?: string
  type: "web" | "mobile" | "desktop"
  image: string
  link?: string
  platforms: Platform[]
  qrCode?: string
  qrCodeDescription?: string
  tags: ColorTag[]
  isOnline: boolean
}

/**
 * Showcase configuration type
 */
export interface ShowcaseConfig {
  items: ShowcaseItem[]
}

/**
 * QR code modal state type
 */
export interface QRCodeModalState {
  isOpen: boolean
  title: string
  qrCodeUrl: string
  description: string
}
