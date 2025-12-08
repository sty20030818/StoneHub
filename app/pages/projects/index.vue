<script setup lang="ts">
	type ProjectRow = {
		path: string
		title?: string
		description?: string
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
		tags: string[]
		github?: string
		demo?: string
	}

	const parseMeta = (meta: ProjectRow['meta']): { tags?: string[]; github?: string; demo?: string } => {
		if (!meta) return {}
		if (typeof meta === 'string') {
			try {
				return JSON.parse(meta) as { tags?: string[]; github?: string; demo?: string }
			} catch {
				return {}
			}
		}
		return meta as { tags?: string[]; github?: string; demo?: string }
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
				tags: meta.tags ?? [],
				github: meta.github,
				demo: meta.demo,
			})
			return acc
		}, [])
	})
</script>

<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-200">Projects</p>
			<h1 class="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">项目列表</h1>
			<p class="text-[var(--text-secondary)]">通过 @nuxt/content 渲染 markdown 项目数据。</p>
		</div>

		<div class="grid gap-4 md:grid-cols-2">
			<UCard
				v-for="project in projects || []"
				:key="project.path"
				v-motion="'fade-rise'"
				class="surface-card rounded-2xl"
				:ui="{
					body: 'p-5 space-y-3',
				}">
				<div class="flex flex-wrap gap-2 text-sm text-[var(--text-secondary)]">
					<UBadge
						v-for="tag in project.tags || []"
						:key="tag"
						size="xs"
						variant="soft"
						color="primary">
						{{ tag }}
					</UBadge>
				</div>
				<h3 class="text-xl font-semibold text-[var(--text-primary)]">{{ project.title }}</h3>
				<p class="text-[var(--text-secondary)]">{{ project.description }}</p>
				<div class="flex gap-2">
					<UButton
						v-if="project.github"
						:href="project.github"
						variant="ghost"
						icon="i-lucide-github"
						target="_blank"
						rel="noreferrer"
						class="rounded-xl">
						GitHub
					</UButton>
					<UButton
						v-if="project.demo"
						:href="project.demo"
						variant="soft"
						color="primary"
						icon="i-heroicons-globe-alt-20-solid"
						target="_blank"
						rel="noreferrer"
						class="rounded-xl">
						Demo
					</UButton>
				</div>
			</UCard>
		</div>

		<p
			v-if="!projects?.length"
			class="text-[var(--text-secondary)]">
			暂未发布项目。
		</p>
	</section>
</template>
