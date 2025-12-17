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
					<Icon
						name="lucide:terminal"
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
					class="text-primary hover:underline font-medium">
					Vite
				</a>
				<span>&</span>
				<a
					href="https://nuxt.com"
					target="_blank"
					class="text-secondary hover:underline font-medium">
					Nuxt
				</a>
			</div>

			<!-- 分隔线 -->
			<div class="w-px h-5 bg-slate-200 hidden md:block" />

			<!-- 运行时长 -->
			<div class="hidden md:flex items-center gap-1.5 text-slate-400 text-xs">
				<Icon
					name="lucide:clock"
					class="size-3" />
				<span>已运行 {{ runningDays }} 天</span>
			</div>

			<!-- 分隔线 -->
			<div class="w-px h-5 bg-slate-200 hidden lg:block" />

			<!-- 备案号 -->
			<a
				href="https://beian.miit.gov.cn/"
				target="_blank"
				class="hidden lg:block text-slate-400 text-xs hover:text-primary transition-colors">
				京ICP备XXXXXXXX号
			</a>

			<!-- 分隔线 -->
			<div class="w-px h-5 bg-slate-200" />

			<!-- 社交图标 -->
			<div class="flex items-center gap-1">
				<!-- 微信 - Hover Tooltip -->
				<div class="relative group">
					<button
						class="flex items-center justify-center size-8 rounded-full text-slate-400 hover:bg-[#07C160]/10 hover:text-[#07C160] transition-all"
						title="微信">
						<Icon
							name="simple-icons:wechat"
							class="size-4" />
					</button>
					<!-- Tooltip -->
					<div
						class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
						<div class="bg-surface rounded-2xl p-4 shadow-2xl border border-white/50 flex flex-col items-center gap-2">
							<div class="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center">
								<span class="text-slate-400 text-xs">二维码</span>
							</div>
							<p class="text-slate-600 text-xs font-medium">扫码添加微信</p>
						</div>
						<!-- 箭头 -->
						<div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-surface" />
					</div>
				</div>
				<!-- QQ -->
				<a
					href="https://qm.qq.com/q/your-qq-group"
					target="_blank"
					class="flex items-center justify-center size-8 rounded-full text-slate-400 hover:bg-[#12B7F5]/10 hover:text-[#12B7F5] transition-all"
					title="QQ">
					<Icon
						name="simple-icons:qq"
						class="size-4" />
				</a>
				<!-- Bilibili -->
				<a
					href="https://space.bilibili.com/your-uid"
					target="_blank"
					class="flex items-center justify-center size-8 rounded-full text-slate-400 hover:bg-[#FB7299]/10 hover:text-[#FB7299] transition-all"
					title="Bilibili">
					<Icon
						name="simple-icons:bilibili"
						class="size-4" />
				</a>
				<!-- GitHub -->
				<a
					href="https://github.com"
					target="_blank"
					class="flex items-center justify-center size-8 rounded-full text-slate-400 hover:bg-surface-container hover:text-slate-800 transition-all"
					title="GitHub">
					<Icon
						name="lucide:github"
						class="size-4" />
				</a>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
	// 悬浮岛屿式页脚组件

	// 计算运行天数（从网站上线日期开始）
	const launchDate = new Date('2025-01-01') // 替换为你的上线日期
	const runningDays = computed(() => {
		const now = new Date()
		const diff = now.getTime() - launchDate.getTime()
		return Math.floor(diff / (1000 * 60 * 60 * 24))
	})
</script>
