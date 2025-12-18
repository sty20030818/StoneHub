import { queryCollection as queryCollectionServer } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
	interface BlogPost {
		path: string
		title?: string
		description?: string
		meta?: {
			date?: string
			tags?: unknown
		}
	}

	const rows = (await queryCollectionServer(event, 'blog')
		.select('path', 'title', 'description', 'meta')
		.all()) as unknown as BlogPost[]

	return rows.map((row) => ({
		title: row.title,
		description: row.description,
		date: typeof row.meta?.date === 'string' ? row.meta.date : undefined,
		slug: row.path.split('/').pop(),
		_path: row.path,
	}))
})
