import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
	ui: {
		// 使用 Nuxt UI v4 的颜色配置
		colors: {
			primary: 'sky', // 使用 @theme 中定义的 sky
			secondary: 'pink', // 使用 @theme 中定义的 pink
			neutral: 'slate',
		},
		// 目标:在不明显改变视觉的前提下，把“通用约束”集中到这里，减少模板分散配置。
		button: {
			slots: {
				// 全局默认胶囊按钮(如需方形/分组按钮，使用 `square`/FieldGroup 或局部 class 覆盖)
				base: 'select-none rounded-full',
			},
		},
		card: {
			slots: {
				root: 'min-w-0',
			},
		},
		page: {
			slots: {
				root: 'min-w-0',
				center: 'min-w-0',
			},
		},
		// Overlay:只做轻量增强(blur)，避免影响最终态布局/色彩基线。
		modal: {
			slots: {
				overlay: 'backdrop-blur-sm',
			},
		},
		slideover: {
			slots: {
				overlay: 'backdrop-blur-sm',
			},
		},
		toaster: {
			slots: {
				viewport: 'z-120',
			},
		},
	},
})
