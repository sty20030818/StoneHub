import { MotionPlugin, type MotionPluginOptions } from '@vueuse/motion'

const basePresets = {
	'fade-rise': {
		initial: { opacity: 0, y: 16 },
		enter: { opacity: 1, y: 0 },
		transition: {
			type: 'tween',
			duration: 0.28,
			easing: 'cubic-bezier(0.2, 0, 0, 1)',
		},
	},
	'scale-fade': {
		initial: { opacity: 0, scale: 0.96 },
		enter: { opacity: 1, scale: 1 },
		transition: {
			type: 'tween',
			duration: 0.24,
			easing: 'cubic-bezier(0.2, 0, 0, 1)',
		},
	},
}

const reducedPreset = {
	initial: { opacity: 0 },
	enter: { opacity: 1 },
	transition: {
		type: 'tween',
		duration: 0.18,
	},
}

export default defineNuxtPlugin((nuxtApp) => {
	const prefersReducedMotion =
		import.meta.client && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

	const presets = prefersReducedMotion
		? Object.fromEntries(Object.keys(basePresets).map((key) => [key, reducedPreset]))
		: basePresets

	nuxtApp.vueApp.use(MotionPlugin, {
		// MotionPluginOptions 未显式包含 presets，断言为已支持选项
		presets,
	} as unknown as MotionPluginOptions<string>)
})
