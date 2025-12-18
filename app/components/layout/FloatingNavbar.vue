<template>
	<div class="sticky top-6 z-50 w-full flex justify-center px-4 mt-6 pointer-events-none">
		<header
			class="pointer-events-auto w-full max-w-4xl flex items-center justify-between rounded-full bg-surface/80 backdrop-blur-xl border border-outline-variant/50 pl-6 pr-2 py-2 shadow-lg ring-1 ring-outline-variant/40 transition-all hover:shadow-xl">
			<!-- Logo / 首页链接 -->
			<NuxtLink
				to="/"
				class="flex items-center gap-3 group">
				<div
					class="flex items-center justify-center size-9 rounded-full bg-linear-to-br from-primary to-secondary text-white shadow-sm transition-transform group-hover:scale-105">
					<!-- 终端风格 Logo 图标 -->
					<UIcon
						name="i-lucide-terminal"
						class="size-[18px]" />
				</div>
				<span class="text-on-background text-lg font-bold tracking-tight hidden sm:block">StoneHub</span>
			</NuxtLink>

			<!-- 桌面端导航 -->
			<nav
				class="hidden md:flex items-center gap-1 bg-surface-container/50 rounded-full p-1 border border-outline-variant/40">
				<UButton
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					color="neutral"
					variant="ghost"
					:class="[
						'px-5 py-2 rounded-full text-sm font-medium transition-all',
						isActive(link.to)
							? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
							: 'text-on-background/70 hover:text-primary hover:bg-surface-container',
					]">
					{{ link.label }}
				</UButton>
			</nav>

			<!-- 功能按钮 -->
			<div class="flex items-center gap-1">
				<UButton
					color="neutral"
					variant="ghost"
					class="group flex items-center justify-center size-11 rounded-full text-on-background/70 hover:bg-surface-container hover:text-primary transition-all"
					:title="t('navbar.terminal')"
					:class="{ 'bg-surface-container text-primary': isTerminalOpen }"
					@click="toggleTerminal">
					<UIcon
						name="i-lucide-terminal-square"
						class="size-[22px]" />
				</UButton>
				<UButton
					color="neutral"
					variant="ghost"
					class="group flex items-center justify-center size-11 rounded-full text-on-background/70 hover:bg-secondary-container hover:text-secondary transition-all"
					:title="t('navbar.ai')"
					:class="{ 'bg-secondary-container text-secondary': isAIOpen }"
					@click="toggleAI">
					<UIcon
						name="i-lucide-bot"
						class="size-[22px]" />
				</UButton>

				<!-- 移动端菜单开关可在此添加 -->
			</div>
		</header>
	</div>
</template>

<script setup lang="ts">
	const { toggleTerminal, toggleAI, isTerminalOpen, isAIOpen } = useAppUiState()
	const { t } = useI18n()
	const route = useRoute()

	const navLinks = computed(() => [
		{ label: t('nav.home'), to: '/' },
		{ label: t('nav.projects'), to: '/projects' },
		{ label: t('nav.blog'), to: '/blog' },
		{ label: t('nav.now'), to: '/now' },
	])

	const isActive = (to: string) => {
		if (to === '/') return route.path === '/'
		return route.path === to || route.path.startsWith(`${to}/`)
	}
</script>
