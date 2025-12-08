<script setup lang="ts">
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

	const { data: terminalProjects } = await useAsyncData<ProjectLite[]>('terminal-projects', () =>
		(queryCollection('projects') as any).select(['title', '_path', 'description']).all(),
	)

	const { data: terminalPosts } = await useAsyncData<BlogLite[]>('terminal-posts', () =>
		(queryCollection('blog') as any).select(['title', '_path', 'date']).all(),
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

<template>
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
				class="bg-white/5 ring-1 ring-white/10 shadow-(--shadow-glass)"
				:ui="{
					body: 'p-5 space-y-2',
				}">
				<div class="flex items-center justify-between gap-2">
					<h3 class="text-lg font-semibold text-white">{{ card.title }}</h3>
					<Icon
						name="heroicons:arrow-up-right-20-solid"
						class="text-primary-200" />
				</div>
				<p class="text-slate-300">{{ card.desc }}</p>
			</UCard>
		</div>
	</section>

	<TerminalOverlay
		:visible="showTerminal"
		:projects="terminalProjects || []"
		:posts="terminalPosts || []"
		@open-ai="openAI"
		@close="closeTerminal" />
	<AIChatPanel
		:visible="showAI"
		@close="closeAI" />
</template>
