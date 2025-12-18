<template>
	<UModal
		v-model:open="open"
		:close="false">
		<template #content>
			<section aria-label="终端">
				<header>
					<p>stonefish@stonehub: ~ (zsh)</p>
					<UButton
						type="button"
						color="neutral"
						variant="ghost"
						@click="open = false">
						关闭
					</UButton>
				</header>

				<section
					ref="terminalBody"
					aria-label="输出"
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

				<section aria-label="输入">
					<label for="terminal-cmd-input">命令</label>
					<UInput
						id="terminal-cmd-input"
						ref="cmdInput"
						v-model="currentCmd"
						type="text"
						autocomplete="off"
						placeholder="输入 'help' 查看帮助…"
						@keydown="handleInputKeydown" />
					<UButton
						type="button"
						color="neutral"
						variant="ghost"
						@click="executeCmd">
						执行
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
		{ type: 'output', content: '欢迎来到 StoneShell v2.0.0' },
		{ type: 'output', content: "输入 'help' 查看可用命令" },
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
				output = `基础命令:
help      显示帮助信息
clear     清屏
ls        列出项目和博客
projects  查看项目列表
blog      查看博客列表

导航命令:
cd        切换页面 (如: cd blog)
open      启动应用 (如: open chat)
exit      关闭终端

彩蛋命令:
whoami    我是谁？
neofetch  系统信息

提示: 使用 ↑/↓ 键翻阅命令历史`
				break

			case 'clear':
				terminalHistory.value = []
				scrollToBottom()
				return

			case 'ls':
				output = `Projects/
${(props.projects || []).map((p) => `  ${p.title}/`).join('\n')}

Blog/
${(props.posts || [])
	.slice(0, 5)
	.map((p) => `  ${(p.slug || p.title || '').replaceAll(' ', '-')}.md`)
	.join('\n')}`
				break

			case 'projects':
				if (!props.projects?.length) {
					output = '暂无项目数据'
				} else {
					output = `我的项目:\n${props.projects.map((p) => `- ${p.title} - ${p.desc}`).join('\n')}`
				}
				break

			case 'blog':
				if (!props.posts?.length) {
					output = '暂无博客文章'
				} else {
					output = `近期博客:\n${props.posts
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
					output = `正在跳转到 /${target}...`
					setTimeout(() => {
						emit('close')
						emit('navigate', routes[target]!)
					}, 300)
				} else if (target === '~' || target === '/') {
					output = '正在跳转到首页...'
					setTimeout(() => {
						emit('close')
						emit('navigate', '/')
					}, 300)
				} else {
					output = `cd: 目录不存在: ${target}\n可用目录: home, projects, blog, links, now`
				}
				break
			}

			case 'open':
				if (args[0] === 'chat') {
					output = '正在启动 AI 石头鱼...'
					setTimeout(() => {
						emit('close')
						emit('open-ai')
					}, 300)
				} else if (args[0] === 'os') {
					output = '正在启动 StoneOS... (敬请期待)'
				} else {
					output = '用法: open [chat|os]'
				}
				break

			case 'exit':
				emit('close')
				return

			case 'whoami':
				output = `石头鱼 (StoneFish)
全栈工程师 / Web OS 爱好者
当前位置: StoneHub`
				break

			case 'neofetch':
				output = `stonefish@stonehub
---------------------
OS:    StoneHub
框架:  Nuxt 4 / Vue 3
语言:  TypeScript
终端:  StoneShell v2.0`
				break

			case 'sudo':
				output = 'Permission denied\n这里没有 root 权限。'
				break

			case 'rm':
				if (args.includes('-rf') && (args.includes('/') || args.includes('*'))) {
					output = '危险操作已拦截。'
				} else {
					output = `rm: 拒绝执行删除操作`
				}
				break

			default:
				output = `命令未找到: ${cmd}\n输入 'help' 查看可用命令`
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
