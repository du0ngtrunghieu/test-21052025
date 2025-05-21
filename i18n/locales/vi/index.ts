import { defineI18nLocale } from "#i18n"

// Performance optimization, load on demand; enable namespaces;

export default defineI18nLocale(async () => ({
  site: await import("./site.json").then(r => r.default),
  footer: await import("./footer.json").then(r => r.default),
  nav: await import("./nav.json").then(r => r.default),
  components: await import("./components.json").then(r => r.default),
  hero : await import("./hero.json").then(r => r.default),
}))
