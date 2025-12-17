import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
	ui: {
		// 使用 Nuxt UI v4 的颜色配置
		colors: {
			primary: 'sky', // 使用 @theme 中定义的 sky
			secondary: 'pink', // 使用 @theme 中定义的 pink
			neutral: 'slate',
		},
	},
})
