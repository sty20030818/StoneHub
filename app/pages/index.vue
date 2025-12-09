<template>
	<div class="relative space-y-16">
		<section
			id="home"
			class="max-w-5xl mx-auto mt-12 md:mt-16 text-center">
			<div class="animate-slide-up-fade">
				<div
					class="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-white/70 backdrop-blur border border-white/60 shadow-sm text-sm font-semibold text-(--text-secondary)">
					<span class="relative flex h-2.5 w-2.5 mr-3">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
						<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
					</span>
					Available for Freelance
				</div>

				<h1 class="text-5xl md:text-7xl font-black tracking-tight text-(--text-primary) mb-6 leading-[1.05]">
					构建
					<span class="text-gradient inline-block">未来级</span>
					<br />
					Web 体验
				</h1>
				<p class="text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto mb-12 leading-relaxed">
					我是
					<strong class="text-(--text-primary)">石头鱼 (StoneFish)</strong>
					，一名全栈工程师。
					<br />
					痴迷于打造
					<span class="bg-(--color-primary-container) text-(--color-on-primary-container) px-1 rounded mx-1">
						OS 级交互
					</span>
					与
					<span class="bg-(--color-secondary-container) text-(--color-on-secondary-container) px-1 rounded mx-1">
						沉浸式动效
					</span>
					。
				</p>

				<div class="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl mx-auto">
					<button
						class="w-full sm:w-auto h-14 px-8 bg-slate-900 text-white rounded-2xl font-medium hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
						@click="openTerminal">
						<span class="p-1 bg-slate-700 rounded-lg">>_</span>
						<span class="font-mono">Open Terminal</span>
					</button>

					<button
						class="w-full sm:w-auto h-14 px-8 bg-white text-(--text-secondary) border border-(--surface-outline) rounded-2xl font-medium hover:bg-(--color-secondary-container) hover:text-(--color-on-secondary-container) hover:border-(--surface-outline-strong) hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
						@click="openAI">
						<span class="p-1 bg-(--color-secondary-container) text-(--color-secondary) rounded-lg">
							<Icon
								name="lucide:sparkles"
								class="w-4 h-4" />
						</span>
						Ask AI Stone
					</button>
				</div>

				<div class="animate-slide-up-fade mt-20 w-full max-w-3xl mx-auto">
					<div
						class="flex items-center justify-between text-xs font-bold text-(--text-muted) uppercase tracking-[0.3em] mb-6 px-4">
						<span>Powering Core</span>
						<span class="w-1/3 h-px bg-(--surface-outline)" />
					</div>
					<div class="flex flex-wrap justify-center gap-4">
						<div
							v-for="(tech, i) in stack"
							:key="tech"
							class="group relative px-6 py-3 bg-white/60 backdrop-blur-sm border border-white/70 rounded-xl text-(--text-secondary) font-bold text-sm shadow-sm hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
							:style="{ transitionDelay: `${i * 50}ms` }">
							{{ tech }}
							<div
								class="absolute inset-x-0 -bottom-px h-[2px] bg-linear-to-r from-(--color-primary) to-(--color-secondary) opacity-0 group-hover:opacity-100 transition-opacity" />
						</div>
					</div>
				</div>
			</div>
		</section>

		<OverlayTerminalOverlay
			:visible="showTerminal"
			:projects="overlayProjects"
			:posts="overlayPosts"
			@open-ai="openAI"
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
</script>
