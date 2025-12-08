import { queryCollection } from '@nuxt/content/server'

type BlogRow = {
	path: string
	title?: string
	description?: string
	meta?:
		| {
				date?: string
				tags?: string[]
		  }
		| string
}

const parseMeta = (meta: BlogRow['meta']): { date?: string; tags?: string[] } => {
	if (!meta) return {}
	if (typeof meta === 'string') {
		try {
			return JSON.parse(meta) as { date?: string; tags?: string[] }
		} catch {
			return {}
		}
	}
	return meta as { date?: string; tags?: string[] }
}

export default defineEventHandler(async (event) => {
	const rows = ((await queryCollection(event, 'blog').select('path', 'title', 'description', 'meta').all()) ||
		[]) as BlogRow[]

	const items = rows.map((item) => {
		const meta = parseMeta(item.meta)
		return {
			path: item.path,
			title: item.title ?? '',
			description: item.description,
			date: meta.date,
			tags: meta.tags ?? [],
			meta,
		}
	})

	return { count: items.length, items }
})
