/**
 * config/theme.ts
 * Theme configuration file, manages all theme-related configurations for the application
 */

/**
 * Theme color configuration
 * primary: Main color scheme, used for brand identity and primary interactive elements
 * gray: Neutral colors, used for text and backgrounds
 */
export const themeColors = {
  primary: {
    color: "indigo", // Indigo: Professional, innovative, trustworthy
    hex: "#4f46e5", // Specific hex value for primary color
    gradient: {
      dark: "#6366f1", // Softer gradient transition
    },
  },
  gray: {
    color: "zinc", // Zinc gray: A softer neutral tone
  },
}

/**
 * UI component configuration
 * Mainly used for styling buttons, cards and other components
 */
export const uiConfig = {
  primary: themeColors.primary.color,
  gray: themeColors.gray.color,
  button: {
    // Style variants for white buttons
    color: {
      white: {
        link: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
        solid:
          "shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/50",
        ghost:
          "text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900",
      },
    },
    // Three button variants: solid, ghost, link
    variant: {
      solid:
        "shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400",
      ghost:
        "text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 dark:hover:bg-{color}-950",
      link: "text-{color}-500 hover:text-{color}-600 dark:text-{color}-400 dark:hover:text-{color}-500",
    },
    // Default button configuration
    default: {
      size: "md",
      variant: "solid",
      color: "primary",
    },
  },
}

/**
 * Meta tag configuration
 * Used to configure browser title bar and Windows tile colors
 */
export const metaConfig = [
  { name: "msapplication-TileColor", content: themeColors.primary.hex },
  { name: "theme-color", content: themeColors.primary.hex },
]

// Export all configurations for unified reference
export default {
  colors: themeColors,
  ui: uiConfig,
  meta: metaConfig,
}
