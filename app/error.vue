<template>
	<section>
		<p>Error</p>
		<h1>{{ props.error.statusCode || 500 }}</h1>
		<p>{{ props.error.message || 'Something went wrong.' }}</p>
		<div>
			<button
				type="button"
				@click="goHome">
				返回首页
			</button>
			<button
				type="button"
				@click="clearError()">
				留在此页
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
	const props = defineProps<{
		error: { statusCode?: number; message?: string }
	}>()

	const goHome = () => clearError({ redirect: '/' })
</script>
