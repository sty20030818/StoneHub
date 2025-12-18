<template>
	<UPage>
		<UPageHeader
			headline="Blog"
			title="思维碎片"
			description="文章来自 @nuxt/content。" />

		<UPageBody>
			<UAlert
				v-if="itemsError"
				title="文章列表加载失败"
				:description="itemsError.message || '请检查网络后重试。'"
				color="neutral"
				variant="subtle"
				icon="i-lucide-triangle-alert">
				<template #actions>
					<UButton
						color="neutral"
						variant="outline"
						icon="i-lucide-refresh-cw"
						@click="retryItems">
						重试
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
				title="暂未发布文章"
				description="我正在整理内容，敬请期待。"
				:actions="[{ label: '返回首页', to: '/', color: 'neutral', variant: 'outline', icon: 'i-lucide-house' }]" />

			<UPageList
				v-else
				divide>
				<UPageCard
					v-for="post in posts"
					:key="post._path"
					:to="post._path"
					:title="post.title || 'Untitled'"
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

	useHead({ title: '博客' })

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
