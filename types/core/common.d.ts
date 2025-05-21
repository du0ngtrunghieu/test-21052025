/**
 * Base project type
 */
export interface BaseItem {
  /** Display label */
  label: string
  /** Value */
  value: string | number
  /** Disabled state */
  disabled?: boolean
}

/**
 * Icon item type
 */
export interface IconItem {
  /** Name */
  name: string
  /** Icon */
  icon: string
}

/**
 * Color tag type
 */
export interface ColorTag extends IconItem {
  /** Color */
  color: string
}

/**
 * 社交媒体类型
 */
export interface Social extends IconItem {
  /** Social media name */
  name: string
  /** Social media link */
  url?: string
}
