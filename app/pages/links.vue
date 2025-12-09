<script setup lang="ts">
	definePageMeta({ title: '外链与入口' })
	useHead({ title: '外链与入口' })

	const links = [
		{ label: 'GitHub', href: 'https://github.com', desc: '代码仓库与项目合集' },
		{ label: 'StoneOS', href: '#', desc: '未来的 Web OS 实验站，占位链接' },
		{ label: 'Blog', href: '/blog', desc: '博客列表页（站内）' },
	]
</script>

<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-200">Links</p>
			<h1 class="text-3xl font-bold text-(--text-primary) md:text-4xl">外链与入口</h1>
			<p class="text-(--text-secondary)">这里放置 GitHub、实验站等常用入口,后续可补充。</p>
		</div>

		<div class="space-y-3">
			<UCard
				v-for="link in links"
				:key="link.href"
				v-motion="'fade-rise'"
				class="surface-card rounded-2xl"
				:ui="{
					body: 'p-4',
				}">
				<div class="flex items-center justify-between gap-3">
					<div>
						<p class="text-lg font-semibold text-(--text-primary)">{{ link.label }}</p>
						<p class="text-(--text-secondary)">{{ link.desc }}</p>
					</div>
					<UButton
						:href="link.href"
						variant="ghost"
						icon="i-heroicons-arrow-up-right-20-solid"
						target="_blank"
						rel="noreferrer"
						class="rounded-xl">
						访问
					</UButton>
				</div>
			</UCard>
		</div>
	</section>
</template>
