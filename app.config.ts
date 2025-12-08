import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
	ui: {
		primary: 'indigo',
		gray: 'slate',
		radius: 'full',
		variables: {
			shadow: {
				xl: 'var(--shadow-glass)',
			},
		},
	},
})
