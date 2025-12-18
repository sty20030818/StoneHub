<template>
	<UPage>
		<UPageHeader
			headline="Now"
			:title="now?.title || '我现在在做什么'"
			description="基于 content/now.json 渲染，区分进行中 / 已完成 / 接下来。" />

		<UPageBody>
			<UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
				<UCard>
					<template #header>
						<div class="flex items-center gap-2">
							<span>进行中</span>
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
							<span>已完成</span>
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
							<span>接下来</span>
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
	// 直接导入 JSON 数据（使用相对于项目根目录的路径）
	import nowData from '../../content/now.json'

	type NowData = {
		title?: string
		doing?: string[]
		done?: string[]
		next?: string[]
	}

	definePageMeta({ title: 'Now' })
	useHead({ title: 'Now' })

	const now = ref<NowData>(nowData)
</script>
