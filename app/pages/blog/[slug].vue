<template>
	<article>
		<header>
			<p>Blog</p>
			<h1>{{ doc?.title }}</h1>
			<p v-if="doc">{{ doc?.date }} · {{ (doc?.tags || []).join(' · ') }}</p>
		</header>

		<section>
			<ContentRenderer
				v-if="doc"
				:value="doc" />
			<p v-else>文章不存在或尚未发布。</p>
		</section>
	</article>
</template>

<script setup lang="ts">
	type BlogDoc = {
		_path: string
		title?: string
		date?: string
		tags?: string[]
	}

	const route = useRoute()

	const slugPath = computed(() => `/blog/${route.params.slug}`)

	const { data: doc } = await useAsyncData<BlogDoc | null>(`blog-${route.params.slug}`, async () => {
		const item = await queryCollection('blog').path(slugPath.value).first()
		return item as BlogDoc | null
	})

	useHead(() => ({
		title: doc.value?.title ?? '博客',
	}))
</script>
