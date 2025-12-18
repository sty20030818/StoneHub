<template>
	<!-- 岛屿式 Hero 卡片 -->
	<section class="island-card relative mx-auto w-full max-w-5xl rounded-[3rem] p-10 md:p-16 lg:p-20">
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
				<span class="text-on-secondary-container text-sm font-bold tracking-wide">目前接受新项目预订</span>
			</div>

			<!-- 主标题 -->
			<h1 class="text-slate-900 font-display font-bold leading-none tracking-tight">
				<span class="block text-display-large">
					以
					<span class="text-transparent bg-clip-text bg-linear-to-br from-primary to-secondary">代码与色彩</span>
				</span>
				<span class="block text-display-medium mt-3">编织未来视界</span>
			</h1>

			<!-- 简介 -->
			<p class="text-slate-500 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
				你好，我是 StoneFish。我致力于构建沉浸式、极简且富有动感的 Web 体验。
				<br class="hidden md:block" />
				您可以启动终端探索我的数字花园，或呼叫 AI 助手为您导览。
			</p>

			<!-- 行动按钮 -->
			<div class="flex flex-col sm:flex-row gap-5 mt-4 w-full justify-center">
				<UButton
					color="neutral"
					variant="ghost"
					class="glow-primary group relative flex items-center justify-center gap-3 h-14 px-10 rounded-full bg-primary text-on-primary text-base font-bold active:scale-95"
					@click="toggleTerminal">
					<Icon
						name="lucide:terminal"
						class="w-5 h-5" />
					<span>启动交互式终端</span>
				</UButton>
				<UButton
					color="neutral"
					variant="ghost"
					class="glow-secondary group relative flex items-center justify-center gap-3 h-14 px-10 rounded-full bg-secondary text-on-secondary text-base font-bold active:scale-95"
					@click="toggleAI">
					<Icon
						name="lucide:bot"
						class="w-5 h-5" />
					<span>呼叫 AI 助手</span>
				</UButton>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const { toggleTerminal, toggleAI } = useAppUiState()
</script>
