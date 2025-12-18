<template>
	<UPage>
		<UPageBody class="flex flex-col gap-8 pt-12">
			<HomeHeroSection />

			<UCard
				v-if="homeDataError"
				class="island-card mx-auto w-full max-w-5xl rounded-4xl"
				:ui="{
					root: 'overflow-hidden',
					header: 'p-6',
					body: 'px-6 pb-0 pt-0',
					footer: 'px-6 pb-6 pt-4',
				}">
				<template #header>
					<div class="flex items-center gap-4">
						<div class="flex items-center justify-center size-10 rounded-full bg-secondary-container/60 text-secondary">
							<UIcon
								name="i-lucide-triangle-alert"
								class="size-5" />
						</div>
						<div class="min-w-0">
							<div class="text-on-background font-bold">{{ t('home.dataError.title') }}</div>
							<div class="text-on-background/70 text-sm">{{ t('home.dataError.description') }}</div>
						</div>
					</div>
				</template>

				<template #footer>
					<div class="flex flex-wrap gap-2">
						<UButton
							color="neutral"
							variant="outline"
							icon="i-lucide-refresh-cw"
							@click="retryHomeData">
							{{ t('common.retry') }}
						</UButton>
						<UButton
							to="/projects"
							color="neutral"
							variant="ghost"
							icon="i-lucide-folder"
							:label="t('home.dataError.actions.projects')" />
						<UButton
							to="/blog"
							color="neutral"
							variant="ghost"
							icon="i-lucide-book"
							:label="t('home.dataError.actions.blog')" />
					</div>
				</template>
			</UCard>

			<template v-else>
				<div
					v-if="projectsPending"
					class="relative mx-auto w-full">
					<div class="flex items-center justify-between mb-8 px-4">
						<USkeleton class="h-9 w-40" />
						<USkeleton class="h-10 w-24 rounded-full" />
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4">
						<USkeleton
							v-for="i in 8"
							:key="i"
							class="h-56 rounded-4xl" />
					</div>
				</div>

				<UEmpty
					v-else-if="homeProjects.length === 0"
					variant="naked"
					size="lg"
					class="island-card mx-auto w-full max-w-5xl rounded-4xl"
					icon="i-lucide-folder-open"
					:title="t('home.emptyProjects.title')"
					:description="t('home.emptyProjects.description')"
					:ui="{
						root: '!p-8',
						title: 'text-on-background font-bold',
						description: 'text-on-background/70',
						avatar: 'bg-primary-container/60 text-primary',
					}"
					:actions="[
						{
							label: t('home.emptyProjects.actions.projects'),
							to: '/projects',
							color: 'primary',
							variant: 'solid',
							icon: 'i-lucide-arrow-right',
						},
						{
							label: t('common.backHome'),
							to: '/',
							color: 'neutral',
							variant: 'ghost',
							icon: 'i-lucide-house',
						},
					]" />

				<HomeProjectScroll
					v-else
					:projects="homeProjects" />
			</template>

			<!-- 由全局状态控制的弹出层 -->
			<OverlayTerminalOverlay
				:visible="isTerminalOpen"
				:projects="overlayProjects"
				:posts="overlayPosts"
				@open-ai="openAI"
				@navigate="handleNavigate"
				@close="toggleTerminal" />
			<OverlayAIChatPanel
				:visible="isAIOpen"
				@close="toggleAI" />
		</UPageBody>
	</UPage>
</template>

<script setup lang="ts">
	import OverlayAIChatPanel from '~/components/overlay/AIChatPanel.vue'
	import OverlayTerminalOverlay from '~/components/overlay/TerminalOverlay.vue'

	type Project = {
		title: string
		description: string
		year?: string
		tags?: string[]
		icon?: string
		image?: string
		link?: string
	}
	type Post = { title?: string; date?: string; slug?: string; description?: string; _path?: string }

	const { t } = useI18n()
	useHead(() => ({ title: t('nav.home') }))

	// 全局 UI 状态
	const { isTerminalOpen, isAIOpen, toggleTerminal, toggleAI } = useAppUiState()

	// 数据获取
	const {
		data: projects,
		pending: projectsPending,
		error: projectsError,
		refresh: refreshProjects,
	} = await useAsyncData<Project[]>('home-projects', async () => {
		return await $fetch<Project[]>('/api/home/projects')
	})

	const {
		data: posts,
		error: postsError,
		refresh: refreshPosts,
	} = await useAsyncData<Post[]>('home-posts', async () => {
		return await $fetch<Post[]>('/api/home/posts')
	})

	// 计算属性，传递给子组件
	const homeProjects = computed(() => projects.value || [])

	const overlayProjects = computed(() =>
		(projects.value || []).map((p) => ({ title: p.title || '', desc: p.description || '' })),
	)
	const overlayPosts = computed(() =>
		(posts.value || []).map((p) => ({ title: p.title || '', date: p.date || '', slug: p.slug || p._path || '' })),
	)

	const homeDataError = computed(() => Boolean(projectsError.value || postsError.value))

	const retryHomeData = async () => {
		await Promise.all([refreshProjects(), refreshPosts()])
	}

	// 事件处理
	const openAI = () => {
		if (!isAIOpen.value) toggleAI()
	}

	const handleNavigate = (path: string) => {
		navigateTo(path)
		if (isTerminalOpen.value) toggleTerminal()
	}
</script>
