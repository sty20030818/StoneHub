<script setup lang="ts">
	const route = useRoute()

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

	const externalLinks = [
		{ label: 'GitHub', href: 'https://github.com' },
		{ label: 'StoneOS', href: 'https://stoneos.example.com' },
	]
</script>

<template>
	<div class="min-h-screen text-slate-100">
		<div class="pointer-events-none fixed inset-0 bg-linear-to-b from-white/5 via-transparent to-black/40" />

		<header class="sticky top-0 z-20 border-b border-white/10 bg-surface/80 backdrop-blur-md backdrop-saturate-150">
			<UContainer class="flex items-center justify-between py-4">
				<NuxtLink
					to="/"
					class="text-lg font-semibold tracking-tight">
					StoneHub
				</NuxtLink>
				<nav class="flex items-center gap-2 text-sm">
					<UButton
						v-for="link in navLinks"
						:key="link.to"
						:to="link.to"
						size="sm"
						color="primary"
						:variant="isActive(link.to) ? 'soft' : 'ghost'">
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
						rel="noreferrer">
						{{ item.label }}
					</UButton>
				</div>
			</UContainer>
		</header>

		<main class="py-10">
			<UContainer>
				<slot />
			</UContainer>
		</main>

		<UContainer class="pb-8 text-sm text-slate-400">Crafted for StoneHub · Nuxt 4 · Tailwind</UContainer>
	</div>
</template>
