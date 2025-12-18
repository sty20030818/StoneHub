<template>
	<!-- 悬浮式岛屿 Footer -->
	<div class="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
		<footer
			class="pointer-events-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-3 rounded-full bg-surface/80 backdrop-blur-xl border border-white/50 shadow-lg ring-1 ring-white/60 transition-all hover:shadow-xl">
			<!-- 品牌 Logo -->
			<NuxtLink
				to="/"
				class="flex items-center gap-2 group">
				<div
					class="flex items-center justify-center size-8 rounded-full bg-linear-to-br from-primary to-secondary text-white text-xs font-bold shadow-sm">
					<UIcon
						name="i-lucide-terminal"
						class="size-4" />
				</div>
				<span class="text-slate-800 text-sm font-bold tracking-tight hidden sm:block">StoneHub</span>
			</NuxtLink>

			<!-- 分隔线 -->
			<div class="w-px h-5 bg-slate-200 hidden sm:block" />

			<!-- 版权 + 版本 -->
			<div class="hidden sm:flex items-center gap-2 text-slate-500 text-xs">
				<span>© {{ new Date().getFullYear() }} StoneFish</span>
				<span class="text-slate-300">·</span>
				<span class="text-primary font-medium">v1.0.0</span>
			</div>

			<!-- 分隔线 -->
			<div class="w-px h-5 bg-slate-200 hidden md:block" />

			<!-- Powered by -->
			<div class="hidden md:flex items-center gap-1.5 text-slate-400 text-xs">
				<span>Powered by</span>
				<a
					href="https://vite.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:underline font-medium">
					Vite
				</a>
				<span>&</span>
				<a
					href="https://nuxt.com"
					target="_blank"
					rel="noopener noreferrer"
					class="text-secondary hover:underline font-medium">
					Nuxt
				</a>
			</div>

			<!-- 分隔线 -->
			<div class="w-px h-5 bg-slate-200 hidden md:block" />

			<!-- 运行时长 -->
			<div class="hidden md:flex items-center gap-1.5 text-slate-400 text-xs">
				<UIcon
					name="i-lucide-clock"
					class="size-3" />
				<span>已运行 {{ runningDays }} 天</span>
			</div>

			<!-- 分隔线 -->
			<div class="w-px h-5 bg-slate-200 hidden lg:block" />

			<!-- 备案号 -->
			<a
				href="https://beian.miit.gov.cn/"
				target="_blank"
				rel="noopener noreferrer"
				class="hidden lg:block text-slate-400 text-xs hover:text-primary transition-colors">
				京ICP备XXXXXXXX号
			</a>

			<!-- 分隔线 -->
			<div class="w-px h-5 bg-slate-200" />

			<!-- 社交图标 -->
			<div class="flex items-center gap-1">
				<!-- 微信 -->
				<UPopover
					mode="hover"
					arrow
					:content="{ side: 'top', sideOffset: 12 }"
					:ui="{ content: 'bg-surface rounded-2xl shadow-2xl border border-white/50', arrow: 'fill-surface' }">
					<UButton
						color="neutral"
						variant="ghost"
						class="p-0! size-8 rounded-full text-slate-400 hover:bg-[#07C160]/10 hover:text-[#07C160] transition-all"
						aria-label="微信"
						title="微信">
						<UIcon
							name="i-simple-icons-wechat"
							class="size-4" />
					</UButton>

					<template #content>
						<div class="p-4 flex flex-col items-center gap-2">
							<div class="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center">
								<span class="text-slate-400 text-xs">二维码</span>
							</div>
							<p class="text-slate-600 text-xs font-medium">扫码添加微信</p>
						</div>
					</template>
				</UPopover>
				<!-- QQ -->
				<UButton
					to="https://qm.qq.com/q/your-qq-group"
					target="_blank"
					rel="noopener noreferrer"
					color="neutral"
					variant="ghost"
					class="p-0! flex items-center justify-center size-8 rounded-full text-slate-400 hover:bg-[#12B7F5]/10 hover:text-[#12B7F5] transition-all"
					aria-label="QQ"
					title="QQ">
					<UIcon
						name="i-simple-icons-qq"
						class="size-4" />
				</UButton>
				<!-- Bilibili -->
				<UButton
					to="https://space.bilibili.com/your-uid"
					target="_blank"
					rel="noopener noreferrer"
					color="neutral"
					variant="ghost"
					class="p-0! flex items-center justify-center size-8 rounded-full text-slate-400 hover:bg-[#FB7299]/10 hover:text-[#FB7299] transition-all"
					aria-label="Bilibili"
					title="Bilibili">
					<UIcon
						name="i-simple-icons-bilibili"
						class="size-4" />
				</UButton>
				<!-- GitHub -->
				<UButton
					to="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					color="neutral"
					variant="ghost"
					class="p-0! flex items-center justify-center size-8 rounded-full text-slate-400 hover:bg-surface-container hover:text-slate-800 transition-all"
					aria-label="GitHub"
					title="GitHub">
					<UIcon
						name="i-lucide-github"
						class="size-4" />
				</UButton>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
	// 悬浮岛屿式页脚组件

	// 计算运行天数(从网站上线日期开始)
	const launchDate = new Date('2025-01-01') // 替换为你的上线日期
	const runningDays = computed(() => {
		const now = new Date()
		const diff = now.getTime() - launchDate.getTime()
		return Math.floor(diff / (1000 * 60 * 60 * 24))
	})
</script>
