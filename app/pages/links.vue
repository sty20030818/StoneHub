<template>
	<section class="space-y-8">
		<!-- 页面标题 -->
		<div class="space-y-2 animate-slide-up-fade">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">Links</p>
			<h1 class="text-4xl font-bold text-(--text-primary) md:text-5xl">连接节点</h1>
			<p class="text-(--text-secondary)">常用入口与友链，使用 premium-card 九宫格呈现。</p>
		</div>

		<!-- 九宫格卡片 -->
		<div class="grid grid-cols-2 md:grid-cols-3 gap-6">
			<a
				v-for="(link, idx) in links || []"
				:key="link.url"
				:href="link.url"
				class="premium-card aspect-square rounded-4xl flex flex-col items-center justify-center gap-4 group animate-slide-up-fade"
				:class="`stagger-${(idx % 3) + 1}`"
				target="_blank"
				rel="noreferrer">
				<!-- 图标容器：悬停放大 + 阴影 -->
				<div
					class="w-20 h-20 rounded-3xl flex items-center justify-center text-(--text-secondary) shadow-sm border border-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
					:class="link.colorBg || 'bg-surface-variant'">
					<Icon
						:name="link.icon ? `lucide:${link.icon}` : 'lucide:link-2'"
						class="w-10 h-10"
						:class="link.colorText" />
				</div>
				<!-- 文字内容 -->
				<div class="flex flex-col text-center">
					<span class="font-bold text-(--text-primary) text-lg group-hover:text-(--color-primary) transition-colors">
						{{ link.name }}
					</span>
					<span class="text-xs text-(--text-muted) font-medium">@{{ link.handle }}</span>
				</div>
			</a>
		</div>
	</section>
</template>

<script setup lang="ts">
	// 直接导入 JSON 数据（使用相对于项目根目录的路径）
	import linksData from '../../content/links.json'

	type LinkItem = {
		name: string
		handle?: string
		icon?: string
		url: string
		colorBg?: string
		colorText?: string
	}

	definePageMeta({ title: '传送门' })
	useHead({ title: '传送门' })

	const links = ref<LinkItem[]>(linksData)
</script>
