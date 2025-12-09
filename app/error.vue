<template>
	<div class="min-h-screen bg-surface text-slate-100">
		<div class="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">Error</p>
			<h1 class="text-4xl font-bold md:text-5xl">
				{{ props.error.statusCode || 500 }}
			</h1>
			<p class="text-lg text-slate-300">
				{{ props.error.message || 'Something went wrong.' }}
			</p>
			<div class="flex gap-3">
				<button
					class="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-400"
					@click="goHome">
					返回首页
				</button>
				<button
					class="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-primary-400"
					@click="clearError()">
					留在此页
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		error: { statusCode?: number; message?: string }
	}>()

	const goHome = () => clearError({ redirect: '/' })
</script>
