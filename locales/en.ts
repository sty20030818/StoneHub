import { defineI18nLocale } from '#i18n'

export default defineI18nLocale(() => ({
	nav: {
		home: 'Home',
		projects: 'Projects',
		blog: 'Blog',
		now: 'Now',
		links: 'Links',
	},
	navbar: {
		terminal: 'Terminal',
		ai: 'AI Assistant',
	},
	common: {
		retry: 'Retry',
		backHome: 'Back to Home',
		refresh: 'Refresh',
		close: 'Close',
		untitled: 'Untitled',
		checkNetworkRetry: 'Please check your network and try again.',
		viewAll: 'View all',
	},
	settings: {
		title: 'Settings',
		theme: {
			light: 'Light mode',
			dark: 'Dark mode',
		},
	},
	home: {
		dataError: {
			title: 'Failed to load home data',
			description: 'You can still browse the page, but terminal data may be incomplete.',
			actions: {
				projects: 'Go to Projects',
				blog: 'Go to Blog',
			},
		},
		emptyProjects: {
			title: 'No featured projects yet',
			description: "I'm organizing project content. Please check back later.",
			actions: {
				projects: 'Go to Projects',
			},
		},
		hero: {
			status: 'Open for new projects',
			title: {
				prefix: 'With',
				emphasis: 'code & color',
				suffix: 'weave the future',
			},
			introHello: "Hi, I'm ",
			introNamePunctuation: '.',
			introMission: 'I build immersive, minimal, and motion-rich web experiences.',
			introLine2: 'Start the terminal to explore my digital garden, or summon the AI assistant for a guided tour.',
			actions: {
				terminal: 'Launch Terminal',
				ai: 'Open AI Assistant',
			},
		},
		featuredProjects: {
			title: 'Featured Projects',
		},
	},
	blog: {
		headline: 'Blog',
		list: {
			title: 'Notes',
			description: 'Posts are powered by Nuxt Content.',
			errorTitle: 'Failed to load posts',
			emptyTitle: 'No posts yet',
			emptyDescription: "I'm organizing content. Stay tuned.",
		},
		detail: {
			fallbackTitle: 'Post',
			notFoundTitle: 'Post not found or unpublished',
			notFoundDescription: 'You can go back to the blog list and read other posts.',
			backToList: 'Back to Blog',
		},
	},
	projects: {
		headline: 'Projects',
		list: {
			title: 'Projects',
			description: 'Project data is rendered from Nuxt Content markdown.',
			errorTitle: 'Failed to load projects',
			emptyTitle: 'No projects yet',
			emptyDescription: "I'm organizing projects. Please check back later.",
		},
		detail: {
			fallbackTitle: 'Project',
			backToList: 'Back to Projects',
			notFoundTitle: 'Project not found or unpublished',
			notFoundDescription: 'You can go back to the projects list to view other projects.',
			contentMissingTitle: 'Content not found',
			contentMissingDescription: 'The link may be wrong, or the content is not published yet.',
		},
	},
	links: {
		headline: 'Links',
		title: 'Links',
		description: 'Shortcuts and friends.',
	},
	now: {
		headline: 'Now',
		fallbackTitle: "What I'm doing now",
		description: 'Rendered from content/now.json: Doing / Done / Next.',
		sections: {
			doing: 'Doing',
			done: 'Done',
			next: 'Next',
		},
	},
	error: {
		headline: 'Error',
		title: 'Something went wrong',
		stayHere: 'Stay here',
		somethingWentWrong: 'Something went wrong.',
	},
	footer: {
		poweredBy: 'Powered by',
		runningDays: 'Running for {days} days',
		icp: 'ICP Filing: 京ICP备XXXXXXXX号',
		social: {
			wechat: 'WeChat',
			qq: 'QQ',
			bilibili: 'Bilibili',
			github: 'GitHub',
			qrPlaceholder: 'QR Code',
			scanWechat: 'Scan to add WeChat',
		},
	},
	ai: {
		title: 'AI StoneFish',
		a11y: {
			chat: 'AI Chat',
			messages: 'Message list',
			input: 'Input area',
		},
		roles: { user: 'You', assistant: 'AI' },
		typing: 'AI is typing…',
		inputLabel: 'Input',
		placeholder: 'Ask me about Nuxt 4 or the tech stack…',
		send: 'Send',
		quick: {
			intro: 'About StoneHub',
			introPrompt: 'Introduce StoneHub',
			stack: 'Tech stack',
			stackPrompt: "What's the tech stack?",
		},
		greeting: "Hi! I'm AI StoneFish. Ask me about this project or my (StoneFish's) development experience.",
		reply: {
			about: 'StoneHub is a Nuxt 4 personal site with Home, Projects, Blog, Now, and Links, powered by Nuxt Content.',
			stack: 'Core stack: Vue 3 / Nuxt 4 / TypeScript / Node.js / Nuxt Content / Nuxt UI.',
			likes: 'I enjoy writing code, building Web OS projects, and drinking coffee.',
			hello: "Hi! Nice to meet you. I'm StoneFish's digital twin—want to talk tech?",
			fallback: "I don't have a good local answer yet… try asking about “tech stack” or “StoneHub”.",
		},
	},
	terminal: {
		a11y: {
			terminal: 'Terminal',
			output: 'Output',
			input: 'Input',
		},
		headerPrompt: 'stonefish at stonehub: ~ (zsh)',
		commandLabel: 'Command',
		placeholder: "Type 'help' to see available commands…",
		execute: 'Run',
		welcome: 'Welcome to StoneShell v2.0.0',
		tipHelp: "Type 'help' to see available commands",
		help: 'Basic commands:\nhelp      Show help\nclear     Clear screen\nls        List projects and blog\nprojects  Show projects\nblog      Show blog posts\n\nNavigation:\ncd        Navigate (e.g. cd blog)\nopen      Open app (e.g. open chat)\nexit      Close terminal\n\nFun:\nwhoami    Who am I?\nneofetch  System info\n\nTip: Use ↑/↓ to browse command history',
		ls: {
			projectsHeader: 'Projects/',
			blogHeader: 'Blog/',
		},
		projects: {
			empty: 'No project data',
			header: 'Projects:',
		},
		blog: {
			empty: 'No blog posts',
			header: 'Recent posts:',
		},
		cd: {
			navigating: 'Navigating to {target}...',
			notFound: 'cd: no such directory: {target}\nAvailable: home, projects, blog, links, now',
		},
		open: {
			chat: 'Opening AI StoneFish...',
			os: 'Opening StoneOS... (coming soon)',
			usage: 'Usage: open [chat|os]',
		},
		whoami: 'StoneFish\nFull-stack engineer / Web OS enthusiast\nLocation: StoneHub',
		neofetch:
			'stonefish at stonehub\n---------------------\nOS:    StoneHub\nStack: Nuxt 4 / Vue 3\nLang:  TypeScript\nTerm:  StoneShell v2.0',
		sudoDenied: 'Permission denied\nNo root privileges here.',
		rmBlocked: 'Dangerous operation blocked.',
		rmDenied: 'rm: delete operation is not allowed',
		commandNotFound: "command not found: {cmd}\nType 'help' to see available commands",
	},
}))
