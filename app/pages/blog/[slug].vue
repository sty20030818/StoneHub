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
</script>

<template>
	<article class="space-y-6">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-200">Blog</p>
			<h1 class="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">{{ doc?.title }}</h1>
			<p class="text-[var(--text-secondary)]">{{ doc?.date }} · {{ (doc?.tags || []).join(' · ') }}</p>
		</div>

		<UCard
			v-motion="'fade-rise'"
			class="surface-card rounded-2xl"
			:ui="{
				body: 'p-6',
			}">
			<div class="prose max-w-none dark:prose-invert">
				<ContentRenderer
					v-if="doc"
					:value="doc" />
				<p
					v-else
					class="text-[var(--text-secondary)]">
					文章不存在或尚未发布。
				</p>
			</div>
		</UCard>
	</article>
</template>
