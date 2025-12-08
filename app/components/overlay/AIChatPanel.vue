<script setup lang="ts">
	type Message = {
		role: 'user' | 'assistant'
		text: string
	}

	defineProps<{
		visible: boolean
	}>()

	const emit = defineEmits<{
		(e: 'close'): void
	}>()

	const messages = ref<Message[]>([
		{
			role: 'assistant',
			text: '嗨，我是 AI 石头鱼，可以问我技术栈、最近在做什么，或者想看的项目。',
		},
	])

	const input = ref('')

	const fakeReply = (question: string) => {
		const q = question.toLowerCase()
		if (q.includes('技术') || q.includes('stack') || q.includes('技术栈')) {
			return '常用栈：Nuxt 4、Vue 3、Tailwind、@nuxt/content、LLM + Web 集成。'
		}
		if (q.includes('项目') || q.includes('project')) {
			return 'StoneHub 正在构建：动画首页、终端模式、AI 聊天、博客与项目列表。'
		}
		if (q.includes('stoneos')) {
			return 'StoneOS 是我的 Web OS 实验，后续会挂到 links 与 open os 命令。'
		}
		return '收到！后续可接入真实 /api/chat，现在是本地关键词假回复。'
	}

	const handleSend = () => {
		const value = input.value.trim()
		if (!value) return

		messages.value.push({ role: 'user', text: value })
		input.value = ''

		const reply = fakeReply(value)
		messages.value.push({ role: 'assistant', text: reply })
	}
</script>

<template>
	<USlideover
		:model-value="visible"
		side="right"
		overlay
		class="w-full max-w-md border-l border-white/10 bg-surface/90 backdrop-blur-lg"
		@update:model-value="(val: boolean) => !val && emit('close')"
		:ui="{
			overlay: 'bg-black/60',
		}">
		<header class="flex items-center justify-between border-b border-white/10 px-5 py-4">
			<div class="flex items-center gap-2">
				<span class="text-xl">🤖</span>
				<div>
					<p class="text-sm font-semibold">AI 石头鱼</p>
					<p class="text-xs text-slate-400">本地假回复，后续可接入 /api/chat</p>
				</div>
			</div>
			<UButton
				variant="ghost"
				icon="i-heroicons-x-mark-20-solid"
				@click="emit('close')">
				关闭
			</UButton>
		</header>

		<div class="flex h-[calc(100%-140px)] flex-col">
			<div class="flex-1 space-y-3 overflow-y-auto px-5 py-4">
				<div
					v-for="(msg, idx) in messages"
					:key="idx"
					class="flex"
					:class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
					<UCard
						class="max-w-[80%]"
						:class="msg.role === 'user' ? 'bg-primary-500 text-white' : 'bg-white/10 text-slate-100'"
						:ui="{
							body: 'px-4 py-2 text-sm',
						}">
						{{ msg.text }}
					</UCard>
				</div>
			</div>

			<div class="border-t border-white/10 px-5 py-4">
				<div class="flex items-center gap-2">
					<UInput
						v-model="input"
						variant="outline"
						icon="i-heroicons-sparkles"
						placeholder="问点什么..."
						@keydown.enter.prevent="handleSend" />
					<UButton
						icon="i-heroicons-paper-airplane-20-solid"
						@click="handleSend">
						发送
					</UButton>
				</div>
			</div>
		</div>
	</USlideover>
</template>
