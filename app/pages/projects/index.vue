<template>
	<UPage>
		<UPageHeader
			headline="Projects"
			title="项目列表"
			description="通过 @nuxt/content 渲染 markdown 项目数据。" />

		<UPageBody>
			<UAlert
				v-if="projectsError"
				title="项目列表加载失败"
				:description="projectsError.message || '请检查网络后重试。'"
				color="neutral"
				variant="subtle"
				icon="i-lucide-triangle-alert">
				<template #actions>
					<UButton
						color="neutral"
						variant="outline"
						icon="i-lucide-refresh-cw"
						@click="retryProjects">
						重试
					</UButton>
				</template>
			</UAlert>

			<UPageGrid
				v-else-if="projectsPending"
				class="sm:grid-cols-2 lg:grid-cols-3">
				<USkeleton
					v-for="i in 9"
					:key="i"
					class="h-44 rounded-lg" />
			</UPageGrid>

			<UEmpty
				v-else-if="projectsUi.length === 0"
				icon="i-lucide-folder-open"
				title="暂未发布项目"
				description="等我整理好再放上来。"
				:actions="[{ label: '返回首页', to: '/', color: 'neutral', variant: 'outline', icon: 'i-lucide-house' }]" />

			<UPageGrid
				v-else
				class="sm:grid-cols-2 lg:grid-cols-3">
				<UPageCard
					v-for="project in projectsUi"
					:key="project.path"
					:to="project.to"
					:icon="project.icon"
					:title="project.title"
					:description="project.description"
					variant="subtle"
					spotlight
					spotlight-color="primary">
					<template #footer>
						<div class="flex flex-wrap gap-2">
							<UBadge
								v-if="project.year"
								color="neutral"
								variant="subtle"
								:label="project.year" />

							<UBadge
								v-for="tag in project.tags"
								:key="tag"
								color="neutral"
								variant="outline"
								:label="tag" />
						</div>

						<div class="mt-3 flex flex-wrap gap-2">
							<UButton
								v-if="project.github"
								:to="project.github"
								target="_blank"
								rel="noopener noreferrer"
								color="neutral"
								variant="ghost"
								icon="i-lucide-github"
								label="GitHub" />
							<UButton
								v-if="project.demo"
								:to="project.demo"
								target="_blank"
								rel="noopener noreferrer"
								color="neutral"
								variant="ghost"
								icon="i-lucide-external-link"
								label="Demo" />
						</div>
					</template>
				</UPageCard>
			</UPageGrid>
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
	type ProjectDoc = {
		path: string
		title: string
		description?: string
		year?: string
		icon?: string
		tags: string[]
		github?: string
		demo?: string
	}

	useHead({ title: '项目' })

	const withLeadingSlash = (path: string) => (path.startsWith('/') ? path : `/${path}`)

	const toNuxtUiIcon = (raw?: string): string | undefined => {
		if (!raw) return undefined
		if (raw.startsWith('i-')) return raw
		if (raw.includes(':')) {
			const [collection, name] = raw.split(':')
			if (collection && name) return `i-${collection}-${name}`
		}
		return `i-lucide-${raw}`
	}

	const {
		data: projects,
		pending: projectsPending,
		error: projectsError,
		refresh: refreshProjects,
	} = await useAsyncData<ProjectDoc[]>('projects-list', async () => {
		const rows = await $fetch<ProjectDoc[]>('/api/projects')
		return (rows || []).map((item) => ({
			...item,
			tags: Array.isArray(item.tags) ? item.tags : [],
		}))
	})

	const projectsUi = computed(() => {
		return (projects.value ?? []).map((project) => {
			return {
				...project,
				to: withLeadingSlash(project.path),
				icon: toNuxtUiIcon(project.icon),
			}
		})
	})

	const retryProjects = () => refreshProjects()
</script>
