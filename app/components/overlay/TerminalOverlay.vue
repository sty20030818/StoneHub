<script setup lang="ts">
	type Entry = {
		type: 'input' | 'output'
		text: string
	}

	const emit = defineEmits<{
		(e: 'close' | 'open-ai'): void
	}>()

	const props = defineProps<{
		visible: boolean
		projects?: { title: string; _path: string; description?: string }[]
		posts?: { title: string; _path: string; date?: string }[]
	}>()

	const history = ref<Entry[]>([{ type: 'output', text: 'Welcome to StoneShell v0.1 (type "help" to start)' }])

	const current = ref('')

	const appendOutput = (text: string) => {
		history.value.push({ type: 'output', text })
	}

	const handleSubmit = () => {
		const value = current.value.trim()
		if (!value) return

		history.value.push({ type: 'input', text: value })
		current.value = ''

		const normalized = value.toLowerCase()

		if (normalized === 'help') {
			appendOutput(
				[
					'可用命令：',
					'- help: 查看命令列表',
					'- clear: 清屏',
					'- exit: 退出终端',
					'- projects: 列出项目',
					'- blog: 列出文章',
					'- open chat: 打开 AI 聊天',
					'- open os: 打开 StoneOS 占位链接',
				].join('\n'),
			)
			return
		}

		if (normalized === 'clear') {
			history.value = []
			return
		}

		if (normalized === 'exit') {
			appendOutput('Exiting StoneShell.')
			emit('close')
			return
		}

		if (normalized === 'open chat') {
			appendOutput('Opening AI chat ...')
			emit('open-ai')
			return
		}

		if (normalized === 'open os') {
			appendOutput('Opening StoneOS placeholder ...')
			if (import.meta.client) {
				window.open('https://stoneos.example.com', '_blank')
			}
			return
		}

		if (normalized === 'projects') {
			if (!props.projects?.length) {
				appendOutput('暂无项目数据。')
			} else {
				appendOutput(
					props.projects
						.map((p) => `- ${p.title} (${p._path}) ${p.description ? '· ' + p.description : ''}`)
						.join('\n'),
				)
			}
			return
		}

		if (normalized === 'blog') {
			if (!props.posts?.length) {
				appendOutput('暂无文章数据。')
			} else {
				appendOutput(
					props.posts
						.slice(0, 5)
						.map((b) => `- ${b.title} (${b._path}) ${b.date ? '· ' + b.date : ''}`)
						.join('\n'),
				)
			}
			return
		}

		appendOutput(`Command not found: ${value}`)
	}
</script>

<template>
	<UModal
		:model-value="visible"
		class="max-w-5xl"
		:ui="{
			overlay: 'bg-black/70 backdrop-blur-md',
		}"
		@update:model-value="(val: boolean) => !val && emit('close')">
		<div
			v-motion="'scale-fade'"
			class="flex h-[70vh] flex-col rounded-2xl border border-[var(--surface-outline)] bg-[var(--surface-card)]/95 p-4 text-[var(--text-primary)] shadow-[var(--shadow-soft)]">
			<div class="mb-4 flex items-center justify-between text-sm text-[var(--text-secondary)]">
				<span class="font-semibold">StoneShell v0.1</span>
				<div class="flex gap-2">
					<UButton
						size="xs"
						variant="ghost"
						icon="i-heroicons-sparkles"
						class="rounded-xl"
						@click="emit('open-ai')">
						open ai
					</UButton>
					<UButton
						size="xs"
						variant="solid"
						color="primary"
						icon="i-heroicons-x-mark-20-solid"
						class="rounded-xl"
						@click="emit('close')">
						exit
					</UButton>
				</div>
			</div>

			<div
				class="flex-1 overflow-y-auto rounded-xl border border-[var(--surface-outline)] bg-[var(--surface-variant)]/60 p-4 font-mono text-sm text-[var(--text-primary)]">
				<div
					v-for="(entry, idx) in history"
					:key="idx"
					class="whitespace-pre-line">
					<span
						v-if="entry.type === 'input'"
						class="text-primary-500">
						$ {{ entry.text }}
					</span>
					<span
						v-else
						class="text-[var(--text-secondary)]">
						{{ entry.text }}
					</span>
				</div>
			</div>

			<div class="mt-4 flex items-center gap-2 font-mono text-sm text-[var(--text-secondary)]">
				<span class="text-primary-500">$</span>
				<UInput
					v-model="current"
					variant="outline"
					class="rounded-xl"
					input-class="font-mono bg-[color:var(--surface-card)] text-[color:var(--text-primary)]"
					placeholder="输入命令，回车执行..."
					@keydown.enter.prevent="handleSubmit" />
			</div>
		</div>
	</UModal>
</template>
