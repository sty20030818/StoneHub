<template>
	<section class="space-y-6">
		<p class="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">Now</p>
		<h1 class="text-4xl font-bold text-(--text-primary) md:text-5xl">{{ now?.title || '我现在在做什么' }}</h1>
		<p class="text-(--text-secondary)">基于 content/now.json 渲染，区分进行中 / 已完成 / 接下来。</p>

		<div class="grid gap-4 md:grid-cols-3">
			<UCard
				class="surface-card rounded-2xl animate-slide-up-fade"
				:ui="{ body: 'p-5 space-y-3' }">
				<h3 class="text-xl font-semibold text-(--text-primary)">进行中</h3>
				<ul class="space-y-2 text-(--text-secondary)">
					<li
						v-for="item in now?.doing || []"
						:key="item">
						• {{ item }}
					</li>
				</ul>
			</UCard>
			<UCard
				class="surface-card rounded-2xl animate-slide-up-fade stagger-1"
				:ui="{ body: 'p-5 space-y-3' }">
				<h3 class="text-xl font-semibold text-(--text-primary)">已完成</h3>
				<ul class="space-y-2 text-(--text-secondary)">
					<li
						v-for="item in now?.done || []"
						:key="item">
						• {{ item }}
					</li>
				</ul>
			</UCard>
			<UCard
				class="surface-card rounded-2xl animate-slide-up-fade stagger-2"
				:ui="{ body: 'p-5 space-y-3' }">
				<h3 class="text-xl font-semibold text-(--text-primary)">接下来</h3>
				<ul class="space-y-2 text-(--text-secondary)">
					<li
						v-for="item in now?.next || []"
						:key="item">
						• {{ item }}
					</li>
				</ul>
			</UCard>
		</div>
	</section>
</template>

<script setup lang="ts">
	// 直接导入 JSON 数据（使用相对于项目根目录的路径）
	import nowData from '../../content/now.json'

	type NowData = {
		title?: string
		doing?: string[]
		done?: string[]
		next?: string[]
	}

	definePageMeta({ title: 'Now' })
	useHead({ title: 'Now' })

	const now = ref<NowData>(nowData)
</script>
