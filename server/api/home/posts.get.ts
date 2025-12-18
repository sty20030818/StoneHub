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

	let rows: BlogPost[] = []
	try {
		rows = (await queryCollectionServer(event, 'blog')
			.select('path', 'title', 'description', 'meta')
			.all()) as unknown as BlogPost[]
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.warn('[home/posts] query failed (dev content db may be rebuilding)', error)
		}
		return []
	}

	return rows.map((row) => ({
		title: row.title,
		description: row.description,
		date: typeof row.meta?.date === 'string' ? row.meta.date : undefined,
		slug: row.path.split('/').pop(),
		_path: row.path,
	}))
})
