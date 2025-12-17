// https://nuxt.com/docs/api/configuration/nuxt-config
const mdcOptimizeDepsBlocklist = [
	'@nuxtjs/mdc',
	'remark-gfm',
	'remark-emoji',
	'remark-mdc',
	'remark-rehype',
	'rehype-raw',
	'parse5',
	'unist-util-visit',
	'unified',
	'debug',
] as const

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
				{ name: 'theme-color', content: '#0ea5e9' },
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
		format: ['webp', 'avif', 'png'],
		quality: 80,
	},
	content: {
		build: {
			markdown: {
				highlight: {
					theme: {
						default: 'github-light',
						dark: 'github-dark',
						sepia: 'monokai',
					},
					langs: ['c', 'cpp', 'java'],
				},
			},
		},
	},
	// 配置 @nuxt/ui 禁用字体功能
	ui: {
		fonts: false,
	},
	// Nuxt Content 会把 @nuxtjs/mdc 的一组依赖加到 Vite client 的 optimizeDeps.include 中；
	// 在 pnpm 严格依赖树下，这些依赖通常无法从项目根解析，导致 Vite 打 WARN。
	// 这里直接从最终的 include 里过滤掉这些条目，避免无意义的预构建解析。
	hooks: {
		// 先过滤一轮（模块通常在此阶段追加 include）
		'vite:extendConfig'(config, ctx) {
			if (!ctx?.isClient) return
			const mutableConfig = config as any
			const optimizeDeps = (mutableConfig.optimizeDeps ??= {})
			if (!Array.isArray(optimizeDeps.include) || optimizeDeps.include.length === 0) return

			const blocklist = new Set<string>(mdcOptimizeDepsBlocklist)
			optimizeDeps.include = optimizeDeps.include.filter((id: string) => !blocklist.has(id))
		},
		// 再兜底过滤一轮（确保最终传给 Vite 的 client config 不含这些条目）
		'vite:configResolved'(config, ctx) {
			if (!ctx?.isClient) return
			const mutableConfig = config as any
			const optimizeDeps = (mutableConfig.optimizeDeps ??= {})
			if (!Array.isArray(optimizeDeps.include) || optimizeDeps.include.length === 0) return

			const blocklist = new Set<string>(mdcOptimizeDepsBlocklist)
			optimizeDeps.include = optimizeDeps.include.filter((id: string) => !blocklist.has(id))
		},
	},
})
