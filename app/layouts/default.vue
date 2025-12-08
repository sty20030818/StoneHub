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
		{ label: 'Home', to: '/' },
		{ label: 'Projects', to: '/projects' },
		{ label: 'Blog', to: '/blog' },
		{ label: 'Now', to: '/now' },
		{ label: 'Links', to: '/links' },
	]

	const isActive = (path: string) => {
		if (path === '/') return route.path === '/'
		return route.path.startsWith(path)
	}

	const toggleTheme = () => {
		isDark.value = !isDark.value
		document.documentElement.classList.toggle('dark', isDark.value)
	}

	const externalLinks = [
		{ label: 'GitHub', href: 'https://github.com' },
		{ label: 'StoneOS', href: 'https://stoneos.example.com' },
	]
</script>

<template>
	<div class="min-h-screen text-[var(--text-primary)]">
		<header
			class="sticky top-0 z-20 border-b border-[var(--surface-outline)]/60 bg-[var(--surface-card)]/80 backdrop-saturate-150 backdrop-surface">
			<UContainer class="flex items-center justify-between py-4">
				<div class="flex items-center gap-2">
					<div class="h-9 w-9 rounded-2xl bg-primary-500/15 ring-1 ring-primary-500/30" />
					<NuxtLink
						to="/"
						class="text-lg font-semibold tracking-tight">
						StoneHub
					</NuxtLink>
				</div>
				<nav class="flex items-center gap-1 text-sm">
					<UButton
						v-for="link in navLinks"
						:key="link.to"
						:to="link.to"
						size="sm"
						color="primary"
						:variant="isActive(link.to) ? 'soft' : 'ghost'"
						class="rounded-xl">
						{{ link.label }}
					</UButton>
				</nav>

				<div class="flex items-center gap-2 text-sm">
					<UButton
						v-for="item in externalLinks"
						:key="item.href"
						:href="item.href"
						size="sm"
						variant="ghost"
						icon="i-heroicons-arrow-top-right-on-square-20-solid"
						target="_blank"
						rel="noreferrer"
						class="rounded-xl">
						{{ item.label }}
					</UButton>
					<UButton
						size="sm"
						variant="ghost"
						:icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
						class="rounded-xl"
						@click="toggleTheme">
						{{ isDark ? '浅色' : '深色' }}
					</UButton>
				</div>
			</UContainer>
		</header>

		<main class="py-10">
			<UContainer class="max-w-5xl space-y-10">
				<slot />
			</UContainer>
		</main>

		<UContainer class="pb-8 text-sm text-[var(--text-secondary)]">Crafted for StoneHub · Nuxt 4 · Tailwind</UContainer>
	</div>
</template>
