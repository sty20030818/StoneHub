// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/content', '@nuxt/ui', '@nuxt/image', '@nuxt/eslint', '@nuxt/hints', '@nuxt/devtools', '@nuxt/icon'],
	css: ['~/assets/css/main.css'],
})
