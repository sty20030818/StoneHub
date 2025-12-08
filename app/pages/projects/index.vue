<script setup lang="ts">
	type ProjectDoc = {
		_path: string
		title: string
		description?: string
		tags?: string[]
		github?: string
		demo?: string
	}

	const { data: projects } = await useAsyncData<ProjectDoc[]>('projects-list', () =>
		(queryCollection('projects') as any).all(),
	)
</script>

<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">Projects</p>
			<h1 class="text-3xl font-bold md:text-4xl">项目列表</h1>
			<p class="text-slate-300">通过 @nuxt/content 渲染 markdown 项目数据。</p>
		</div>

		<div class="grid gap-4 md:grid-cols-2">
			<UCard
				v-for="project in projects || []"
				:key="project._path"
				class="bg-white/5 ring-1 ring-white/10 hover:ring-primary-400 shadow-(--shadow-glass)"
				:ui="{
					body: 'p-5 space-y-3',
				}">
				<div class="flex flex-wrap gap-2 text-sm text-slate-400">
					<UBadge
						v-for="tag in project.tags || []"
						:key="tag"
						size="xs"
						variant="soft"
						color="primary">
						{{ tag }}
					</UBadge>
				</div>
				<h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
				<p class="text-slate-300">{{ project.description }}</p>
				<div class="flex gap-2">
					<UButton
						v-if="project.github"
						:href="project.github"
						variant="ghost"
						icon="i-lucide-github"
						target="_blank"
						rel="noreferrer">
						GitHub
					</UButton>
					<UButton
						v-if="project.demo"
						:href="project.demo"
						variant="soft"
						color="primary"
						icon="i-heroicons-globe-alt-20-solid"
						target="_blank"
						rel="noreferrer">
						Demo
					</UButton>
				</div>
			</UCard>
		</div>

		<p
			v-if="!projects?.length"
			class="text-slate-400">
			暂未发布项目。
		</p>
	</section>
</template>
