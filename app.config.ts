import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
	ui: {
		strategy: 'override',
		primary: '#0ea5e9',
		secondary: '#ec4899',
		gray: 'slate',
		radius: 'xl',
		variables: {
			shadow: {
				xl: 'var(--shadow-soft)',
			},
			rounded: '16px',
		},
	},
})
