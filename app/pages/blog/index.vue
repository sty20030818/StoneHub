<template>
	<UPage>
		<UPageHeader
			headline="Blog"
			title="思维碎片"
			description="文章来自 @nuxt/content。" />

		<UPageBody>
			<UAlert
				v-if="posts.length === 0"
				title="暂未发布文章"
				description="我正在整理内容，敬请期待。"
				color="neutral"
				variant="subtle"
				icon="i-lucide-book" />

			<UPageList
				v-else
				divide>
				<UPageCard
					v-for="post in posts"
					:key="post._path"
					:to="post._path"
					:title="post.title || 'Untitled'"
					:description="post.description"
					variant="ghost">
					<template #footer>
						<div class="flex flex-wrap gap-2">
							<UBadge
								v-if="post.date"
								color="neutral"
								variant="subtle"
								:label="post.date" />
							<UBadge
								v-if="post.tags?.length"
								color="primary"
								variant="soft"
								:label="`#${post.tags[0]}`" />
						</div>
					</template>
				</UPageCard>
			</UPageList>
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
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

	definePageMeta({ title: '博客' })
	useHead({ title: '博客' })

	const { data: items } = await useAsyncData<BlogItem[]>('blog-list', async () => {
		const rows = (await queryCollection('blog').select('path', 'title', 'description', 'meta').all()) as BlogRow[]
		return rows.map((row) => {
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

	const posts = computed<BlogItem[]>(() => items.value ?? [])
</script>
