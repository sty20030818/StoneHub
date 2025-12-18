<template>
	<UPage>
		<UPageHeader
			:headline="t('projects.headline')"
			:title="t('projects.list.title')"
			:description="t('projects.list.description')" />

		<UPageBody>
			<UAlert
				v-if="projectsError"
				:title="t('projects.list.errorTitle')"
				:description="projectsError.message || t('common.checkNetworkRetry')"
				color="neutral"
				variant="subtle"
				icon="i-lucide-triangle-alert">
				<template #actions>
					<UButton
						color="neutral"
						variant="outline"
						icon="i-lucide-refresh-cw"
						@click="retryProjects">
						{{ t('common.retry') }}
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
				:title="t('projects.list.emptyTitle')"
				:description="t('projects.list.emptyDescription')"
				:actions="[
					{ label: t('common.backHome'), to: '/', color: 'neutral', variant: 'outline', icon: 'i-lucide-house' },
				]" />

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

	const { t } = useI18n()
	useHead(() => ({ title: t('nav.projects') }))

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
