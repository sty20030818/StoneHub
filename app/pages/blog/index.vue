<template>
	<UPage>
		<UPageHeader
			:headline="t('blog.headline')"
			:title="t('blog.list.title')"
			:description="t('blog.list.description')" />

		<UPageBody>
			<UAlert
				v-if="itemsError"
				:title="t('blog.list.errorTitle')"
				:description="itemsError.message || t('common.checkNetworkRetry')"
				color="neutral"
				variant="subtle"
				icon="i-lucide-triangle-alert">
				<template #actions>
					<UButton
						color="neutral"
						variant="outline"
						icon="i-lucide-refresh-cw"
						@click="retryItems">
						{{ t('common.retry') }}
					</UButton>
				</template>
			</UAlert>

			<div
				v-else-if="itemsPending"
				class="space-y-3">
				<USkeleton
					v-for="i in 6"
					:key="i"
					class="h-20 rounded-lg" />
			</div>

			<UEmpty
				v-else-if="posts.length === 0"
				icon="i-lucide-book-open"
				:title="t('blog.list.emptyTitle')"
				:description="t('blog.list.emptyDescription')"
				:actions="[
					{ label: t('common.backHome'), to: '/', color: 'neutral', variant: 'outline', icon: 'i-lucide-house' },
				]" />

			<UPageList
				v-else
				divide>
				<UPageCard
					v-for="post in posts"
					:key="post._path"
					:to="post._path"
					:title="post.title || t('common.untitled')"
					:description="post.description"
					variant="ghost">
					<template #footer>
						<div class="flex flex-wrap gap-2">
							<UBadge
								v-if="post.date"
								color="neutral"
								variant="subtle"
								:label="post.date" />
							<UBadge
								v-if="post.tags?.length"
								color="primary"
								variant="soft"
								:label="`#${post.tags[0]}`" />
						</div>
					</template>
				</UPageCard>
			</UPageList>
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
	type BlogItem = {
		_path: string
		title?: string
		description?: string
		date?: string
		tags?: string[]
	}

	const { t } = useI18n()
	useHead(() => ({ title: t('nav.blog') }))

	const {
		data: items,
		pending: itemsPending,
		error: itemsError,
		refresh: refreshItems,
	} = await useAsyncData<BlogItem[]>('blog-list', async () => {
		return await $fetch<BlogItem[]>('/api/blog')
	})

	const posts = computed<BlogItem[]>(() => items.value ?? [])

	const retryItems = () => refreshItems()
</script>
