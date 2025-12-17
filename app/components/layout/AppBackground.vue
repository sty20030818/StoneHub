<template>
	<div class="fixed inset-0 pointer-events-none z-0">
		<!-- 基础渐变背景 -->
		<div
			class="absolute inset-0"
			:style="{
				backgroundColor: '#fdfbff',
				backgroundImage: `
					radial-gradient(ellipse 80% 60% at 5% 10%, rgba(79, 182, 244, 0.45) 0%, transparent 55%),
					radial-gradient(ellipse 70% 80% at 95% 90%, rgba(255, 128, 171, 0.40) 0%, transparent 55%),
					radial-gradient(ellipse 50% 50% at 85% 15%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
					radial-gradient(ellipse 60% 40% at 15% 85%, rgba(251, 146, 180, 0.30) 0%, transparent 45%),
					radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06) 0%, transparent 70%)
				`,
			}" />

		<!-- 动态浮动层 -->
		<div class="floating-layer absolute inset-0" />
	</div>
</template>

<script setup lang="ts">
	// 背景组件 - 处理全局 Mesh 渐变背景
</script>

<style scoped>
	.floating-layer {
		background:
			radial-gradient(ellipse 45% 35% at 70% 30%, rgba(79, 182, 244, 0.18) 0%, transparent 55%),
			radial-gradient(ellipse 40% 45% at 30% 70%, rgba(255, 128, 171, 0.18) 0%, transparent 55%);
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
