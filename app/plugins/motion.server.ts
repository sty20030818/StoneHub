export default defineNuxtPlugin((nuxtApp) => {
	// 提供 SSR 安全的空指令，避免 v-motion 在服务端渲染时报 getSSRProps 为空
	nuxtApp.vueApp.directive('motion', {
		getSSRProps: () => ({}),
	})
})
