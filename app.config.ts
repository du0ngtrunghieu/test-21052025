import { seoConfig } from "./config/seo"
import { uiConfig } from "./config/theme"

export default defineAppConfig({
  // SEO configuration
  seo: seoConfig.defaults,
  // UI theme configuration
  ui: uiConfig,
})
