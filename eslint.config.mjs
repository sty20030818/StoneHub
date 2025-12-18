// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	rules: {
		// 强制 Vue SFC 块顺序:template → script → style
		'vue/block-order': [
			'error',
			{
				order: ['template', 'script', 'style'],
			},
		],
	},
})
