import { defineI18nLocale } from "#i18n"

// Performance optimization, load on demand; enable namespaces;

export default defineI18nLocale(async () => ({
  contact: await import("./contact.json").then(r => r.default),
  nav: await import("./nav.json").then(r => r.default),
  components: await import("./components.json").then(r => r.default),
  hero: await import("./hero.json").then(r => r.default),
  about: await import("./about.json").then(r => r.default),
  seo: await import("./seo.json").then(r => r.default),
  game : await import("./game.json").then(r => r.default),
  partner : await import("./partner.json").then(r => r.default)
}))
