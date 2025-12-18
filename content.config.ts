import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
	collections: {
		blog: defineCollection({
			type: 'page',
			source: 'blog/**/*.md',
		}),
		projects: defineCollection({
			type: 'page',
			source: 'projects/**/*.md',
			schema: z.object({
				year: z.string().optional(),
				icon: z.string().optional(),
				tags: z.array(z.string()).default([]),
			}),
		}),
		links: defineCollection({
			type: 'data',
			source: 'links.(json|yaml|yml)',
			schema: z.array(
				z.object({
					name: z.string(),
					handle: z.string(),
					icon: z.string(),
					url: z.string(),
					colorBg: z.string().optional(),
					colorText: z.string().optional(),
				}),
			),
		}),
		now: defineCollection({
			type: 'data',
			source: 'now.(json|yaml|yml)',
			schema: z.object({
				title: z.string(),
				doing: z.array(z.string()),
				done: z.array(z.string()),
				next: z.array(z.string()),
			}),
		}),
	},
})
