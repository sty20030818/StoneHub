<template>
	<UPage>
		<UPageHeader
			headline="Projects"
			title="项目列表"
			description="通过 @nuxt/content 渲染 markdown 项目数据。" />

		<UPageBody>
			<UAlert
				v-if="projectsUi.length === 0"
				title="暂未发布项目"
				description="等我整理好再放上来。"
				color="neutral"
				variant="subtle"
				icon="i-lucide-folder" />

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
								color="neutral"
								variant="ghost"
								icon="i-lucide-github"
								label="GitHub" />
							<UButton
								v-if="project.demo"
								:to="project.demo"
								target="_blank"
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
	type ProjectRow = {
		path: string
		title?: string
		description?: string
		year?: string
		icon?: string
		meta?:
			| {
					tags?: string[]
					github?: string
					demo?: string
			  }
			| string
	}

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

	definePageMeta({ title: '项目' })
	useHead({ title: '项目' })

	type ParsedMeta = { tags?: string[]; github?: string; demo?: string; year?: string; icon?: string }

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

	const parseMeta = (meta: ProjectRow['meta']): ParsedMeta => {
		if (!meta) return {}
		if (typeof meta === 'string') {
			try {
				const parsed = JSON.parse(meta) as ParsedMeta
				return parsed
			} catch {
				return {}
			}
		}
		return meta as ParsedMeta
	}

	const { data: projects } = await useAsyncData<ProjectDoc[]>('projects-list', async () => {
		const rows = await queryCollection('projects').select('path', 'title', 'description', 'meta').all()
		return (rows || []).reduce<ProjectDoc[]>((acc, item) => {
			if (!item || typeof item !== 'object' || !('path' in item)) return acc
			const meta = parseMeta((item as ProjectRow).meta)
			acc.push({
				path: String((item as ProjectRow).path),
				title: (item as ProjectRow).title ?? '',
				description: (item as ProjectRow).description,
				year: typeof meta.year === 'string' ? meta.year : undefined,
				icon: typeof meta.icon === 'string' ? meta.icon : undefined,
				tags: meta.tags ?? [],
				github: meta.github,
				demo: meta.demo,
			})
			return acc
		}, [])
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
</script>
