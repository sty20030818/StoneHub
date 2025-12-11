/* eslint-disable vue/no-v-html */
<template>
	<Teleport to="body">
		<!-- 遮罩层：点击关闭 -->
		<div
			v-if="visible"
			class="fixed inset-0 z-90 bg-black/20 backdrop-blur-sm"
			@click="handleClose" />

		<transition
			:enter-active-class="prefersReduce ? 'transition duration-180 ease-out' : 'transition duration-500 ease-out'"
			:enter-from-class="prefersReduce ? 'translate-x-0 opacity-0' : 'translate-x-full opacity-0'"
			:enter-to-class="prefersReduce ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100'"
			:leave-active-class="prefersReduce ? 'transition duration-180 ease-in' : 'transition duration-300 ease-in-out'"
			:leave-from-class="prefersReduce ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100'"
			:leave-to-class="prefersReduce ? 'translate-x-0 opacity-0' : 'translate-x-full opacity-0'">
			<div
				v-if="visible"
				class="fixed top-2 bottom-2 right-2 z-100 w-full md:w-[420px] bg-white/85 backdrop-blur-2xl shadow-2xl rounded-4xl border border-white flex flex-col overflow-hidden">
				<!-- Header -->
				<div class="p-6 bg-linear-to-b from-white/80 to-transparent flex justify-between items-center">
					<div class="flex items-center gap-4">
						<div
							class="relative w-12 h-12 rounded-2xl bg-linear-to-tr from-sky-400 to-pink-400 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-pink-200">
							<Icon
								name="lucide:bot"
								class="w-6 h-6" />
							<span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
						</div>
						<div>
							<h3 class="font-bold text-(--text-primary)">AI 石头鱼</h3>
							<p class="text-xs text-(--text-secondary) font-medium">Powered by Nuxt AI</p>
						</div>
					</div>
					<button
						type="button"
						class="w-10 h-10 rounded-full bg-(--surface-variant) hover:bg-(--surface-strong) hover:scale-105 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
						@click.stop="handleClose">
						<Icon
							name="lucide:x"
							class="w-5 h-5 text-(--text-secondary)" />
					</button>
				</div>

				<!-- Messages -->
				<div
					ref="chatBody"
					class="flex-1 overflow-y-auto p-4 space-y-6 bg-white/60 no-scrollbar">
					<div
						v-for="(msg, idx) in messages"
						:key="idx"
						:class="['flex w-full animate-slide-up-fade', msg.role === 'user' ? 'justify-end' : 'justify-start']">
						<div
							:class="[
								'max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm backdrop-blur-sm border',
								msg.role === 'user'
									? 'bg-(--color-primary)/90 text-white rounded-tr-sm border-transparent shadow-(--shadow-glow)'
									: 'bg-white/80 text-(--text-secondary) rounded-tl-sm border-white shadow-(--shadow-soft)',
							]"
							v-html="msg.text" />
					</div>
					<div
						v-if="isTyping"
						class="flex justify-start animate-fade-in">
						<div class="bg-white/60 border border-white p-4 rounded-2xl rounded-tl-sm flex gap-1.5 shadow-sm">
							<span class="w-1.5 h-1.5 bg-(--text-secondary) rounded-full animate-bounce" />
							<span class="w-1.5 h-1.5 bg-(--text-secondary) rounded-full animate-bounce delay-100" />
							<span class="w-1.5 h-1.5 bg-(--text-secondary) rounded-full animate-bounce delay-200" />
						</div>
					</div>
				</div>

				<!-- Input -->
				<div class="p-4 bg-white/70 border-t border-white">
					<div class="relative mb-3 group">
						<input
							id="ai-chat-input"
							v-model="chatInput"
							type="text"
							placeholder="问我关于 Nuxt 4 或技术栈的问题..."
							class="w-full pl-5 pr-14 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm text-(--text-secondary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition-all group-hover:shadow-md"
							@keydown.enter="sendChat" />
						<button
							class="absolute right-2 top-2 w-10 h-10 bg-(--color-primary) text-white rounded-full flex items-center justify-center shadow-lg shadow-sky-200 hover:scale-105 active:scale-90 transition-all disabled:opacity-50 disabled:scale-100"
							:disabled="!chatInput.trim()"
							@click="sendChat">
							<Icon
								name="lucide:send"
								class="w-4 h-4" />
						</button>
					</div>
					<div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
						<button
							class="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-100 hover:border-pink-200 hover:text-pink-600 hover:shadow-sm text-(--text-secondary) text-xs font-medium rounded-lg transition-all active:scale-95"
							@click="quickAsk('介绍 StoneHub')">
							✨ 介绍 StoneHub
						</button>
						<button
							class="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-100 hover:border-sky-200 hover:text-sky-600 hover:shadow-sm text-(--text-secondary) text-xs font-medium rounded-lg transition-all active:scale-95"
							@click="quickAsk('技术栈是什么')">
							🛠️ 技术栈
						</button>
					</div>
				</div>
			</div>
		</transition>
	</Teleport>
</template>

<script setup lang="ts">
	import { usePreferredReducedMotion } from '@vueuse/core'
	type Message = {
		role: 'user' | 'assistant'
		text: string
	}

	const props = defineProps<{
		visible: boolean
	}>()

	const emit = defineEmits<{
		close: []
	}>()

	const handleClose = () => {
		emit('close')
	}

	const chatBody = ref<HTMLDivElement | null>(null)
	const chatInput = ref('')
	const isTyping = ref(false)
	const prefersReduce = usePreferredReducedMotion()
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
