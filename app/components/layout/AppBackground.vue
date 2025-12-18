<template>
	<div class="fixed inset-0 pointer-events-none z-0">
		<!-- 基础渐变背景 -->
		<div class="absolute inset-0 mesh-base" />

		<!-- 动态浮动层 -->
		<div class="mesh-float absolute inset-0" />
	</div>
</template>

<script setup lang="ts">
	// 背景组件 - 处理全局 Mesh 渐变背景
</script>

<style scoped>
	.mesh-base {
		background-color: var(--color-background);
		background-image:
			radial-gradient(
				ellipse 80% 60% at 5% 10%,
				color-mix(in srgb, var(--color-primary) 45%, transparent) 0%,
				transparent 55%
			),
			radial-gradient(
				ellipse 70% 80% at 95% 90%,
				color-mix(in srgb, var(--color-secondary) 40%, transparent) 0%,
				transparent 55%
			),
			radial-gradient(ellipse 50% 50% at 85% 15%, color-mix(in srgb, #8b5cf6 25%, transparent) 0%, transparent 50%),
			radial-gradient(ellipse 60% 40% at 15% 85%, color-mix(in srgb, #fb92b4 30%, transparent) 0%, transparent 45%),
			radial-gradient(
				circle at 50% 50%,
				color-mix(in srgb, var(--color-on-background) 6%, transparent) 0%,
				transparent 70%
			);
	}

	.mesh-float {
		background:
			radial-gradient(
				ellipse 45% 35% at 70% 30%,
				color-mix(in srgb, var(--color-primary) 18%, transparent) 0%,
				transparent 55%
			),
			radial-gradient(
				ellipse 40% 45% at 30% 70%,
				color-mix(in srgb, var(--color-secondary) 18%, transparent) 0%,
				transparent 55%
			);
		animation: meshFloat 20s ease-in-out infinite alternate;
	}

	@keyframes meshFloat {
		0% {
			transform: translate(0, 0) scale(1);
			opacity: 0.6;
		}
		50% {
			transform: translate(2%, -2%) scale(1.02);
			opacity: 0.8;
		}
		100% {
			transform: translate(-1%, 1%) scale(1);
			opacity: 0.6;
		}
	}
</style>
