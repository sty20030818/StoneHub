/* eslint-disable vue/no-v-html */
<script setup lang="ts">
	type Entry = {
		type: 'input' | 'output'
		content: string
	}

	const emit = defineEmits<{
		(e: 'close' | 'open-ai'): void
	}>()

	const props = defineProps<{
		visible: boolean
		projects?: { title: string; desc: string }[]
		posts?: { title: string; date: string; slug: string }[]
	}>()

	const terminalBody = ref<HTMLDivElement | null>(null)
	const cmdInput = ref<HTMLInputElement | null>(null)
	const currentCmd = ref('')
	const terminalHistory = ref<Entry[]>([
		{ type: 'output', content: 'Welcome to StoneShell v0.1.0' },
		{ type: 'output', content: 'Type <span class="text-yellow-400">help</span> to see available commands.' },
	])

	const scrollToBottom = () => {
		nextTick(() => {
			if (terminalBody.value) {
				terminalBody.value.scrollTop = terminalBody.value.scrollHeight
			}
		})
	}

	const focusInput = () => {
		nextTick(() => cmdInput.value?.focus())
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

	const executeCmd = () => {
		const raw = currentCmd.value.trim()
		if (!raw) return

		terminalHistory.value.push({ type: 'input', content: raw })
		currentCmd.value = ''

		const [cmd, ...args] = raw.split(' ')
		let output = ''

		switch (cmd.toLowerCase()) {
			case 'help':
				output = `Available commands:
  <span class="text-sky-400">help</span>       Show this help message
  <span class="text-sky-400">clear</span>      Clear terminal screen
  <span class="text-sky-400">projects</span>   List my projects
  <span class="text-sky-400">blog</span>       List recent blog posts
  <span class="text-sky-400">open</span>       Open specific module (e.g., <span class="text-gray-400">open chat</span>)
  <span class="text-sky-400">exit</span>       Close terminal`
				break
			case 'clear':
				terminalHistory.value = []
				scrollToBottom()
				return
			case 'projects':
				output = (props.projects || [])
					.map((p) => `• <span class="text-sky-300 font-bold">${p.title}</span> - ${p.desc}`)
					.join('\n')
				break
			case 'blog':
				output = (props.posts || [])
					.slice(0, 5)
					.map((p) => `[${p.date}] <span class="text-pink-300 underline cursor-pointer">${p.title}</span>`)
					.join('\n')
				break
			case 'open':
				if (args[0] === 'chat') {
					emit('open-ai')
					output = 'Opening AI Chat...'
				} else if (args[0] === 'os') {
					output = 'Launching StoneOS in new tab... (Mock)'
				} else {
					output = 'Usage: open [chat|os]'
				}
				break
			case 'exit':
				emit('close')
				return
			case 'sudo':
				output = '嘿！想干嘛？这里是石头鱼的地盘，没有 root 权限给你玩~ 😂'
				break
			default:
				output = `Command not found: ${cmd}. Try <span class="text-yellow-400">help</span>.`
		}

		if (output) {
			appendOutput(output)
		}
	}

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && props.visible) {
			emit('close')
		}
	}

	onMounted(() => {
		if (import.meta.client) {
			window.addEventListener('keydown', handleKeydown)
		}
	})

	onBeforeUnmount(() => {
		if (import.meta.client) {
			window.removeEventListener('keydown', handleKeydown)
		}
	})
</script>

<template>
	<transition
		enter-active-class="transition duration-300 ease-out"
		enter-from-class="opacity-0 scale-95"
		enter-to-class="opacity-100 scale-100"
		leave-active-class="transition duration-200 ease-in"
		leave-from-class="opacity-100 scale-100"
		leave-to-class="opacity-0 scale-95">
		<div
			v-if="visible"
			class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
			@click.self="emit('close')">
			<div
				class="terminal-glass w-full max-w-4xl h-full md:h-[600px] rounded-lg shadow-2xl flex flex-col overflow-hidden text-green-400 font-mono text-sm md:text-base border border-slate-700">
				<!-- Header -->
				<div class="bg-slate-900/80 px-4 py-2 flex justify-between items-center border-b border-slate-700 select-none">
					<span class="text-xs text-slate-400">stonefish@stonehub: ~ (zsh)</span>
					<div class="flex gap-2">
						<button
							class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400"
							@click="emit('close')" />
						<div class="w-3 h-3 rounded-full bg-yellow-500" />
						<div class="w-3 h-3 rounded-full bg-green-500" />
					</div>
				</div>

				<!-- Body -->
				<div
					ref="terminalBody"
					class="flex-1 overflow-y-auto p-4 space-y-2 custom-scroll"
					@click="focusInput">
					<div
						v-for="(entry, index) in terminalHistory"
						:key="index">
						<div
							v-if="entry.type === 'input'"
							class="flex gap-2">
							<span class="text-blue-400">➜</span>
							<span class="text-pink-400">~</span>
							<span v-html="entry.content" />
						</div>
						<div
							v-else
							class="whitespace-pre-wrap text-slate-300 ml-6"
							v-html="entry.content" />
					</div>

					<!-- Input -->
					<div class="flex gap-2 items-center">
						<span class="text-blue-400">➜</span>
						<span class="text-pink-400">~</span>
						<input
							ref="cmdInput"
							v-model="currentCmd"
							type="text"
							autocomplete="off"
							placeholder="Type 'help' to start..."
							class="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-slate-700 caret-green-400"
							@keydown.enter="executeCmd" >
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
