<script setup lang="ts">
	type BlogDoc = {
		_path: string
		title?: string
		date?: string
		tags?: string[]
	}

	const route = useRoute()

	const slugPath = computed(() => `/blog/${route.params.slug}`)

	const { data: doc } = await useAsyncData<BlogDoc | null>(`blog-${route.params.slug}`, () =>
		(queryCollection('blog') as any).path(slugPath.value).first(),
	)
</script>

<template>
	<article class="space-y-6">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">Blog</p>
			<h1 class="text-3xl font-bold md:text-4xl">{{ doc?.title }}</h1>
			<p class="text-slate-400">{{ doc?.date }} · {{ (doc?.tags || []).join(' · ') }}</p>
		</div>

		<UCard
			class="bg-white/5 ring-1 ring-white/10"
			:ui="{
				body: 'p-6',
			}">
			<div class="prose prose-invert max-w-none">
				<ContentRenderer
					v-if="doc"
					:value="doc" />
				<p
					v-else
					class="text-slate-400">
					文章不存在或尚未发布。
				</p>
			</div>
		</UCard>
	</article>
</template>
