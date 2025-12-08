<script setup lang="ts">
	const links = [
		{ label: 'GitHub', href: 'https://github.com', desc: '代码仓库与项目合集' },
		{ label: 'StoneOS', href: '#', desc: '未来的 Web OS 实验站，占位链接' },
		{ label: 'Blog', href: '/blog', desc: '博客列表页（站内）' },
	]
</script>

<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">Links</p>
			<h1 class="text-3xl font-bold md:text-4xl">外链与入口</h1>
			<p class="text-slate-300">这里放置 GitHub、实验站等常用入口，后续可补充。</p>
		</div>

		<div class="space-y-3">
			<UCard
				v-for="link in links"
				:key="link.href"
				class="bg-white/5 ring-1 ring-white/10 hover:ring-primary-400"
				:ui="{
					body: 'p-4',
				}">
				<div class="flex items-center justify-between gap-3">
					<div>
						<p class="text-lg font-semibold text-white">{{ link.label }}</p>
						<p class="text-slate-300">{{ link.desc }}</p>
					</div>
					<UButton
						:href="link.href"
						variant="ghost"
						icon="i-heroicons-arrow-up-right-20-solid"
						target="_blank"
						rel="noreferrer">
						访问
					</UButton>
				</div>
			</UCard>
		</div>
	</section>
</template>
