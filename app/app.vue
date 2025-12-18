<template>
	<UApp
		:locale="uiLocale"
		:toaster="{ position: 'bottom-right', duration: 3200, max: 4, progress: true, expand: true }">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>

<script setup lang="ts">
	import { en, zh_cn } from '@nuxt/ui/locale'
	import { extendLocale } from '@nuxt/ui/composables/defineLocale'

	const { locale } = useI18n()
	const zhLocale = extendLocale(zh_cn, { code: 'zh', name: '中文' })

	const uiLocale = computed(() => {
		if (locale.value === 'en') return en
		return zhLocale
	})
</script>
