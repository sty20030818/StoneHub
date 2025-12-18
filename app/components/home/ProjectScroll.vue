<template>
	<!-- 精选项目区 - 简洁悬浮设计 -->
	<section class="relative mx-auto w-full">
		<!-- 头部 -->
		<div class="flex items-center justify-between mb-8 px-4">
			<h2 class="text-on-background text-2xl md:text-3xl font-bold tracking-tight font-display">
				{{ t('home.featuredProjects.title') }}
			</h2>
			<UButton
				to="/projects"
				color="neutral"
				variant="ghost"
				class="glow-primary flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-bold">
				{{ t('common.viewAll') }}
				<UIcon
					name="i-lucide-arrow-right"
					class="w-4 h-4" />
			</UButton>
		</div>

		<!-- 项目卡片网格 - 四列 -->
		<UPageGrid class="sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4">
			<UPageCard
				v-for="project in projects"
				:key="project.title"
				:to="project.link || undefined"
				variant="naked"
				class="project-card group flex flex-col rounded-4xl! overflow-hidden"
				:ui="{ container: '!p-0' }">
				<div class="flex flex-col">
					<!-- 图片区域 -->
					<div class="relative aspect-video overflow-hidden">
						<NuxtImg
							v-if="project.image"
							:src="project.image"
							:alt="project.title"
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy" />
						<div
							v-else
							class="w-full h-full flex items-center justify-center bg-linear-to-br from-primary-container/50 to-secondary-container/50">
							<UIcon
								name="i-lucide-folder"
								class="w-12 h-12 text-primary/40" />
						</div>
						<!-- 悬浮遮罩 -->
						<div
							class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</div>

					<!-- 内容区域 -->
					<div class="flex flex-col gap-2 p-6">
						<div class="flex items-start justify-between gap-3">
							<h3
								class="text-on-background text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-1">
								{{ project.title }}
							</h3>
							<div
								class="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-container/50 text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
								<UIcon
									name="i-lucide-arrow-up-right"
									class="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
							</div>
						</div>
						<p class="text-on-background/70 text-sm leading-relaxed line-clamp-2">
							{{ project.description }}
						</p>
					</div>
				</div>
			</UPageCard>
		</UPageGrid>
	</section>
</template>

<script setup lang="ts">
	const { t } = useI18n()

	interface Project {
		title: string
		description: string
		image?: string
		link?: string
		tags?: string[]
	}

	defineProps<{
		projects: Project[]
	}>()
</script>
