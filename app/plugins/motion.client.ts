import { MotionPlugin, type MotionPluginOptions } from '@vueuse/motion'

const basePresets = {
	'fade-rise': {
		initial: { opacity: 0, y: 24 },
		enter: { opacity: 1, y: 0 },
		transition: {
			type: 'tween',
			duration: 0.28,
			easing: 'cubic-bezier(0.2, 0, 0, 1)',
		},
	},
	'slide-up': {
		initial: { opacity: 0, y: 32 },
		enter: { opacity: 1, y: 0 },
		transition: {
			type: 'tween',
			duration: 0.3,
			easing: 'cubic-bezier(0.2, 0, 0, 1)',
		},
	},
	'slide-up-fade': {
		initial: { opacity: 0, y: 40 },
		enter: { opacity: 1, y: 0 },
		transition: {
			type: 'tween',
			duration: 0.32,
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
	'fade-in': {
		initial: { opacity: 0 },
		enter: { opacity: 1 },
		transition: {
			type: 'tween',
			duration: 0.22,
			easing: 'cubic-bezier(0.2, 0, 0, 1)',
		},
	},
}

const reducedPreset = {
	initial: { opacity: 0 },
	enter: { opacity: 1 },
	transition: {
		type: 'tween',
		duration: 0.16,
	},
}

export default defineNuxtPlugin((nuxtApp) => {
	let prefersReducedMotion =
		import.meta.client && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

	const computePresets = () =>
		prefersReducedMotion ? Object.fromEntries(Object.keys(basePresets).map((key) => [key, reducedPreset])) : basePresets

	const applyReduceAttr = () => {
		if (!import.meta.client) return
		if (prefersReducedMotion) {
			document.documentElement.setAttribute('data-reduce-motion', 'true')
		} else {
			document.documentElement.removeAttribute('data-reduce-motion')
		}
	}

	if (import.meta.client && window.matchMedia) {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)')
		const handler = (event: MediaQueryListEvent) => {
			prefersReducedMotion = event.matches
			applyReduceAttr()
		}
		media.addEventListener('change', handler)
	}

	applyReduceAttr()

	nuxtApp.vueApp.use(MotionPlugin, {
		presets: computePresets(),
	} as unknown as MotionPluginOptions<string>)
})
