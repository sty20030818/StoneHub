<template>
	<div class="sticky top-6 z-50 w-full flex justify-center px-4 mt-6 pointer-events-none">
		<header
			class="pointer-events-auto w-full max-w-4xl flex items-center justify-between rounded-full bg-surface/80 backdrop-blur-xl border border-white/50 pl-6 pr-2 py-2 shadow-lg ring-1 ring-white/60 transition-all hover:shadow-xl">
			<!-- Logo / 首页链接 -->
			<NuxtLink
				to="/"
				class="flex items-center gap-3 group">
				<div
					class="flex items-center justify-center size-9 rounded-full bg-linear-to-br from-primary to-secondary text-white shadow-sm transition-transform group-hover:scale-105">
					<!-- 终端风格 Logo 图标 -->
					<Icon
						name="lucide:terminal"
						class="size-[18px]" />
				</div>
				<span class="text-slate-800 text-lg font-bold tracking-tight hidden sm:block">StoneHub</span>
			</NuxtLink>

			<!-- 桌面端导航 -->
			<nav class="hidden md:flex items-center gap-1 bg-surface-container/50 rounded-full p-1 border border-white/20">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					active-class="bg-primary-container text-on-primary-container font-bold shadow-sm"
					class="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-primary hover:bg-white transition-all">
					{{ link.label }}
				</NuxtLink>
			</nav>

			<!-- 功能按钮 -->
			<div class="flex items-center gap-1">
				<button
					@click="toggleTerminal"
					class="group flex items-center justify-center size-11 rounded-full text-slate-500 hover:bg-surface-container hover:text-primary transition-all"
					title="交互式终端"
					:class="{ 'bg-surface-container text-primary': isTerminalOpen }">
					<Icon
						name="lucide:terminal-square"
						class="size-[22px]" />
				</button>
				<button
					@click="toggleAI"
					class="group flex items-center justify-center size-11 rounded-full text-slate-500 hover:bg-secondary-container hover:text-secondary transition-all"
					title="AI 助手"
					:class="{ 'bg-secondary-container text-secondary': isAIOpen }">
					<Icon
						name="lucide:bot"
						class="size-[22px]" />
				</button>

				<!-- 移动端菜单开关可在此添加 -->
			</div>
		</header>
	</div>
</template>

<script setup lang="ts">
	const { toggleTerminal, toggleAI, isTerminalOpen, isAIOpen } = useAppUiState()

	const navLinks = [
		{ label: '首页', to: '/' },
		{ label: '项目', to: '/projects' },
		{ label: '博客', to: '/blog' },
		{ label: 'Now', to: '/now' },
	]
</script>
