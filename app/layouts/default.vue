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
		{ label: '首页', to: '/' },
		{ label: '项目', to: '/projects' },
		{ label: '博客', to: '/blog' },
		{ label: 'Now', to: '/now' },
		{ label: '传送门', to: '/links' },
	]

	const isActive = (path: string) => {
		if (path === '/') return route.path === '/'
		return route.path.startsWith(path)
	}
</script>

<template>
	<div class="relative min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden">
		<!-- 背景 Blob -->
		<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			<div class="blob blob-1" />
			<div class="blob blob-2" />
			<div class="blob blob-3" />
		</div>

		<!-- 顶部导航（玻璃态胶囊） -->
		<nav class="relative z-40 w-full flex justify-center pt-6 px-4">
			<div
				class="glass-panel px-6 py-3 rounded-full shadow-sm flex items-center gap-6 transition-all duration-300 hover:shadow-md">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					class="text-sm transition-colors"
					:class="isActive(link.to) ? 'text-sky-600 font-semibold' : 'text-slate-500 hover:text-sky-500'">
					{{ link.label }}
				</NuxtLink>
			</div>
		</nav>

		<main class="relative z-10">
			<div class="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
				<slot />
			</div>
		</main>
	</div>
</template>
