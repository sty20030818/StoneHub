<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-200">Projects</p>
			<h1 class="text-3xl font-bold text-(--text-primary) md:text-4xl">项目列表</h1>
			<p class="text-(--text-secondary)">通过 @nuxt/content 渲染 markdown 项目数据。</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<article
				v-for="project in projects || []"
				:key="project.path"
				class="premium-card p-8 rounded-4xl flex flex-col h-full group shadow-glow animate-slide-up-fade">
				<div class="flex justify-between items-start mb-6">
					<div
						class="relative w-16 h-16 rounded-2xl bg-linear-to-br from-(--color-primary-container) to-white flex items-center justify-center text-(--color-primary) shadow-inner overflow-hidden group-hover:scale-105 transition-transform duration-500">
						<Icon
							:name="project.icon ? `lucide:${project.icon}` : 'lucide:folder-kanban'"
							class="w-8 h-8 relative z-10" />
						<div
							class="absolute inset-0 bg-(--color-primary-container)/20 blur-xl group-hover:bg-(--color-primary)/20 transition-colors" />
					</div>
					<div class="flex items-center gap-2">
						<span
							class="px-3 py-1 bg-(--surface-variant) text-(--text-secondary) text-xs font-bold rounded-full uppercase tracking-wide">
							{{ project.year || '—' }}
						</span>
					</div>
				</div>

				<h3 class="text-2xl font-bold text-(--text-primary) mb-3 group-hover:text-(--color-primary) transition-colors">
					{{ project.title }}
				</h3>
				<p class="text-(--text-secondary) mb-8 flex-1 leading-relaxed">{{ project.description }}</p>

				<div class="flex items-center justify-between mt-auto pt-6 border-t border-(--surface-outline)/60">
					<div class="flex gap-2 flex-wrap">
						<span
							v-for="tag in project.tags || []"
							:key="tag"
							class="text-xs px-2.5 py-1 bg-white border border-(--surface-outline) text-(--text-secondary) rounded-md font-medium shadow-sm">
							{{ tag }}
						</span>
					</div>
					<div class="flex items-center gap-2">
						<UButton
							v-if="project.github"
							:href="project.github"
							variant="ghost"
							color="neutral"
							icon="i-lucide-github"
							target="_blank"
							rel="noreferrer"
							class="rounded-xl" />
						<UButton
							v-if="project.demo"
							:href="project.demo"
							variant="solid"
							color="info"
							icon="i-lucide-arrow-up-right"
							target="_blank"
							rel="noreferrer"
							class="rounded-xl">
							Demo
						</UButton>
					</div>
				</div>
			</article>
		</div>

		<p
			v-if="!projects?.length"
			class="text-(--text-secondary)">
			暂未发布项目。
		</p>
	</section>
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
</script>
