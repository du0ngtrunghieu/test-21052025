/**
 * Scroll animation type
 */
export type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"

/**
 * Scroll animation component properties
 */
export interface ScrollAnimationProps {
  animation: AnimationType
  duration?: number
  delay?: number
  threshold?: number
  once?: boolean
  root?: Element | null
  rootMargin?: string
}
