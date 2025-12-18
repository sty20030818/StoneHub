<template>
	<UPage>
		<ContentDoc v-slot="{ doc }">
			<UPageHeader
				v-if="doc"
				headline="Projects"
				:title="doc.title || '项目'"
				:description="doc.description"
				:links="[
					{
						label: '返回项目列表',
						to: '/projects',
						color: 'neutral',
						variant: 'outline',
						icon: 'i-lucide-arrow-left',
					},
				]" />

			<UPageHeader
				v-else
				headline="Projects"
				title="项目不存在或尚未发布"
				description="你可以返回项目列表查看其他项目。"
				:links="[
					{
						label: '返回项目列表',
						to: '/projects',
						color: 'neutral',
						variant: 'outline',
						icon: 'i-lucide-arrow-left',
					},
				]" />

			<UPageBody>
				<UAlert
					v-if="!doc"
					title="内容不存在"
					description="可能是链接错误，或者内容尚未发布。"
					color="neutral"
					variant="subtle"
					icon="i-lucide-circle-alert"
					:actions="[{ label: '返回项目列表', to: '/projects', color: 'neutral', variant: 'outline' }]" />

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
</script>
