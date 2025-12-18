<template>
	<!-- 右下角悬浮按钮组 -->
	<div class="fixed bottom-24 right-6 z-50 flex flex-col gap-3">
		<!-- 设置按钮 -->
		<div class="relative">
			<UButton
				color="neutral"
				variant="ghost"
				class="float-button flex items-center justify-center size-12 rounded-full text-slate-500 hover:text-primary"
				:class="{ 'bg-primary! text-on-primary! glow-primary': showSettings }"
				@click="showSettings = !showSettings">
				<Icon
					:name="showSettings ? 'lucide:x' : 'lucide:settings'"
					class="size-5 transition-transform duration-300"
					:class="{ 'rotate-90': showSettings }" />
			</UButton>

			<!-- 设置菜单 -->
			<Transition name="slide-up">
				<div
					v-if="showSettings"
					class="island-card absolute bottom-14 right-0 w-48 p-3 rounded-2xl flex flex-col gap-2">
					<!-- 明暗模式 -->
					<UButton
						color="neutral"
						variant="ghost"
						class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-sm font-medium text-slate-700 hover:bg-surface-container transition-colors"
						@click="toggleColorMode">
						<Icon
							:name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
							class="size-5 text-primary" />
						<span>{{ colorMode.value === 'dark' ? '浅色模式' : '深色模式' }}</span>
					</UButton>

					<!-- 语言切换 -->
					<UButton
						color="neutral"
						variant="ghost"
						class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-sm font-medium text-slate-700 hover:bg-surface-container transition-colors"
						@click="toggleLanguage">
						<Icon
							name="lucide:languages"
							class="size-5 text-secondary" />
						<span>{{ currentLang === 'zh' ? 'English' : '中文' }}</span>
					</UButton>
				</div>
			</Transition>
		</div>

		<!-- 返回顶部按钮 -->
		<Transition name="fade">
			<UButton
				v-show="showBackToTop"
				color="neutral"
				variant="ghost"
				class="float-button flex items-center justify-center size-12 rounded-full text-slate-500 hover:text-primary"
				@click="scrollToTop">
				<Icon
					name="lucide:arrow-up"
					class="size-5" />
			</UButton>
		</Transition>
	</div>
</template>

<script setup lang="ts">
	const showSettings = ref(false)
	const currentLang = ref('zh')

	// 颜色模式
	const colorMode = useColorMode()
	const toggleColorMode = () => {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	}

	// 语言切换（占位，需要集成 i18n）
	const toggleLanguage = () => {
		currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
		// TODO: 集成实际的 i18n 切换
	}

	// 返回顶部
	const showBackToTop = ref(false)
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	// 监听滚动
	onMounted(() => {
		window.addEventListener('scroll', () => {
			showBackToTop.value = window.scrollY > 300
		})
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

	.slide-up-enter-active,
	.slide-up-leave-active {
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}
	.slide-up-enter-from,
	.slide-up-leave-to {
		opacity: 0;
		transform: translateY(10px) scale(0.95);
	}
</style>
