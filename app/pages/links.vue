<template>
	<section>
		<header>
			<p>Links</p>
			<h1>连接节点</h1>
			<p>常用入口与友链。</p>
		</header>

		<ul>
			<li
				v-for="link in links || []"
				:key="link.url">
				<a
					:href="link.url"
					target="_blank"
					rel="noreferrer">
					<Icon :name="link.icon ? `lucide:${link.icon}` : 'lucide:link-2'" />
					<span>{{ link.name }}</span>
					<span v-if="link.handle">(@{{ link.handle }})</span>
				</a>
			</li>
		</ul>
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
