<template>
	<UPage>
		<UPageHeader
			:headline="t('links.headline')"
			:title="t('links.title')"
			:description="t('links.description')" />

		<UPageBody>
			<UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
				<UPageCard
					v-for="link in links || []"
					:key="link.url"
					:to="link.url"
					target="_blank"
					rel="noopener noreferrer"
					:icon="toNuxtUiIcon(link.icon)"
					:title="link.name"
					:description="link.handle ? `@${link.handle}` : undefined"
					variant="subtle"
					highlight
					highlight-color="primary" />
			</UPageGrid>
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
	// 直接导入 JSON 数据(使用相对于项目根目录的路径)
	import linksData from '../../content/links.json'

	type LinkItem = {
		name: string
		handle?: string
		icon?: string
		url: string
		colorBg?: string
		colorText?: string
	}

	const { t } = useI18n()
	useHead(() => ({ title: t('nav.links') }))

	const links = ref<LinkItem[]>(linksData)

	const toNuxtUiIcon = (raw?: string): string => {
		if (!raw) return 'i-lucide-link-2'
		if (raw.startsWith('i-')) return raw
		if (raw.includes(':')) {
			const [collection, name] = raw.split(':')
			if (collection && name) return `i-${collection}-${name}`
		}
		return `i-lucide-${raw}`
	}
</script>
