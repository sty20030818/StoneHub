<template>
	<UModal
		v-model:open="open"
		:close="false">
		<template #content>
			<section :aria-label="t('terminal.a11y.terminal')">
				<header>
					<p>{{ t('terminal.headerPrompt') }}</p>
					<UButton
						type="button"
						color="neutral"
						variant="ghost"
						@click="open = false">
						{{ t('common.close') }}
					</UButton>
				</header>

				<section
					ref="terminalBody"
					:aria-label="t('terminal.a11y.output')"
					@click="focusInput">
					<div
						v-for="(entry, index) in terminalHistory"
						:key="index">
						<div v-if="entry.type === 'input'">
							<span>➜</span>
							<span>~</span>
							<span>{{ entry.content }}</span>
						</div>
						<pre v-else>{{ entry.content }}</pre>
					</div>
				</section>

				<section :aria-label="t('terminal.a11y.input')">
					<label for="terminal-cmd-input">{{ t('terminal.commandLabel') }}</label>
					<UInput
						id="terminal-cmd-input"
						ref="cmdInput"
						v-model="currentCmd"
						type="text"
						autocomplete="off"
						:placeholder="t('terminal.placeholder')"
						@keydown="handleInputKeydown" />
					<UButton
						type="button"
						color="neutral"
						variant="ghost"
						@click="executeCmd">
						{{ t('terminal.execute') }}
					</UButton>
				</section>
			</section>
		</template>
	</UModal>
</template>

<script setup lang="ts">
	type Entry = {
		type: 'input' | 'output'
		content: string
	}

	const { t } = useI18n()

	const emit = defineEmits<{
		'close': []
		'open-ai': []
		'navigate': [path: string]
	}>()

	const props = defineProps<{
		visible: boolean
		projects?: { title: string; desc: string }[]
		posts?: { title: string; date: string; slug: string }[]
	}>()

	type UiInputInstance = {
		inputRef?: { value?: HTMLInputElement | null }
	}

	const open = computed({
		get: () => props.visible,
		set: (value) => {
			if (!value && props.visible) emit('close')
		},
	})

	const terminalBody = ref<HTMLElement | null>(null)
	const cmdInput = ref<UiInputInstance | null>(null)
	const currentCmd = ref('')
	const commandHistory = ref<string[]>([])
	const historyIndex = ref(-1)

	const terminalHistory = ref<Entry[]>([
		{ type: 'output', content: t('terminal.welcome') },
		{ type: 'output', content: t('terminal.tipHelp') },
	])

	const scrollToBottom = () => {
		nextTick(() => {
			if (terminalBody.value) {
				terminalBody.value.scrollTop = terminalBody.value.scrollHeight
			}
		})
	}

	const focusInput = () => {
		nextTick(() => cmdInput.value?.inputRef?.value?.focus?.())
	}

	watch(
		() => props.visible,
		(val) => {
			if (val) {
				focusInput()
				scrollToBottom()
			}
		},
	)

	const appendOutput = (content: string) => {
		terminalHistory.value.push({ type: 'output', content })
		scrollToBottom()
	}

	// 命令历史导航
	const handleInputKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			executeCmd()
		} else if (event.key === 'ArrowUp') {
			event.preventDefault()
			if (commandHistory.value.length > 0) {
				if (historyIndex.value < commandHistory.value.length - 1) {
					historyIndex.value++
				}
				currentCmd.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value] || ''
			}
		} else if (event.key === 'ArrowDown') {
			event.preventDefault()
			if (historyIndex.value > 0) {
				historyIndex.value--
				currentCmd.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value] || ''
			} else {
				historyIndex.value = -1
				currentCmd.value = ''
			}
		}
	}

	const executeCmd = () => {
		const raw = currentCmd.value.trim()
		if (!raw) return

		// 添加到命令历史
		commandHistory.value.push(raw)
		historyIndex.value = -1

		terminalHistory.value.push({ type: 'input', content: raw })
		currentCmd.value = ''

		const [cmdRaw, ...args] = raw.split(' ')
		const cmd = cmdRaw || ''
		let output = ''

		switch (cmd.toLowerCase()) {
			case 'help':
				output = t('terminal.help')
				break

			case 'clear':
				terminalHistory.value = []
				scrollToBottom()
				return

			case 'ls':
				output = `${t('terminal.ls.projectsHeader')}\n${(props.projects || [])
					.map((p) => `  ${p.title}/`)
					.join('\n')}\n\n${t('terminal.ls.blogHeader')}\n${(props.posts || [])
					.slice(0, 5)
					.map((p) => `  ${(p.slug || p.title || '').replaceAll(' ', '-')}.md`)
					.join('\n')}`
				break

			case 'projects':
				if (!props.projects?.length) {
					output = t('terminal.projects.empty')
				} else {
					output = `${t('terminal.projects.header')}\n${props.projects.map((p) => `- ${p.title} - ${p.desc}`).join('\n')}`
				}
				break

			case 'blog':
				if (!props.posts?.length) {
					output = t('terminal.blog.empty')
				} else {
					output = `${t('terminal.blog.header')}\n${props.posts
						.slice(0, 5)
						.map((p) => `[${p.date}] ${p.title}`)
						.join('\n')}`
				}
				break

			case 'cd': {
				const target = args[0] ?? ''
				const routes: Record<string, string> = {
					home: '/',
					projects: '/projects',
					blog: '/blog',
					links: '/links',
					now: '/now',
				}
				if (target && routes[target]) {
					output = t('terminal.cd.navigating', { target: `/${target}` })
					setTimeout(() => {
						emit('close')
						emit('navigate', routes[target]!)
					}, 300)
				} else if (target === '~' || target === '/') {
					output = t('terminal.cd.navigating', { target: '/' })
					setTimeout(() => {
						emit('close')
						emit('navigate', '/')
					}, 300)
				} else {
					output = t('terminal.cd.notFound', { target })
				}
				break
			}

			case 'open':
				if (args[0] === 'chat') {
					output = t('terminal.open.chat')
					setTimeout(() => {
						emit('close')
						emit('open-ai')
					}, 300)
				} else if (args[0] === 'os') {
					output = t('terminal.open.os')
				} else {
					output = t('terminal.open.usage')
				}
				break

			case 'exit':
				emit('close')
				return

			case 'whoami':
				output = t('terminal.whoami')
				break

			case 'neofetch':
				output = t('terminal.neofetch')
				break

			case 'sudo':
				output = t('terminal.sudoDenied')
				break

			case 'rm':
				if (args.includes('-rf') && (args.includes('/') || args.includes('*'))) {
					output = t('terminal.rmBlocked')
				} else {
					output = t('terminal.rmDenied')
				}
				break

			default:
				output = t('terminal.commandNotFound', { cmd })
		}

		if (output) {
			appendOutput(output)
		}
	}

	watch(
		() => props.visible,
		(val) => {
			if (!val) {
				historyIndex.value = -1
			}
		},
	)
</script>
