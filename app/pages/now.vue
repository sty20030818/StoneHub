<template>
	<section>
		<header>
			<p>Now</p>
			<h1>{{ now?.title || '我现在在做什么' }}</h1>
			<p>基于 content/now.json 渲染，区分进行中 / 已完成 / 接下来。</p>
		</header>

		<section>
			<h2>进行中</h2>
			<ul>
				<li
					v-for="item in now?.doing || []"
					:key="item">
					{{ item }}
				</li>
			</ul>
		</section>

		<section>
			<h2>已完成</h2>
			<ul>
				<li
					v-for="item in now?.done || []"
					:key="item">
					{{ item }}
				</li>
			</ul>
		</section>

		<section>
			<h2>接下来</h2>
			<ul>
				<li
					v-for="item in now?.next || []"
					:key="item">
					{{ item }}
				</li>
			</ul>
		</section>
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
