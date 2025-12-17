<template>
	<section>
		<header>
			<p>Blog</p>
			<h1>思维碎片</h1>
			<p>文章来自 @nuxt/content。</p>
		</header>

		<ul v-if="posts.length">
			<li
				v-for="post in posts"
				:key="post._path">
				<NuxtLink :to="post._path">
					<span>{{ post.title }}</span>
				</NuxtLink>
				<div>
					<span v-if="post.date">{{ post.date }}</span>
					<span v-if="(post.tags || []).length">#{{ (post.tags || [])[0] }}</span>
				</div>
				<p v-if="post.description">{{ post.description }}</p>
			</li>
		</ul>

		<p v-else>暂未发布文章。</p>
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
</script>
