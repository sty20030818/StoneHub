/* eslint-disable vue/no-v-html */
<template>
	<transition
		:enter-active-class="reduceMotion ? 'transition duration-150 ease-out' : 'transition duration-300 ease-out'"
		:enter-from-class="reduceMotion ? 'opacity-0' : 'opacity-0 scale-95'"
		:enter-to-class="reduceMotion ? 'opacity-100' : 'opacity-100 scale-100'"
		:leave-active-class="reduceMotion ? 'transition duration-150 ease-in' : 'transition duration-200 ease-in'"
		:leave-from-class="reduceMotion ? 'opacity-100' : 'opacity-100 scale-100'"
		:leave-to-class="reduceMotion ? 'opacity-0' : 'opacity-0 scale-95'">
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
							placeholder="输入 'help' 查看帮助..."
							class="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-slate-700 caret-green-400"
							@keydown="handleInputKeydown" />
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
	import { usePreferredReducedMotion } from '@vueuse/core'

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

	const terminalBody = ref<HTMLDivElement | null>(null)
	const cmdInput = ref<HTMLInputElement | null>(null)
	const currentCmd = ref('')
	const commandHistory = ref<string[]>([])
	const historyIndex = ref(-1)

	const terminalHistory = ref<Entry[]>([
		{ type: 'output', content: '欢迎来到 StoneShell v2.0.0 🐟' },
		{ type: 'output', content: '输入 <span class="text-yellow-400">help</span> 查看可用命令' },
	])

	const reduceMotion = usePreferredReducedMotion()

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
				output = `<span class="text-slate-400">📋 基础命令:</span>
  <span class="text-sky-400 font-bold">help</span>      显示帮助信息
  <span class="text-sky-400 font-bold">clear</span>     清屏
  <span class="text-sky-400 font-bold">ls</span>        列出项目和博客
  <span class="text-sky-400 font-bold">projects</span>  查看项目列表
  <span class="text-sky-400 font-bold">blog</span>      查看博客列表

<span class="text-slate-400">🚀 导航命令:</span>
  <span class="text-pink-400 font-bold">cd</span>        切换页面 (如 <span class="text-slate-500">cd blog</span>)
  <span class="text-pink-400 font-bold">open</span>      启动应用 (如 <span class="text-slate-500">open chat</span>)
  <span class="text-pink-400 font-bold">exit</span>      关闭终端

<span class="text-slate-400">🎮 彩蛋命令:</span>
  <span class="text-purple-400 font-bold">whoami</span>    我是谁？
  <span class="text-purple-400 font-bold">neofetch</span>  系统信息

<span class="text-slate-500">💡 提示: 使用 ↑/↓ 键翻阅命令历史</span>`
				break

			case 'clear':
				terminalHistory.value = []
				scrollToBottom()
				return

			case 'ls':
				output = `<span class="text-sky-300 font-bold">📁 Projects/</span>
${(props.projects || []).map((p) => `  drwxr-xr-x  stone  ${p.title}/`).join('\n')}

<span class="text-pink-300 font-bold">📄 Blog/</span>
${(props.posts || [])
	.slice(0, 5)
	.map((p) => `  -rw-r--r--  stone  ${p.slug || p.title || ''}.md`)
	.join('\n')}`
				break

			case 'projects':
				if (!props.projects?.length) {
					output = '暂无项目数据'
				} else {
					output =
						`<span class="text-sky-300 font-bold">🚀 我的项目:</span>\n` +
						props.projects.map((p) => `• <span class="text-sky-400 font-bold">${p.title}</span> - ${p.desc}`).join('\n')
				}
				break

			case 'blog':
				if (!props.posts?.length) {
					output = '暂无博客文章'
				} else {
					output =
						`<span class="text-pink-300 font-bold">📝 近期博客:</span>\n` +
						props.posts
							.slice(0, 5)
							.map((p) => `[${p.date}] <span class="text-pink-400">${p.title}</span>`)
							.join('\n')
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
				output = `<span class="text-sky-400 font-bold">🐟 石头鱼 (StoneFish)</span>
全栈工程师 / Web OS 爱好者
喜欢天蓝色和淡粉色
当前位置: StoneHub v2.0`
				break

			case 'neofetch':
				output = `<span class="text-sky-400">
   _____ _                  _   _       _     
  / ____| |                | | | |     | |    
 | (___ | |_ ___  _ __   __| |_| |_   _| |__  
  \\___ \\| __/ _ \\| '_ \\ / _ \\ __| | | | | '_ \\ 
  ____) | || (_) | | | |  __\\ |_| | |_| | |_) |
 |_____/ \\__\\___/|_| |_|\\___|\\__|_|\\__,_|_.__/ 
</span>
<span class="text-pink-400">stonefish</span>@<span class="text-sky-400">stonehub</span>
---------------------
<span class="text-slate-400">OS:</span>      StoneHub v2.0
<span class="text-slate-400">框架:</span>    Nuxt 4 / Vue 3
<span class="text-slate-400">样式:</span>    Tailwind CSS
<span class="text-slate-400">语言:</span>    TypeScript
<span class="text-slate-400">主题:</span>    Material You (天蓝×淡粉)
<span class="text-slate-400">终端:</span>    StoneShell v2.0`
				break

			case 'sudo':
				output =
					'<span class="text-red-400">🚫 Permission denied</span>\n嘿！想干嘛？这里是石头鱼的地盘，没有 root 权限给你玩~ 😂'
				break

			case 'rm':
				if (args.includes('-rf') && (args.includes('/') || args.includes('*'))) {
					output = '<span class="text-red-400">🚨 危险操作已拦截!</span>\n别闹，我的文件可不能让你删~ 😅'
				} else {
					output = `rm: 拒绝执行删除操作`
				}
				break

			default:
				output = `命令未找到: ${cmd}\n输入 <span class="text-yellow-400">help</span> 查看可用命令`
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
