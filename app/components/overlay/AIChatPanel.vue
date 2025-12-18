<template>
	<USlideover
		v-model:open="open"
		:close="false"
		side="right">
		<template #content>
			<section :aria-label="t('ai.a11y.chat')">
				<header>
					<h2>{{ t('ai.title') }}</h2>
					<UButton
						type="button"
						color="neutral"
						variant="ghost"
						@click="open = false">
						{{ t('common.close') }}
					</UButton>
				</header>

				<section :aria-label="t('ai.a11y.messages')">
					<ul ref="chatBody">
						<li
							v-for="(msg, idx) in messages"
							:key="idx">
							<strong>{{ msg.role === 'user' ? t('ai.roles.user') : t('ai.roles.assistant') }}:</strong>
							<span>{{ msg.text }}</span>
						</li>
					</ul>
					<p v-if="isTyping">{{ t('ai.typing') }}</p>
				</section>

				<section :aria-label="t('ai.a11y.input')">
					<label for="ai-chat-input">{{ t('ai.inputLabel') }}</label>
					<UInput
						id="ai-chat-input"
						v-model="chatInput"
						type="text"
						:placeholder="t('ai.placeholder')"
						@keydown.enter="sendChat" />
					<UButton
						type="button"
						color="neutral"
						variant="ghost"
						:disabled="!chatInput.trim()"
						@click="sendChat">
						{{ t('ai.send') }}
					</UButton>
					<div>
						<UButton
							type="button"
							color="neutral"
							variant="ghost"
							@click="quickAsk(t('ai.quick.introPrompt'))">
							{{ t('ai.quick.intro') }}
						</UButton>
						<UButton
							type="button"
							color="neutral"
							variant="ghost"
							@click="quickAsk(t('ai.quick.stackPrompt'))">
							{{ t('ai.quick.stack') }}
						</UButton>
					</div>
				</section>
			</section>
		</template>
	</USlideover>
</template>

<script setup lang="ts">
	type Message = {
		role: 'user' | 'assistant'
		text: string
	}

	const { t } = useI18n()

	const props = defineProps<{
		visible: boolean
	}>()

	const emit = defineEmits<{
		close: []
	}>()

	const open = computed({
		get: () => props.visible,
		set: (value) => {
			if (!value && props.visible) emit('close')
		},
	})

	const chatBody = ref<HTMLElement | null>(null)
	const chatInput = ref('')
	const isTyping = ref(false)
	const messages = ref<Message[]>([
		{
			role: 'assistant',
			text: t('ai.greeting'),
		},
	])

	const quickAsk = (text: string) => {
		chatInput.value = text
		sendChat()
	}

	const buildReply = (text: string) => {
		const lower = text.toLowerCase()
		if (
			lower.includes('stonehub') ||
			lower.includes('project') ||
			lower.includes('项目') ||
			lower.includes('intro') ||
			lower.includes('介绍')
		) {
			return t('ai.reply.about')
		}
		if (lower.includes('技术') || lower.includes('stack')) {
			return t('ai.reply.stack')
		}
		if (lower.includes('喜欢') || lower.includes('爱')) {
			return t('ai.reply.likes')
		}
		if (lower.includes('你好') || lower.includes('hi')) {
			return t('ai.reply.hello')
		}
		return t('ai.reply.fallback')
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
