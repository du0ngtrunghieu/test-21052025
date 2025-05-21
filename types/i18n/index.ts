import type { BaseItem } from "../core/common"

/**
 * Supported language type
 */
export type Locale = "vi" | "en"

/**
 * Language option type
 */
export interface LocaleItem extends BaseItem {
  /** Language code */
  value: Locale
  /** Display label */
  label: string
  flag : string
}

/**
 * Language object type
 */
export interface LocaleObject {
  code: Locale
  name?: string
  flag?: string
}
