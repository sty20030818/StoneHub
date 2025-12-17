export default defineEventHandler(async (event) => {
	// 注意：Nuxt Content v3 服务端用法通常需要 event 参数

	interface ProjectRow {
		title: string
		description: string
		path: string
		meta?: {
			year?: string
			tags?: unknown
			icon?: string
			cover?: string
		}
	}

	const rows = (await queryCollection(event, 'projects')
		.select('title', 'description', 'meta', 'path')
		.all()) as unknown as ProjectRow[]

	return rows.map((row) => ({
		title: row.title || 'Untitled Project',
		description: row.description || '',
		year: typeof row.meta?.year === 'string' ? row.meta.year : undefined,
		tags: Array.isArray(row.meta?.tags) ? row.meta.tags.map((t: any) => String(t)) : [],
		icon: typeof row.meta?.icon === 'string' ? row.meta.icon : undefined,
		image: typeof row.meta?.cover === 'string' ? row.meta.cover : undefined,
		link: row.path,
	}))
})
