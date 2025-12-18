<template>
	<UPage>
		<UPageHeader
			headline="Blog"
			:title="doc?.title || '文章'"
			:description="metaLine"
			:links="links" />

		<UPageBody>
			<UAlert
				v-if="!doc"
				title="文章不存在或尚未发布"
				description="你可以返回博客列表查看其他文章。"
				color="neutral"
				variant="subtle"
				icon="i-lucide-circle-alert"
				:actions="[{ label: '返回博客列表', to: '/blog', color: 'neutral', variant: 'outline' }]" />

			<UCard v-else>
				<ContentRenderer :value="doc" />
			</UCard>
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
	type BlogDoc = {
		_path: string
		title?: string
		date?: string
		tags?: string[]
	}

	const route = useRoute()

	const slug = computed(() => {
		const raw = route.params.slug
		return Array.isArray(raw) ? String(raw[0] || '') : String(raw || '')
	})
	const slugPath = computed(() => `/blog/${slug.value}`)

	const { data: doc } = await useAsyncData<BlogDoc | null>(`blog-${slug.value}`, async () => {
		const item = await queryCollection('blog').path(slugPath.value).first()
		return item as BlogDoc | null
	})

	const metaLine = computed(() => {
		if (!doc.value) return ''
		const date = doc.value.date ? String(doc.value.date) : ''
		const tags = (doc.value.tags || []).filter(Boolean)
		if (!date && tags.length === 0) return ''
		return [date, tags.join(' · ')].filter(Boolean).join(' · ')
	})

	const links = computed(() => {
		return [
			{
				label: '返回列表',
				to: '/blog',
				color: 'neutral' as const,
				variant: 'outline' as const,
				icon: 'i-lucide-arrow-left' as const,
			},
		]
	})

	useHead(() => ({
		title: doc.value?.title ?? '博客',
	}))
</script>
