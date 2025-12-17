export default defineEventHandler(async (event) => {
	interface BlogPost {
		path: string
		title?: string
		description?: string
		slug?: string
		meta?: {
			date?: string
			tags?: unknown
		}
	}

	const rows = (await queryCollection(event, 'blog')
		.select('path', 'title', 'description', 'meta')
		.all()) as unknown as BlogPost[]

	return rows.map((row) => ({
		title: row.title,
		description: row.description,
		date: typeof row.meta?.date === 'string' ? row.meta.date : undefined,
		slug: row.slug || row.path.split('/').pop(),
		_path: row.path,
	}))
})
