<template>
	<section>
		<header>
			<p>StoneFish · 石头鱼</p>
			<h1>打造操作系统级的 Web 体验</h1>
			<p>全栈工程师，偏爱新技术与 Web OS 实验。这里集合首页、命令行模式、AI 聊天、博客与项目展示。</p>
		</header>

		<section aria-label="标签">
			<ul>
				<li
					v-for="tag in tags"
					:key="tag">
					{{ tag }}
				</li>
			</ul>
		</section>

		<section aria-label="操作">
			<button
				type="button"
				@click="emit('open-terminal')">
				打开命令行模式
			</button>
			<button
				type="button"
				@click="emit('open-ai')">
				和 AI 石头鱼聊聊
			</button>
		</section>
	</section>
</template>

<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'open-terminal' | 'open-ai'): void
	}>()

	const tags = ['Nuxt 4', 'Vue 3', 'Tailwind', 'Motion', 'LLM Ready']
</script>
