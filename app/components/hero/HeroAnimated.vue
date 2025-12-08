<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'open-terminal' | 'open-ai'): void
	}>()

	const tags = ['Nuxt 4', 'Vue 3', 'Tailwind', 'Motion', 'LLM Ready']
</script>

<template>
	<section
		v-motion="'fade-rise'"
		class="relative">
		<UCard
			class="surface-card state-layer rounded-3xl"
			:ui="{
				body: 'p-8 md:p-10 relative overflow-hidden',
			}">
			<div
				class="pointer-events-none absolute inset-0 bg-linear-to-tr from-primary-400/18 via-transparent to-[rgba(242,182,216,0.18)]" />

			<div class="relative space-y-6">
				<p class="text-sm font-semibold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-200">
					StoneFish · 石头鱼
				</p>
				<h1 class="text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
					打造操作系统级的 Web 体验
				</h1>
				<p class="max-w-2xl text-lg text-[var(--text-secondary)]">
					全栈工程师，偏爱新技术与 Web OS 实验。这里集合动画首页、命令行模式、AI 聊天、博客与项目展示。
				</p>

				<div class="flex flex-wrap gap-2">
					<UBadge
						v-for="tag in tags"
						:key="tag"
						variant="soft"
						color="primary"
						class="rounded-xl bg-primary-500/10 text-[var(--text-primary)]">
						{{ tag }}
					</UBadge>
				</div>

				<div class="flex flex-wrap gap-3">
					<UButton
						size="md"
						icon="i-heroicons-command-line"
						class="rounded-2xl"
						@click="emit('open-terminal')">
						打开命令行模式
					</UButton>
					<UButton
						size="md"
						variant="ghost"
						color="primary"
						icon="i-heroicons-sparkles"
						class="rounded-2xl"
						@click="emit('open-ai')">
						和 AI 石头鱼聊聊
					</UButton>
				</div>
			</div>
		</UCard>
	</section>
</template>
