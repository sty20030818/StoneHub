import { queryCollection as queryCollectionServer } from '@nuxt/content/server'

type ProjectDoc = {
	path: string
	title: string
	description?: string
	year?: string
	icon?: string
	tags: string[]
	github?: string
	demo?: string
}

type ProjectRow = {
	path: string
	title?: string
	description?: string
	meta?: {
		year?: unknown
		tags?: unknown
		icon?: unknown
		github?: unknown
		demo?: unknown
	} | null
}

export default defineEventHandler(async (event) => {
	let rows: ProjectRow[] = []
	try {
		rows = (await queryCollectionServer(event, 'projects')
			.select('path', 'title', 'description', 'meta')
			.all()) as unknown as ProjectRow[]
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.warn('[api/projects] query failed (dev content db may be rebuilding)', error)
		}
		return []
	}

	return rows.map<ProjectDoc>((row) => {
		const year = typeof row.meta?.year === 'string' ? row.meta.year : undefined
		const tags = Array.isArray(row.meta?.tags) ? row.meta.tags.map((t) => String(t)) : []
		const icon = typeof row.meta?.icon === 'string' ? row.meta.icon : undefined
		const github = typeof row.meta?.github === 'string' ? row.meta.github : undefined
		const demo = typeof row.meta?.demo === 'string' ? row.meta.demo : undefined

		return {
			path: String(row.path || ''),
			title: row.title ?? '',
			description: row.description,
			year,
			icon,
			tags,
			github,
			demo,
		}
	})
})
