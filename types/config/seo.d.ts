/**
 * Twitter card type
 */
export type TwitterCard = "summary" | "summary_large_image" | "app" | "player"

/**
 * Open Graph type
 */
export type OGType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_status"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other"

/**
 * Social media configuration
 */
export interface SocialMedia {
  twitter: {
    card: TwitterCard
    creator: string
    site: string
  }
  facebook?: {
    appId?: string
  }
}

/**
 * SEO configuration
 */
export interface SEOConfig {
  defaults: {
    titleTemplate: string
    author: string
    ogImage: string
    title?: string
    description?: string
    keywords?: string
  }
  social: SocialMedia
  pages: string[]
  getSiteUrl: () => string
  generateUrl: (path: string) => string
  generateImageUrl: (imagePath: string) => string
}

/**
 * SEO properties
 */
export interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: OGType
}
