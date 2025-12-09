// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/content', '@nuxt/ui', '@nuxt/image', '@nuxt/eslint', '@nuxt/hints', '@nuxt/devtools', '@nuxt/icon'],
	css: ['~/assets/css/main.css'],
	app: {
		head: {
			htmlAttrs: { lang: 'zh-CN' },
			title: '首页',
			titleTemplate: 'StoneHub | %s',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: 'StoneHub 个人站点' },
				{ name: 'theme-color', content: '#5fb3f5' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:site_name', content: 'StoneHub' },
				{ property: 'og:title', content: 'StoneHub' },
				{ property: 'og:description', content: 'StoneHub 个人站点' },
				{ name: 'twitter:card', content: 'summary_large_image' },
			],
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' },
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
			],
		},
	},
	runtimeConfig: {
		public: {
			siteName: 'StoneHub',
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
			apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
			analyticsId: process.env.NUXT_PUBLIC_ANALYTICS_ID || '',
		},
	},
	image: {
		formats: ['webp', 'avif', 'png'],
		quality: 80,
	},
	content: {
		highlight: {
			theme: {
				default: 'github-light',
				dark: 'github-dark',
			},
		},
	},
})
