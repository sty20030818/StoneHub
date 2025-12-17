<template>
	<section>
		<header>
			<p>Projects</p>
			<h1>项目列表</h1>
			<p>通过 @nuxt/content 渲染 markdown 项目数据。</p>
		</header>

		<ul v-if="projects?.length">
			<li
				v-for="project in projects || []"
				:key="project.path">
				<h2>{{ project.title }}</h2>
				<p v-if="project.year">年份：{{ project.year }}</p>
				<p v-if="project.description">{{ project.description }}</p>

				<div v-if="(project.tags || []).length">
					<p>标签：</p>
					<ul>
						<li
							v-for="tag in project.tags || []"
							:key="tag">
							{{ tag }}
						</li>
					</ul>
				</div>

				<div>
					<a
						v-if="project.github"
						:href="project.github"
						target="_blank"
						rel="noreferrer">
						GitHub
					</a>
					<a
						v-if="project.demo"
						:href="project.demo"
						target="_blank"
						rel="noreferrer">
						Demo
					</a>
				</div>
			</li>
		</ul>

		<p v-else>暂未发布项目。</p>
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
