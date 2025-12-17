export const useAppUiState = () => {
	const isTerminalOpen = useState<boolean>('app-ui-terminal-open', () => false)
	const isAIOpen = useState<boolean>('app-ui-ai-open', () => false)

	const toggleTerminal = () => {
		isTerminalOpen.value = !isTerminalOpen.value
	}

	const toggleAI = () => {
		isAIOpen.value = !isAIOpen.value
	}

	return {
		isTerminalOpen,
		isAIOpen,
		toggleTerminal,
		toggleAI,
	}
}
