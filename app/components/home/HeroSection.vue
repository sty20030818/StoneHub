<template>
	<!-- 岛屿式 Hero 卡片 -->
	<UCard
		class="island-card relative mx-auto w-full max-w-5xl rounded-[3rem] p-10 md:p-16 lg:p-20"
		:ui="{ body: 'p-0' }">
		<!-- 装饰光效 -->
		<div class="absolute -top-24 -left-24 w-56 h-56 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
		<div class="absolute -bottom-24 -right-24 w-56 h-56 bg-secondary/25 rounded-full blur-3xl pointer-events-none" />

		<div class="relative flex flex-col items-center text-center gap-8">
			<!-- 状态徽章 -->
			<div
				class="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary-container/40 backdrop-blur-sm shadow-sm">
				<span class="relative flex h-2.5 w-2.5">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
					<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
				</span>
				<span class="text-on-secondary-container text-sm font-bold tracking-wide">{{ t('home.hero.status') }}</span>
			</div>

			<!-- 主标题 -->
			<h1 class="text-on-background font-display font-bold leading-none tracking-tight">
				<span class="block text-display-large">
					{{ t('home.hero.title.prefix') }}
					<span class="text-transparent bg-clip-text bg-linear-to-br from-primary to-secondary">
						{{ t('home.hero.title.emphasis') }}
					</span>
				</span>
				<span class="block text-display-medium mt-3">{{ t('home.hero.title.suffix') }}</span>
			</h1>

			<!-- 简介 -->
			<p class="text-on-background/70 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
				{{ t('home.hero.introHello') }}
				<strong class="text-on-background/85 font-bold">StoneFish</strong>
				{{ t('home.hero.introNamePunctuation') }}
				<br />
				{{ t('home.hero.introMission') }}
				<br class="hidden md:block" />
				{{ t('home.hero.introLine2') }}
			</p>

			<!-- 行动按钮 -->
			<div class="flex flex-col sm:flex-row gap-5 mt-4 w-full justify-center">
				<UButton
					color="neutral"
					variant="ghost"
					class="glow-primary group relative flex items-center justify-center gap-3 h-14 px-10 rounded-full bg-primary text-on-primary text-base font-bold active:scale-95"
					@click="toggleTerminal">
					<UIcon
						name="i-lucide-terminal"
						class="w-5 h-5" />
					<span>{{ t('home.hero.actions.terminal') }}</span>
				</UButton>
				<UButton
					color="neutral"
					variant="ghost"
					class="glow-secondary group relative flex items-center justify-center gap-3 h-14 px-10 rounded-full bg-secondary text-on-secondary text-base font-bold active:scale-95"
					@click="toggleAI">
					<UIcon
						name="i-lucide-bot"
						class="w-5 h-5" />
					<span>{{ t('home.hero.actions.ai') }}</span>
				</UButton>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
	const { toggleTerminal, toggleAI } = useAppUiState()
	const { t } = useI18n()
</script>
