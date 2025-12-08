import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
	ui: {
		strategy: 'override',
		primary: 'sky',
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
