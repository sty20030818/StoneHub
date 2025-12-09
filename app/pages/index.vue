<script setup lang="ts">
	import OverlayAIChatPanel from '~/components/overlay/AIChatPanel.vue'
	import OverlayTerminalOverlay from '~/components/overlay/TerminalOverlay.vue'

	definePageMeta({ title: '首页' })
	useHead({ title: '首页' })

	type Project = {
		title: string
		desc: string
		tags: string[]
		icon: string
		year: string
	}

	type Post = {
		title: string
		excerpt: string
		date: string
		tag: string
		slug: string
	}

	const showTerminal = ref(false)
	const showAI = ref(false)

	const stack = ['Nuxt 4', 'Vue 3', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Vercel']
	const projects = ref<Project[]>([
		{
			title: 'StoneOS',
			desc: '一个运行在浏览器里的 Web 操作系统，把网页变成桌面。',
			tags: ['Vue 3', 'OS'],
			icon: 'lucide:layout',
			year: '2024',
		},
		{
			title: 'StoneHub',
			desc: '基于 Nuxt 4 的个人数字花园，就是你现在看到的这个！',
			tags: ['Nuxt 4', 'Design'],
			icon: 'lucide:globe',
			year: '2025',
		},
		{
			title: 'AnyFlow',
			desc: '可视化的工作流编排引擎，支持节点拖拽。',
			tags: ['Canvas', 'Logic'],
			icon: 'lucide:workflow',
			year: '2023',
		},
		{
			title: 'PixelEditor',
			desc: '轻量级像素画在线编辑器。',
			tags: ['React', 'Graphics'],
			icon: 'lucide:image',
			year: '2023',
		},
	])

	const posts = ref<Post[]>([
		{
			title: 'Nuxt 4 尝鲜指南：目录结构变了啥？',
			excerpt: 'Nuxt 4 终于来了，新的 App 目录结构让大型应用更整洁，这里是一份详细的迁移报告...',
			date: '2025-05-10',
			tag: 'Nuxt',
			slug: 'nuxt-4-guide',
		},
		{
			title: '为什么我选择 Tailwind 而不是 CSS-in-JS',
			excerpt: '在经历了 Emotion 的运行时性能瓶颈后，我投向了 utility-first 的怀抱。',
			date: '2025-04-22',
			tag: 'CSS',
			slug: 'tailwind-vs-cssinjs',
		},
		{
			title: '用 Three.js 手写一个粒子地球',
			excerpt: '数学与图形学的浪漫结合，优化 Draw Calls 的几个关键技巧。',
			date: '2025-03-15',
			tag: '3D',
			slug: 'threejs-earth',
		},
	])

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

<template>
	<div class="relative space-y-16">
		<!-- Hero -->
		<section
			id="home"
			class="max-w-4xl mx-auto mt-10 text-center md:mt-16">
			<div v-motion="'slide-up'">
				<div
					class="inline-block px-4 py-1 mb-6 text-sm font-medium text-sky-700 bg-sky-100/80 rounded-full border border-sky-200">
					👋 嗨，我是石头鱼 (StoneFish)
				</div>
				<h1 class="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
					打造操作系统级的
					<br />
					<span class="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-pink-400">Web 体验</span>
				</h1>
				<p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
					前端架构师 / Web OS 爱好者 / 偏爱新技术的全栈开发者。
					<br />
					这里是 StoneHub，基于 Nuxt 4 构建的个人数字花园。
				</p>

				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<button
						class="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-mono text-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
						@click="openTerminal">
						<span class="relative z-10 flex items-center gap-2">>_ 打开命令行模式</span>
						<div
							class="absolute inset-0 bg-linear-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</button>

					<button
						class="group px-8 py-4 bg-white text-slate-800 border border-slate-200 rounded-2xl font-medium hover:shadow-lg hover:border-pink-200 hover:-translate-y-1 transition-all duration-300"
						@click="openAI">
						<span class="flex items-center gap-2 group-hover:text-pink-500 transition-colors">
							<Icon
								name="lucide:bot"
								class="w-5 h-5" />
							和 AI 石头鱼聊聊
						</span>
					</button>
				</div>

				<!-- 技术栈 -->
				<div class="mt-20 pt-10 border-t border-slate-200/60">
					<p class="text-sm text-slate-400 mb-6 uppercase tracking-wider font-semibold">当前驱动核心</p>
					<div class="flex flex-wrap justify-center gap-3">
						<span
							v-for="tech in stack"
							:key="tech"
							class="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl text-slate-600 text-sm font-medium shadow-sm border border-white">
							{{ tech }}
						</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Projects -->
		<section
			id="projects"
			class="max-w-5xl mx-auto animate-fade-in">
			<h2 class="text-3xl font-bold mb-8 flex items-center gap-3">
				<span class="w-2 h-8 bg-sky-400 rounded-full" />
				近期项目
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div
					v-for="project in projects"
					:key="project.title"
					class="glass-panel p-6 rounded-3xl hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-sky-200">
					<div class="flex justify-between items-start mb-4">
						<div
							class="p-3 bg-sky-50 rounded-2xl text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
							<Icon
								:name="project.icon"
								class="w-6 h-6" />
						</div>
						<span class="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">{{ project.year }}</span>
					</div>
					<h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
					<p class="text-slate-600 mb-4 h-12">{{ project.desc }}</p>
					<div class="flex gap-2 flex-wrap">
						<span
							v-for="tag in project.tags"
							:key="tag"
							class="text-xs px-2 py-1 bg-slate-50 text-slate-500 rounded-md border border-slate-100">
							{{ tag }}
						</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Blog -->
		<section
			id="blog"
			class="max-w-3xl mx-auto animate-fade-in">
			<h2 class="text-3xl font-bold mb-8 flex items-center gap-3">
				<span class="w-2 h-8 bg-pink-300 rounded-full" />
				技术随笔
			</h2>
			<div class="space-y-4">
				<article
					v-for="post in posts"
					:key="post.slug"
					class="group relative bg-white/80 hover:bg-white p-6 rounded-3xl transition-all duration-300 hover:shadow-lg border border-transparent hover:border-pink-100 cursor-pointer">
					<div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
						<h3 class="text-lg font-bold text-slate-800 group-hover:text-pink-500 transition-colors">
							{{ post.title }}
						</h3>
						<time class="text-sm text-slate-400 font-mono">{{ post.date }}</time>
					</div>
					<p class="text-slate-600 text-sm mb-3">{{ post.excerpt }}</p>
					<div class="flex items-center gap-2">
						<span class="text-xs font-medium text-sky-500 bg-sky-50 px-2 py-1 rounded">{{ post.tag }}</span>
					</div>
				</article>
			</div>
		</section>

		<!-- Links -->
		<section
			id="links"
			class="max-w-4xl mx-auto mt-4 text-center animate-fade-in">
			<h2 class="text-3xl font-bold mb-10">连接世界</h2>
			<div class="flex justify-center gap-6 flex-wrap">
				<a
					v-for="link in [
						{ label: 'GitHub', icon: 'lucide:github', href: 'https://github.com/stonefish' },
						{ label: 'Twitter', icon: 'lucide:twitter', href: 'https://twitter.com' },
						{ label: 'StoneOS', icon: 'lucide:monitor', href: '#' },
					]"
					:key="link.label"
					:href="link.href"
					class="p-6 bg-white rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col items-center gap-3 min-w-[120px] border border-slate-100"
					target="_blank"
					rel="noreferrer">
					<Icon
						:name="link.icon"
						class="w-8 h-8 text-slate-800" />
					<span class="font-bold text-sm">{{ link.label }}</span>
				</a>
			</div>
		</section>

		<OverlayTerminalOverlay
			:visible="showTerminal"
			:projects="projects"
			:posts="posts"
			@open-ai="openAI"
			@close="closeTerminal" />
		<OverlayAIChatPanel
			:visible="showAI"
			@close="closeAI" />
	</div>
</template>
