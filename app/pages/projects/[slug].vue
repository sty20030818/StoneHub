<template>
	<div class="max-w-4xl mx-auto py-10">
		<ContentDoc v-slot="{ doc }">
			<article class="prose prose-lg dark:prose-invert prose-primary max-w-none">
				<!-- 头部 -->
				<header class="mb-10 text-center flex flex-col items-center gap-6">
					<NuxtLink
						to="/projects"
						class="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium mb-4">
						<Icon
							name="lucide:arrow-left"
							class="w-4 h-4" />
						返回项目列表
					</NuxtLink>

					<h1 class="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-0">{{ doc.title }}</h1>
					<p class="text-xl text-slate-500 max-w-2xl">{{ doc.description }}</p>

					<div
						v-if="doc.image"
						class="w-full aspect-video rounded-3xl overflow-hidden shadow-lg mt-6">
						<NuxtImg
							:src="doc.image"
							:alt="doc.title"
							class="w-full h-full object-cover" />
					</div>

					<div class="flex flex-wrap gap-2 justify-center mt-2">
						<span
							v-for="tag in doc.tags || []"
							:key="tag"
							class="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-slate-600">
							{{ tag }}
						</span>
					</div>
				</header>

				<!-- 内容 -->
				<div class="bg-surface/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/50 shadow-sm">
					<ContentRenderer :value="doc" />
				</div>
			</article>
		</ContentDoc>
	</div>
</template>

<script setup lang="ts">
	// 项目详情页
</script>
