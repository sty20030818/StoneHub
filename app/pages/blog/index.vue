<template>
	<section class="space-y-8">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">Blog</p>
			<h1 class="text-4xl font-bold text-(--text-primary) md:text-5xl">思维碎片</h1>
			<p class="text-(--text-secondary)">文章来自 @nuxt/content，使用日期侧栏卡片。</p>
		</div>

		<div class="space-y-6">
			<NuxtLink
				v-for="(post, idx) in posts"
				:key="post._path"
				:to="post._path"
				class="premium-card p-0 rounded-4xl overflow-hidden flex flex-col md:flex-row group animate-slide-up-fade cursor-pointer"
				:class="`stagger-${(idx % 3) + 1}`">
				<div
					class="bg-(--surface-variant) p-6 md:w-32 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-(--surface-outline)/60 group-hover:bg-(--color-secondary-container)/40 transition-colors">
					<span class="text-3xl font-black text-(--text-muted) group-hover:text-(--color-secondary) transition-colors">
						{{ (post.date || '').split('-')[2] }}
					</span>
					<span class="text-xs font-bold text-(--text-secondary) uppercase">{{ getMonth(post.date) }}</span>
				</div>

				<div class="p-6 md:p-8 flex-1 flex flex-col justify-center">
					<div class="flex items-center gap-3 mb-2">
						<span
							class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-(--color-primary-container) text-(--color-primary) border border-(--color-primary-container)/60">
							{{ (post.tags || [])[0] || 'Note' }}
						</span>
					</div>
					<h3
						class="text-xl font-bold text-(--text-primary) mb-3 group-hover:text-(--color-secondary) transition-colors">
						{{ post.title }}
					</h3>
					<p class="text-(--text-secondary) text-sm leading-relaxed line-clamp-2">{{ post.description }}</p>
				</div>

				<div
					class="hidden md:flex w-20 items-center justify-center text-(--text-muted) group-hover:text-(--color-secondary) group-hover:translate-x-1 transition-all">
					<Icon
						name="lucide:chevron-right"
						class="w-6 h-6" />
				</div>
			</NuxtLink>

			<p
				v-if="!posts.length"
				class="text-(--text-secondary)">
				暂未发布文章。
			</p>
		</div>
	</section>
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

	const getMonth = (dateStr?: string) => {
		if (!dateStr) return ''
		const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
		return months[new Date(dateStr).getMonth()] || ''
	}
</script>
