<template>
	<div>
		<nav aria-label="主导航">
			<ul>
				<li
					v-for="link in navLinks"
					:key="link.to">
					<NuxtLink
						:to="link.to"
						:aria-current="isActive(link.to) ? 'page' : undefined">
						<Icon :name="`lucide:${link.icon}`" />
						<span>{{ link.label }}</span>
					</NuxtLink>
				</li>
			</ul>
		</nav>

		<main>
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
	const route = useRoute()

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
