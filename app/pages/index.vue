<template>
	<div>
		<section id="home">
			<p>Available for Freelance</p>

			<h1>
				构建
				<span>未来级</span>
				Web 体验
			</h1>

			<p>
				我是 <strong>石头鱼 (StoneFish)</strong>，一名全栈工程师。痴迷于打造 OS 级交互与沉浸式动效。
			</p>

			<div>
				<button
					type="button"
					@click="openTerminal">
					<Icon name="lucide:terminal" />
					<span>Open Terminal</span>
				</button>

				<button
					type="button"
					@click="openAI">
					<Icon name="lucide:sparkles" />
					<span>Ask AI Stone</span>
				</button>
			</div>

			<section aria-label="Powering Core">
				<h2>Powering Core</h2>
				<ul>
					<li
						v-for="tech in stack"
						:key="tech">
						{{ tech }}
					</li>
				</ul>
			</section>
		</section>

		<OverlayTerminalOverlay
			:visible="showTerminal"
			:projects="overlayProjects"
			:posts="overlayPosts"
			@open-ai="openAI"
			@navigate="handleNavigate"
			@close="closeTerminal" />
		<OverlayAIChatPanel
			:visible="showAI"
			@close="closeAI" />
	</div>
</template>

<script setup lang="ts">
	import OverlayAIChatPanel from '~/components/overlay/AIChatPanel.vue'
	import OverlayTerminalOverlay from '~/components/overlay/TerminalOverlay.vue'

	type Project = { title?: string; description?: string; year?: string; tags?: string[]; icon?: string }
	type Post = { title?: string; date?: string; slug?: string; description?: string; _path?: string }

	definePageMeta({ title: '首页' })
	useHead({ title: '首页' })

	const showTerminal = ref(false)
	const showAI = ref(false)

	const stack = ['Nuxt 4', 'Vue 3', 'Tailwind', 'TypeScript', 'Node.js', 'Vercel Edge']

	const { data: projects } = await useAsyncData<Project[]>('home-projects', async () => {
		const rows = await queryCollection('projects').select('title', 'description', 'meta', 'path').all()
		return rows.map((row) => ({
			title: row.title,
			description: row.description,
			year: typeof row.meta?.year === 'string' ? row.meta.year : undefined,
			tags: Array.isArray(row.meta?.tags) ? row.meta.tags.map((t) => String(t)) : [],
			icon: typeof row.meta?.icon === 'string' ? row.meta.icon : undefined,
		}))
	})

	const { data: posts } = await useAsyncData<Post[]>('home-posts', async () => {
		type BlogRow = {
			path: string
			title?: string
			description?: string
			slug?: string
			meta?: { date?: unknown; tags?: unknown }
		}
		const rows = (await queryCollection('blog').select('path', 'title', 'description', 'meta').all()) as BlogRow[]
		return rows.map((row) => ({
			title: row.title,
			description: row.description,
			date: typeof row.meta?.date === 'string' ? row.meta.date : undefined,
			slug: row.slug,
			_path: row.path,
		}))
	})

	const overlayProjects = computed(() =>
		(projects.value || []).map((p) => ({ title: p.title || '', desc: p.description || '' })),
	)
	const overlayPosts = computed(() =>
		(posts.value || []).map((p) => ({ title: p.title || '', date: p.date || '', slug: p.slug || p._path || '' })),
	)

	const openTerminal = () => {
		showTerminal.value = true
	}
	const closeTerminal = () => {
		showTerminal.value = false
	}
	const openAI = () => {
		showAI.value = true
	}
	const closeAI = () => {
		showAI.value = false
	}
	const handleNavigate = (path: string) => {
		navigateTo(path)
	}
</script>
