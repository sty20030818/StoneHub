<template>
	<UPage>
		<UPageHeader
			:headline="t('now.headline')"
			:title="now?.title || t('now.fallbackTitle')"
			:description="t('now.description')" />

		<UPageBody>
			<UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
				<UCard>
					<template #header>
						<div class="flex items-center gap-2">
							<span>{{ t('now.sections.doing') }}</span>
							<UBadge
								color="neutral"
								variant="subtle"
								:label="(now?.doing || []).length" />
						</div>
					</template>

					<ul class="space-y-2">
						<li
							v-for="item in now?.doing || []"
							:key="item">
							{{ item }}
						</li>
					</ul>
				</UCard>

				<UCard>
					<template #header>
						<div class="flex items-center gap-2">
							<span>{{ t('now.sections.done') }}</span>
							<UBadge
								color="neutral"
								variant="subtle"
								:label="(now?.done || []).length" />
						</div>
					</template>

					<ul class="space-y-2">
						<li
							v-for="item in now?.done || []"
							:key="item">
							{{ item }}
						</li>
					</ul>
				</UCard>

				<UCard>
					<template #header>
						<div class="flex items-center gap-2">
							<span>{{ t('now.sections.next') }}</span>
							<UBadge
								color="neutral"
								variant="subtle"
								:label="(now?.next || []).length" />
						</div>
					</template>

					<ul class="space-y-2">
						<li
							v-for="item in now?.next || []"
							:key="item">
							{{ item }}
						</li>
					</ul>
				</UCard>
			</UPageGrid>
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
	// 直接导入 JSON 数据(使用相对于项目根目录的路径)
	import nowData from '../../content/now.json'

	type NowData = {
		title?: string
		doing?: string[]
		done?: string[]
		next?: string[]
	}

	const { t } = useI18n()
	useHead(() => ({ title: t('nav.now') }))

	const now = ref<NowData>(nowData)
</script>
