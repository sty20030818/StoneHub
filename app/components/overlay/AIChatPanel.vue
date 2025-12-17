<template>
	<Teleport to="body">
		<section
			v-if="visible"
			aria-label="AI 聊天"
			role="dialog"
			aria-modal="true">
			<header>
				<h2>AI 石头鱼</h2>
				<button
					type="button"
					@click="handleClose">
					关闭
				</button>
			</header>

			<section aria-label="消息列表">
				<ul ref="chatBody">
					<li
						v-for="(msg, idx) in messages"
						:key="idx">
						<strong>{{ msg.role === 'user' ? '你' : 'AI' }}：</strong>
						<span>{{ msg.text }}</span>
					</li>
				</ul>
				<p v-if="isTyping">AI 正在输入…</p>
			</section>

			<section aria-label="输入区">
				<label for="ai-chat-input">输入</label>
				<input
					id="ai-chat-input"
					v-model="chatInput"
					type="text"
					placeholder="问我关于 Nuxt 4 或技术栈的问题…"
					@keydown.enter="sendChat" />
				<button
					type="button"
					:disabled="!chatInput.trim()"
					@click="sendChat">
					发送
				</button>
				<div>
					<button
						type="button"
						@click="quickAsk('介绍 StoneHub')">
						介绍 StoneHub
					</button>
					<button
						type="button"
						@click="quickAsk('技术栈是什么')">
						技术栈
					</button>
				</div>
			</section>
		</section>
	</Teleport>
</template>

<script setup lang="ts">
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

	const chatBody = ref<HTMLElement | null>(null)
	const chatInput = ref('')
	const isTyping = ref(false)
	const messages = ref<Message[]>([
		{
			role: 'assistant',
			text: '你好呀！我是 AI 石头鱼。你可以问我关于这个项目的技术细节，或者我（石头鱼本人）的开发经历。',
		},
	])

	const quickAsk = (text: string) => {
		chatInput.value = text
		sendChat()
	}

	const buildReply = (text: string) => {
		const lower = text.toLowerCase()
		if (lower.includes('stonehub') || lower.includes('项目') || lower.includes('介绍')) {
			return 'StoneHub 是一个基于 Nuxt 4 的个人站点，包含首页、Projects、Blog、Now、Links，并使用 Nuxt Content 管理内容。'
		}
		if (lower.includes('技术') || lower.includes('stack')) {
			return '核心技术栈：Vue 3 / Nuxt 4 / TypeScript / Node.js / @nuxt/content / @nuxt/ui。'
		}
		if (lower.includes('喜欢') || lower.includes('爱')) {
			return '我喜欢写代码，喜欢搞 Web OS 项目，也爱喝咖啡。'
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
