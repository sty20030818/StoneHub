/* eslint-disable vue/no-v-html */
<script setup lang="ts">
	type Message = {
		role: 'user' | 'assistant'
		text: string
	}

	const props = defineProps<{
		visible: boolean
	}>()

	const emit = defineEmits<{
		(e: 'close'): void
	}>()

	const chatBody = ref<HTMLDivElement | null>(null)
	const chatInput = ref('')
	const isTyping = ref(false)
	const messages = ref<Message[]>([
		{
			role: 'assistant',
			text: '你好呀！我是 AI 石头鱼 🐟。你可以问我关于这个项目的技术细节，或者我（石头鱼本人）的开发经历。',
		},
	])

	const quickAsk = (text: string) => {
		chatInput.value = text
		sendChat()
	}

	const buildReply = (text: string) => {
		const lower = text.toLowerCase()
		if (lower.includes('stonehub') || lower.includes('项目') || lower.includes('介绍')) {
			return 'StoneHub 是一个基于 <strong>Nuxt 4</strong> 的现代化个人站。它不仅仅是博客，还是一个技术游乐场。我用了 Tailwind CSS 来做样式，并接入了 Nuxt Content 来管理文章。'
		}
		if (lower.includes('技术') || lower.includes('stack')) {
			return '核心技术栈：<br>• <strong>Vue 3 & Nuxt 4</strong><br>• <strong>Tailwind CSS</strong><br>• <strong>TypeScript</strong><br>• <strong>Node.js</strong>'
		}
		if (lower.includes('喜欢') || lower.includes('爱')) {
			return '我喜欢写代码，喜欢天蓝色和淡粉色，还喜欢搞 Web OS 项目，也爱喝咖啡 ☕️。'
		}
		if (lower.includes('你好') || lower.includes('hi')) {
			return '嗨！很高兴见到你。我是石头鱼的数字分身，聊点技术？'
		}
		return '这个问题还没索引到本地… 试试问“技术栈”或“介绍 StoneHub”吧。'
	}

	const scrollToBottom = () => {
		nextTick(() => {
			if (chatBody.value) {
				chatBody.value.scrollTop = chatBody.value.scrollHeight
			}
		})
	}

	const sendChat = () => {
		const text = chatInput.value.trim()
		if (!text) return

		messages.value.push({ role: 'user', text })
		chatInput.value = ''
		isTyping.value = true
		scrollToBottom()

		setTimeout(
			() => {
				const reply = buildReply(text)
				isTyping.value = false
				messages.value.push({ role: 'assistant', text: reply })
				scrollToBottom()
			},
			900 + Math.random() * 400,
		)
	}

	watch(
		() => props.visible,
		(val) => {
			if (!val) {
				isTyping.value = false
				return
			}
			scrollToBottom()
			nextTick(() => {
				const inputEl = document.getElementById('ai-chat-input') as HTMLInputElement | null
				inputEl?.focus()
			})
		},
	)
</script>

<template>
	<transition
		enter-active-class="transition duration-500 ease-out"
		enter-from-class="translate-x-full"
		enter-to-class="translate-x-0"
		leave-active-class="transition duration-300 ease-in-out"
		leave-from-class="translate-x-0"
		leave-to-class="translate-x-full">
		<div
			v-if="visible"
			class="fixed top-0 right-0 z-50 h-full w-full md:w-[450px] bg-white/90 backdrop-blur-xl shadow-2xl flex flex-col border-l border-white/50">
			<!-- Header -->
			<div class="p-6 border-b border-slate-100 flex justify-between items-center bg-white/60">
				<div class="flex items-center gap-3">
					<div
						class="w-10 h-10 rounded-full bg-linear-to-tr from-sky-300 to-pink-300 flex items-center justify-center text-white font-bold text-lg shadow-sm">
						AI
					</div>
					<div>
						<h3 class="font-bold text-slate-800">AI 石头鱼</h3>
						<p class="text-xs text-green-500 flex items-center gap-1">
							<span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
							Online
						</p>
					</div>
				</div>
				<button
					class="p-2 hover:bg-slate-100 rounded-full transition-colors"
					@click="emit('close')">
					<Icon
						name="lucide:x"
						class="w-5 h-5 text-slate-500" />
				</button>
			</div>

			<!-- Messages -->
			<div
				ref="chatBody"
				class="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
				<div
					v-for="(msg, idx) in messages"
					:key="idx"
					:class="['flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start']">
					<div
						:class="[
							'max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed',
							msg.role === 'user'
								? 'bg-sky-500 text-white rounded-tr-none'
								: 'bg-white text-slate-700 rounded-tl-none border border-slate-100',
						]"
						v-html="msg.text" />
				</div>
				<div
					v-if="isTyping"
					class="flex justify-start">
					<div class="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex gap-1">
						<span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
						<span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
						<span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
					</div>
				</div>
			</div>

			<!-- Input -->
			<div class="p-4 bg-white border-t border-slate-100">
				<div class="relative">
					<input
						id="ai-chat-input"
						v-model="chatInput"
						type="text"
						placeholder="问我关于 Nuxt 4 或技术栈的问题..."
						class="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition-all text-sm"
						@keydown.enter="sendChat" />
					<button
						class="absolute right-2 top-2 p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50"
						:disabled="!chatInput.trim()"
						@click="sendChat">
						<Icon
							name="lucide:send"
							class="w-4 h-4" />
					</button>
				</div>
				<div class="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
					<button
						class="whitespace-nowrap px-3 py-1 bg-slate-100 hover:bg-pink-100 hover:text-pink-600 text-slate-500 text-xs rounded-full transition-colors"
						@click="quickAsk('介绍一下 StoneHub')">
						🤔 介绍一下 StoneHub
					</button>
					<button
						class="whitespace-nowrap px-3 py-1 bg-slate-100 hover:bg-sky-100 hover:text-sky-600 text-slate-500 text-xs rounded-full transition-colors"
						@click="quickAsk('技术栈是什么？')">
						🛠️ 技术栈是什么？
					</button>
				</div>
			</div>
		</div>
	</transition>
</template>
