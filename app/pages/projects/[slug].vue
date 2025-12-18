<template>
	<UPage>
		<ContentDoc v-slot="{ doc }">
			<UPageHeader
				v-if="doc"
				:headline="t('projects.headline')"
				:title="doc.title || t('projects.detail.fallbackTitle')"
				:description="doc.description"
				:links="[
					{
						label: t('projects.detail.backToList'),
						to: '/projects',
						color: 'neutral',
						variant: 'outline',
						icon: 'i-lucide-arrow-left',
					},
				]" />

			<UPageHeader
				v-else
				:headline="t('projects.headline')"
				:title="t('projects.detail.notFoundTitle')"
				:description="t('projects.detail.notFoundDescription')"
				:links="[
					{
						label: t('projects.detail.backToList'),
						to: '/projects',
						color: 'neutral',
						variant: 'outline',
						icon: 'i-lucide-arrow-left',
					},
				]" />

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
		</ContentDoc>
	</UPage>
</template>

<script setup lang="ts">
	// 项目详情页
	const { t } = useI18n()
</script>
