<script setup lang="ts">
	import OverlayAIChatPanel from '~/components/overlay/AIChatPanel.vue'
	import OverlayTerminalOverlay from '~/components/overlay/TerminalOverlay.vue'

	type ProjectLite = {
		_path: string
		title: string
		description?: string
	}

	type BlogLite = {
		_path: string
		title: string
		date?: string
	}

	const showTerminal = ref(false)
	const showAI = ref(false)

	const { data: terminalProjects } = await useAsyncData<ProjectLite[]>('terminal-projects', async () => {
		const rows = await queryCollection('projects').select('title', 'path', 'description').all()
		return (rows || []).reduce<ProjectLite[]>((acc, item) => {
			if (!item || typeof item !== 'object' || !('path' in item)) return acc
			acc.push({
				_path: String((item as { path: string }).path),
				title: (item as { title?: string }).title ?? '',
				description: (item as { description?: string }).description,
			})
			return acc
		}, [])
	})

	const { data: terminalPosts } = await useAsyncData<BlogLite[]>('terminal-posts', async () => {
		const rows = await queryCollection('blog').select('title', 'path', 'meta').all()
		return (rows || []).reduce<BlogLite[]>((acc, item) => {
			if (!item || typeof item !== 'object' || !('_path' in item)) return acc
			acc.push({
				_path: String((item as { _path: string })._path),
				title: (item as { title?: string }).title ?? '',
				date: (item as { date?: string }).date,
			})
			return acc
		}, [])
	})

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
	<div class="space-y-10">
		<section class="space-y-10">
			<HeroAnimated
				@open-terminal="openTerminal"
				@open-ai="openAI" />

			<div class="grid gap-6 md:grid-cols-2">
				<UCard
					v-for="card in [
						{ title: '命令行模式', desc: '全屏终端式交互，支持 help/clear/exit/open 等命令。' },
						{ title: 'AI 聊天', desc: '右侧抽屉式聊天，先用本地假回复，后续可接入 LLM。' },
						{ title: '项目与博客', desc: '通过 @nuxt/content 读取 markdown，列表与详情页分离。' },
						{ title: '动效与 UI', desc: 'Tailwind 主题色、全局渐变背景，后续可加 Motion 动效。' },
					]"
					:key="card.title"
					v-motion="'fade-rise'"
					class="surface-card rounded-2xl"
					:ui="{
						body: 'p-5 space-y-2',
					}">
					<div class="flex items-center justify-between gap-2">
						<h3 class="text-lg font-semibold text-[var(--text-primary)]">{{ card.title }}</h3>
						<Icon
							name="heroicons:arrow-up-right-20-solid"
							class="text-primary-500" />
					</div>
					<p class="text-[var(--text-secondary)]">{{ card.desc }}</p>
				</UCard>
			</div>
		</section>

		<OverlayTerminalOverlay
			:visible="showTerminal"
			:projects="terminalProjects || []"
			:posts="terminalPosts || []"
			@open-ai="openAI"
			@close="closeTerminal" />
		<OverlayAIChatPanel
			:visible="showAI"
			@close="closeAI" />
	</div>
</template>
