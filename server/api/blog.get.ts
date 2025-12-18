import { queryCollection as queryCollectionServer } from '@nuxt/content/server'

type BlogItem = {
	_path: string
	title?: string
	description?: string
	date?: string
	tags?: string[]
}

type BlogRow = {
	path: string
	title?: string
	description?: string
	meta?: {
		date?: unknown
		tags?: unknown
	}
}

export default defineEventHandler(async (event) => {
	let rows: BlogRow[] = []
	try {
		rows = (await queryCollectionServer(event, 'blog')
			.select('path', 'title', 'description', 'meta')
			.all()) as unknown as BlogRow[]
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.warn('[api/blog] query failed (dev content db may be rebuilding)', error)
		}
		return []
	}

	return rows.map<BlogItem>((row) => {
		const date = typeof row.meta?.date === 'string' ? row.meta.date : undefined
		const tags = Array.isArray(row.meta?.tags) ? row.meta.tags.map((t) => String(t)) : []
		const path = String(row.path || '')
		const withSlash = path.startsWith('/') ? path : `/${path}`

		return {
			_path: withSlash,
			title: row.title,
			description: row.description,
			date,
			tags,
		}
	})
})
