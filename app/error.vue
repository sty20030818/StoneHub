<template>
	<UPage>
		<UPageHeader
			headline="Error"
			:title="String(props.error.statusCode || 500)"
			:description="props.error.message || 'Something went wrong.'" />

		<UPageBody>
			<UAlert
				title="发生错误"
				:description="props.error.message || 'Something went wrong.'"
				color="neutral"
				variant="subtle"
				icon="i-lucide-triangle-alert" />

			<div class="mt-4 flex flex-wrap gap-2">
				<UButton
					color="neutral"
					variant="outline"
					icon="i-lucide-house"
					@click="goHome">
					返回首页
				</UButton>
				<UButton
					color="neutral"
					variant="outline"
					icon="i-lucide-refresh-cw"
					@click="refresh">
					刷新
				</UButton>
				<UButton
					color="neutral"
					variant="ghost"
					icon="i-lucide-x"
					@click="clearError()">
					留在此页
				</UButton>
			</div>
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
	const props = defineProps<{
		error: { statusCode?: number; message?: string }
	}>()

	const goHome = () => clearError({ redirect: '/' })
	const refresh = () => location.reload()
</script>
