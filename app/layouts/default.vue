<template>
	<div
		class="min-h-screen flex flex-col font-body text-on-background selection:bg-secondary-container selection:text-on-secondary-container">
		<LayoutAppBackground />
		<LayoutFloatingNavbar />
		<LayoutAppMain>
			<slot />
		</LayoutAppMain>
		<LayoutAppFooter />
		<LayoutFloatingActions />
	</div>
</template>

<script setup lang="ts">
	// 布局现在是原子组件的组合
</script>
