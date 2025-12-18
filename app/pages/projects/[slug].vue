<template>
	<UPage>
		<UPageHeader
			v-if="doc"
			:headline="t('projects.headline')"
			:title="doc.title || t('projects.detail.fallbackTitle')"
			:description="doc.description"
			:links="links" />

		<UPageHeader
			v-else
			:headline="t('projects.headline')"
			:title="t('projects.detail.notFoundTitle')"
			:description="t('projects.detail.notFoundDescription')"
			:links="links" />

		<UPageBody>
			<UAlert
				v-if="!doc"
				:title="t('projects.detail.contentMissingTitle')"
				:description="t('projects.detail.contentMissingDescription')"
				color="neutral"
				variant="subtle"
				icon="i-lucide-circle-alert"
				:actions="[
					{ label: t('projects.detail.backToList'), to: '/projects', color: 'neutral', variant: 'outline' },
				]" />

			<template v-else>
				<UCard
					v-if="doc.image"
					class="overflow-hidden rounded-4xl"
					:ui="{ body: 'p-0' }">
					<NuxtImg
						:src="doc.image"
						:alt="doc.title || ''"
						class="w-full aspect-video object-cover"
						loading="lazy" />
				</UCard>

				<div
					v-if="doc.tags?.length"
					class="mt-4 flex flex-wrap gap-2">
					<UBadge
						v-for="tag in doc.tags"
						:key="tag"
						color="neutral"
						variant="subtle"
						:label="String(tag)" />
				</div>

				<UCard class="mt-6 rounded-4xl">
					<article class="prose prose-lg dark:prose-invert prose-primary max-w-none">
						<ContentRenderer :value="doc" />
					</article>
				</UCard>
			</template>
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
	type ProjectDoc = {
		_path: string
		title?: string
		description?: string
		image?: string
		tags?: string[]
		year?: string
		icon?: string
	}

	const { t } = useI18n()

	const route = useRoute()

	const slug = computed(() => {
		const raw = route.params.slug
		return Array.isArray(raw) ? String(raw[0] || '') : String(raw || '')
	})
	const slugPath = computed(() => `/projects/${slug.value}`)

	const { data: doc } = await useAsyncData<ProjectDoc | null>(`project-${slug.value}`, async () => {
		const item = await queryCollection('projects').path(slugPath.value).first()
		return item as ProjectDoc | null
	})

	const links = computed(() => [
		{
			label: t('projects.detail.backToList'),
			to: '/projects',
			color: 'neutral' as const,
			variant: 'outline' as const,
			icon: 'i-lucide-arrow-left' as const,
		},
	])

	useHead(() => ({
		title: doc.value?.title ?? t('nav.projects'),
	}))
</script>
