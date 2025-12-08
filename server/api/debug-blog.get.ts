export default defineEventHandler(async () => {
	const rows = await (queryCollection as any)('blog').select('path', 'title', 'description', 'meta').all()

	const items = rows.map((item: any) => {
		const meta = typeof item.meta === 'string' ? JSON.parse(item.meta) : item.meta
		return {
			path: item.path,
			title: item.title,
			description: item.description,
			date: meta?.date,
			tags: meta?.tags ?? [],
			meta,
		}
	})

	return { count: items.length, items }
})
