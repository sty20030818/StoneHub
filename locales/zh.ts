import { defineI18nLocale } from '#i18n'

export default defineI18nLocale(() => ({
	nav: {
		home: '首页',
		projects: '项目',
		blog: '博客',
		now: 'Now',
		links: '传送门',
	},
	navbar: {
		terminal: '交互式终端',
		ai: 'AI 助手',
	},
	common: {
		retry: '重试',
		backHome: '返回首页',
		refresh: '刷新',
		close: '关闭',
		untitled: '未命名',
		checkNetworkRetry: '请检查网络后重试。',
		viewAll: '查看全部',
	},
	settings: {
		title: '设置',
		theme: {
			light: '浅色模式',
			dark: '深色模式',
		},
	},
	home: {
		dataError: {
			title: '首页数据加载失败',
			description: '你仍然可以浏览页面，但终端数据可能不完整。',
			actions: {
				projects: '先去项目页',
				blog: '先去博客页',
			},
		},
		emptyProjects: {
			title: '暂无精选项目',
			description: '我正在整理项目内容，稍后再来看看。',
			actions: {
				projects: '去项目页',
			},
		},
		hero: {
			status: '目前接受新项目预订',
			title: {
				prefix: '以',
				emphasis: '代码与色彩',
				suffix: '编织未来视界',
			},
			introHello: '你好，我是 ',
			introNamePunctuation: '。',
			introMission: '我致力于构建沉浸式、极简且富有动感的 Web 体验。',
			introLine2: '您可以启动终端探索我的数字花园，或呼叫 AI 助手为您导览。',
			actions: {
				terminal: '启动交互式终端',
				ai: '呼叫 AI 助手',
			},
		},
		featuredProjects: {
			title: '精选项目',
		},
	},
	blog: {
		headline: '博客',
		list: {
			title: '思维碎片',
			description: '文章来自 Nuxt Content。',
			errorTitle: '文章列表加载失败',
			emptyTitle: '暂未发布文章',
			emptyDescription: '我正在整理内容，敬请期待。',
		},
		detail: {
			fallbackTitle: '文章',
			notFoundTitle: '文章不存在或尚未发布',
			notFoundDescription: '你可以返回博客列表查看其他文章。',
			backToList: '返回博客列表',
		},
	},
	projects: {
		headline: '项目',
		list: {
			title: '项目列表',
			description: '通过 Nuxt Content 渲染 markdown 项目数据。',
			errorTitle: '项目列表加载失败',
			emptyTitle: '暂未发布项目',
			emptyDescription: '等我整理好再放上来。',
		},
		detail: {
			fallbackTitle: '项目',
			backToList: '返回项目列表',
			notFoundTitle: '项目不存在或尚未发布',
			notFoundDescription: '你可以返回项目列表查看其他项目。',
			contentMissingTitle: '内容不存在',
			contentMissingDescription: '可能是链接错误，或者内容尚未发布。',
		},
	},
	links: {
		headline: '链接',
		title: '连接节点',
		description: '常用入口与友链。',
	},
	now: {
		headline: 'Now',
		fallbackTitle: '我现在在做什么',
		description: '基于 content/now.json 渲染，区分进行中 / 已完成 / 接下来。',
		sections: {
			doing: '进行中',
			done: '已完成',
			next: '接下来',
		},
	},
	error: {
		headline: '错误',
		title: '发生错误',
		stayHere: '留在此页',
		somethingWentWrong: '发生了一些问题。',
	},
	footer: {
		poweredBy: 'Powered by',
		runningDays: '已运行 {days} 天',
		icp: '京ICP备XXXXXXXX号',
		social: {
			wechat: '微信',
			qq: 'QQ',
			bilibili: 'Bilibili',
			github: 'GitHub',
			qrPlaceholder: '二维码',
			scanWechat: '扫码添加微信',
		},
	},
	ai: {
		title: 'AI 石头鱼',
		a11y: {
			chat: 'AI 聊天',
			messages: '消息列表',
			input: '输入区',
		},
		roles: { user: '你', assistant: 'AI' },
		typing: 'AI 正在输入…',
		inputLabel: '输入',
		placeholder: '问我关于 Nuxt 4 或技术栈的问题…',
		send: '发送',
		quick: {
			intro: '介绍 StoneHub',
			introPrompt: '介绍 StoneHub',
			stack: '技术栈',
			stackPrompt: '技术栈是什么',
		},
		greeting: '你好呀！我是 AI 石头鱼。你可以问我关于这个项目的技术细节，或者我（石头鱼本人）的开发经历。',
		reply: {
			about: 'StoneHub 是一个基于 Nuxt 4 的个人站点，包含首页、Projects、Blog、Now、Links，并使用 Nuxt Content 管理内容。',
			stack: '核心技术栈：Vue 3 / Nuxt 4 / TypeScript / Node.js / Nuxt Content / Nuxt UI。',
			likes: '我喜欢写代码，喜欢搞 Web OS 项目，也爱喝咖啡。',
			hello: '嗨！很高兴见到你。我是石头鱼的数字分身，聊点技术？',
			fallback: '这个问题还没索引到本地… 试试问“技术栈”或“介绍 StoneHub”吧。',
		},
	},
	terminal: {
		a11y: {
			terminal: '终端',
			output: '输出',
			input: '输入',
		},
		headerPrompt: 'stonefish at stonehub: ~ (zsh)',
		commandLabel: '命令',
		placeholder: "输入 'help' 查看帮助…",
		execute: '执行',
		welcome: '欢迎来到 StoneShell v2.0.0',
		tipHelp: "输入 'help' 查看可用命令",
		help: '基础命令:\nhelp      显示帮助信息\nclear     清屏\nls        列出项目和博客\nprojects  查看项目列表\nblog      查看博客列表\n\n导航命令:\ncd        切换页面 (如: cd blog)\nopen      启动应用 (如: open chat)\nexit      关闭终端\n\n彩蛋命令:\nwhoami    我是谁？\nneofetch  系统信息\n\n提示: 使用 ↑/↓ 键翻阅命令历史',
		ls: {
			projectsHeader: 'Projects/',
			blogHeader: 'Blog/',
		},
		projects: {
			empty: '暂无项目数据',
			header: '我的项目:',
		},
		blog: {
			empty: '暂无博客文章',
			header: '近期博客:',
		},
		cd: {
			navigating: '正在跳转到 {target}...',
			notFound: 'cd: 目录不存在: {target}\n可用目录: home, projects, blog, links, now',
		},
		open: {
			chat: '正在启动 AI 石头鱼...',
			os: '正在启动 StoneOS... (敬请期待)',
			usage: '用法: open [chat|os]',
		},
		whoami: '石头鱼 (StoneFish)\n全栈工程师 / Web OS 爱好者\n当前位置: StoneHub',
		neofetch: 'stonefish at stonehub\n---------------------\nOS:    StoneHub\n框架:  Nuxt 4 / Vue 3\n语言:  TypeScript\n终端:  StoneShell v2.0',
		sudoDenied: 'Permission denied\n这里没有 root 权限。',
		rmBlocked: '危险操作已拦截。',
		rmDenied: 'rm: 拒绝执行删除操作',
		commandNotFound: "命令未找到: {cmd}\n输入 'help' 查看可用命令",
	},
}))
