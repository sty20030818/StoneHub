<template>
	<UPage>
		<UPageHeader
			:headline="t('error.headline')"
			:title="String(props.error.statusCode || 500)"
			:description="props.error.message || t('error.somethingWentWrong')" />

		<UPageBody>
			<UAlert
				:title="t('error.title')"
				:description="props.error.message || t('error.somethingWentWrong')"
				color="neutral"
				variant="subtle"
				icon="i-lucide-triangle-alert" />

			<div class="mt-4 flex flex-wrap gap-2">
				<UButton
					color="neutral"
					variant="outline"
					icon="i-lucide-house"
					@click="goHome">
					{{ t('common.backHome') }}
				</UButton>
				<UButton
					color="neutral"
					variant="outline"
					icon="i-lucide-refresh-cw"
					@click="refresh">
					{{ t('common.refresh') }}
				</UButton>
				<UButton
					color="neutral"
					variant="ghost"
					icon="i-lucide-x"
					@click="clearError()">
					{{ t('error.stayHere') }}
				</UButton>
			</div>
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
	const props = defineProps<{
		error: { statusCode?: number; message?: string }
	}>()

	const { t } = useI18n()

	const goHome = () => clearError({ redirect: '/' })
	const refresh = () => location.reload()
</script>
