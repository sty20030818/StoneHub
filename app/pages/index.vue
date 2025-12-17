<template>
	<div class="flex flex-col gap-8 pt-12">
		<HomeHeroSection />

		<HomeProjectScroll :projects="homeProjects" />

		<!-- 由全局状态控制的弹出层 -->
		<OverlayTerminalOverlay
			:visible="isTerminalOpen"
			:projects="overlayProjects"
			:posts="overlayPosts"
			@open-ai="openAI"
			@navigate="handleNavigate"
			@close="toggleTerminal" />
		<OverlayAIChatPanel
			:visible="isAIOpen"
			@close="toggleAI" />
	</div>
</template>

<script setup lang="ts">
	import OverlayAIChatPanel from '~/components/overlay/AIChatPanel.vue'
	import OverlayTerminalOverlay from '~/components/overlay/TerminalOverlay.vue'

	type Project = {
		title: string
		description: string
		year?: string
		tags?: string[]
		icon?: string
		image?: string
		link?: string
	}
	type Post = { title?: string; date?: string; slug?: string; description?: string; _path?: string }

	definePageMeta({ title: '首页' })
	useHead({ title: '首页' })

	// 全局 UI 状态
	const { isTerminalOpen, isAIOpen, toggleTerminal, toggleAI } = useAppUiState()

	// 数据获取
	const { data: projects } = await useAsyncData<Project[]>('home-projects', async () => {
		return await $fetch<Project[]>('/api/home/projects')
	})

	const { data: posts } = await useAsyncData<Post[]>('home-posts', async () => {
		return await $fetch<Post[]>('/api/home/posts')
	})

	// 计算属性，传递给子组件
	const homeProjects = computed(() => projects.value || [])

	const overlayProjects = computed(() =>
		(projects.value || []).map((p) => ({ title: p.title || '', desc: p.description || '' })),
	)
	const overlayPosts = computed(() =>
		(posts.value || []).map((p) => ({ title: p.title || '', date: p.date || '', slug: p.slug || p._path || '' })),
	)

	// 事件处理
	const openAI = () => {
		if (!isAIOpen.value) toggleAI()
	}

	const handleNavigate = (path: string) => {
		navigateTo(path)
		if (isTerminalOpen.value) toggleTerminal()
	}
</script>
