import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
	collections: {
		blog: defineCollection({
			type: 'page',
			source: 'blog/**/*.md',
		}),
		projects: defineCollection({
			type: 'page',
			source: 'projects/**/*.md',
			// 允许 meta 扩展字段
			meta: {
				year: { type: 'string', required: false },
				icon: { type: 'string', required: false },
				tags: { type: 'array', default: [], items: { type: 'string' } },
			},
		}),
		links: defineCollection({
			type: 'data',
			source: 'links.(json|yaml|yml)',
		}),
		now: defineCollection({
			type: 'data',
			source: 'now.(json|yaml|yml)',
		}),
	},
})
