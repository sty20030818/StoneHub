<script setup lang="ts">
	type BlogDoc = {
		path: string
		title: string
		description?: string
		meta?: {
			date?: string
			tags?: string[]
		}
	}

	type BlogItem = {
		path: string
		title: string
		description?: string
		date?: string
		tags: string[]
	}

	const { data: posts } = await useAsyncData<BlogDoc[]>('blog-list', () =>
		queryCollection('blog').select('path', 'title', 'description', 'meta').all(),
	)

	const items = computed<BlogItem[]>(() =>
		(posts.value || []).map((item) => ({
			path: item.path,
			title: item.title,
			description: item.description,
			date: item.meta?.date,
			tags: item.meta?.tags || [],
		})),
	)
</script>

<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">Blog</p>
			<h1 class="text-3xl font-bold md:text-4xl">博客列表</h1>
			<p class="text-slate-300">博客文章从 @nuxt/content 拉取并渲染。</p>
		</div>

		<div class="space-y-4">
			<UCard
				v-for="post in items"
				:key="post.path"
				class="bg-white/5 ring-1 ring-white/10 hover:ring-primary-400"
				:ui="{
					body: 'p-5 space-y-2',
				}">
				<div class="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
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
					class="block text-xl font-semibold text-white hover:text-primary-200">
					{{ post.title }}
				</NuxtLink>
				<p class="text-slate-300">{{ post.description }}</p>
			</UCard>

			<p
				v-if="!items.length"
				class="text-slate-400">
				暂未发布文章。
			</p>
		</div>
	</section>
</template>
