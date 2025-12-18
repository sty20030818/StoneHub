<template>
	<!-- 右下角悬浮按钮组 -->
	<div class="fixed bottom-24 right-6 z-100 flex flex-col gap-3">
		<!-- 返回顶部按钮 -->
		<Transition name="fade">
			<div v-if="showBackToTop">
				<UButton
					color="neutral"
					variant="ghost"
					class="float-button flex items-center justify-center size-12 rounded-full text-on-background/70 hover:text-primary"
					@click="scrollToTop">
					<UIcon
						name="i-lucide-arrow-up"
						class="size-5" />
				</UButton>
			</div>
		</Transition>

		<!-- 设置按钮 -->
		<UPopover
			v-model:open="showSettings"
			:content="{ side: 'top', sideOffset: 12 }"
			:ui="{ content: 'island-card z-[120] w-48 p-3 rounded-2xl flex flex-col gap-2', arrow: 'fill-surface' }">
			<UButton
				color="neutral"
				variant="ghost"
				class="float-button flex items-center justify-center size-12 rounded-full text-on-background/70 hover:text-primary"
				:class="{ 'bg-primary! text-on-primary! glow-primary': showSettings }"
				:aria-label="t('settings.title')"
				:title="t('settings.title')">
				<UIcon
					:name="showSettings ? 'i-lucide-x' : 'i-lucide-settings'"
					class="size-5 transition-transform duration-300"
					:class="{ 'rotate-90': showSettings }" />
			</UButton>

			<template #content>
				<!-- 明暗模式 -->
				<UButton
					color="neutral"
					variant="ghost"
					class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-sm font-medium text-on-background/85 hover:bg-surface-container transition-colors"
					@click="toggleColorMode">
					<UIcon
						:name="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
						class="size-5 text-primary" />
					<span>{{ colorMode.value === 'dark' ? t('settings.theme.light') : t('settings.theme.dark') }}</span>
				</UButton>

				<!-- 语言切换 -->
				<UButton
					type="button"
					color="neutral"
					variant="ghost"
					class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-sm font-medium text-on-background/85 hover:bg-surface-container transition-colors"
					@click="toggleLocale">
					<UIcon
						name="i-lucide-languages"
						class="size-5 text-secondary" />
					<span>{{ locale === 'zh' ? '中文' : 'English' }}</span>
				</UButton>
			</template>
		</UPopover>
	</div>
</template>

<script setup lang="ts">
	import { useEventListener, useThrottleFn } from '@vueuse/core'

	const showSettings = ref(false)
	const { locale, setLocale, t } = useI18n()
	const toggleLocale = () => setLocale(locale.value === 'zh' ? 'en' : 'zh')

	// 颜色模式
	const colorMode = useColorMode()
	const toggleColorMode = () => {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	}

	// 返回顶部
	const showBackToTop = ref(false)
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	// 监听滚动
	const updateBackToTop = useThrottleFn(() => {
		showBackToTop.value = window.scrollY > 300
	}, 120)

	onMounted(() => {
		if (!import.meta.client) return
		updateBackToTop()
		useEventListener(window, 'scroll', updateBackToTop, { passive: true })
	})
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
</style>
