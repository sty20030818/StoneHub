<script setup lang="ts">
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

	type BlogItem = {
		path: string
		title: string
		description?: string
		date?: string
		tags: string[]
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

	const { data: items } = await useAsyncData<BlogItem[]>('blog-list', async () => {
		const rows = await queryCollection('blog').select('path', 'title', 'description', 'meta').all()
		return (rows || []).reduce<BlogItem[]>((acc, raw) => {
			if (!raw || typeof raw !== 'object' || !('path' in raw)) return acc
			const meta = parseMeta((raw as BlogRow).meta)
			acc.push({
				path: (raw as BlogRow).path,
				title: (raw as BlogRow).title ?? '',
				description: (raw as BlogRow).description,
				date: meta.date,
				tags: meta.tags || [],
			})
			return acc
		}, [])
	})
</script>

<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-200">Blog</p>
			<h1 class="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">博客列表</h1>
			<p class="text-[var(--text-secondary)]">博客文章从 @nuxt/content 拉取并渲染。</p>
		</div>

		<div class="space-y-4">
			<UCard
				v-for="post in items || []"
				:key="post.path"
				v-motion="'fade-rise'"
				class="surface-card rounded-2xl"
				:ui="{
					body: 'p-5 space-y-2',
				}">
				<div class="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--text-secondary)]">
					<span>{{ post.date }}</span>
					<div class="flex flex-wrap gap-1">
						<UBadge
							v-for="tag in post.tags"
							:key="tag"
							size="xs"
							variant="soft"
							color="primary">
							{{ tag }}
						</UBadge>
					</div>
				</div>
				<NuxtLink
					:to="post.path"
					class="block text-xl font-semibold text-[var(--text-primary)] hover:text-primary-500">
					{{ post.title }}
				</NuxtLink>
				<p class="text-[var(--text-secondary)]">{{ post.description }}</p>
			</UCard>

			<p
				v-if="!(items && items.length)"
				class="text-[var(--text-secondary)]">
				暂未发布文章。
			</p>
		</div>
	</section>
</template>
