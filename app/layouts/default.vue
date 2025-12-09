<template>
	<div class="relative min-h-screen font-sans antialiased overflow-x-hidden bg-(--surface-base) text-(--text-primary)">
		<!-- 噪点纹理 -->
		<div class="noise-bg" />

		<!-- 背景 Blob -->
		<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			<div class="blob blob-1" />
			<div class="blob blob-2" />
			<div class="blob blob-3" />
		</div>

		<!-- 顶部导航（悬浮胶囊 Floating Pill） -->
		<nav class="relative z-40 w-full flex justify-center pt-8 px-4">
			<div class="premium-card rounded-full! px-2 py-2 flex items-center gap-1 shadow-glass">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					class="relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 tap-effect group overflow-hidden"
					:class="
						isActive(link.to)
							? 'text-(--color-on-primary) shadow-lg'
							: 'text-(--text-secondary) hover:text-(--color-primary) hover:bg-white/50'
					">
					<!-- 激活时的背景胶囊 -->
					<div
						v-if="isActive(link.to)"
						class="absolute inset-0 bg-(--color-primary) rounded-full -z-10 animate-scale-in" />

					<span class="relative z-10 flex items-center gap-2">
						<Icon
							:name="`lucide:${link.icon}`"
							class="w-4 h-4" />
						{{ link.label }}
					</span>
				</NuxtLink>
			</div>
		</nav>

		<main class="relative z-10">
			<div class="mx-auto w-full max-w-[1200px] px-5 md:px-8 py-12">
				<slot />
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	const route = useRoute()
	const isDark = useState('theme-dark', () => false)

	let media: MediaQueryList | null = null

	onMounted(() => {
		if (import.meta.client && window.matchMedia) {
			media = window.matchMedia('(prefers-color-scheme: dark)')
			isDark.value = media.matches
			document.documentElement.classList.toggle('dark', isDark.value)
			media.addEventListener('change', handleMediaChange)
		}
	})

	onBeforeUnmount(() => {
		if (media) {
			media.removeEventListener('change', handleMediaChange)
		}
	})

	const handleMediaChange = (event: MediaQueryListEvent) => {
		isDark.value = event.matches
		document.documentElement.classList.toggle('dark', isDark.value)
	}

	const navLinks = [
		{ label: '首页', to: '/', icon: 'home' },
		{ label: '项目', to: '/projects', icon: 'folder-kanban' },
		{ label: '博客', to: '/blog', icon: 'coffee' },
		{ label: 'Now', to: '/now', icon: 'clock' },
		{ label: '传送门', to: '/links', icon: 'link-2' },
	]

	const isActive = (path: string) => {
		if (path === '/') return route.path === '/'
		return route.path.startsWith(path)
	}
</script>
