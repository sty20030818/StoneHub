export default {
	// 最大打印宽度(超过则换行)
	printWidth: 120,

	// 一个缩进级别等于 2 个空格
	tabWidth: 2,

	// 使用制表符缩进(true 为使用 \t，false 为使用空格)
	useTabs: true,

	// 语句末尾不加分号
	semi: false,

	// 使用单引号
	singleQuote: true,

	// 对象属性引号策略:consistent = 如果有一个属性需要引号，则所有属性都加引号
	quoteProps: 'consistent',

	// 在多行结构的最后一个元素后也加尾随逗号(如数组、对象、参数)
	trailingComma: 'all',

	// 对象花括号内保留空格:{ foo: bar }
	bracketSpacing: true,

	// 多行元素的右括号是否与最后一行内容同一行
	bracketSameLine: true,

	// Vue/JSX 中单个属性是否独占一行
	singleAttributePerLine: true,

	// 箭头函数参数总是加括号 (x) => x
	arrowParens: 'always',

	// 仅在文件头包含特殊注释时才格式化(通常保持 false)
	requirePragma: false,

	// 在文件头插入特殊注释以表明已被 Prettier 格式化
	insertPragma: false,

	// Markdown 文本的换行策略:preserve 保留原样
	proseWrap: 'preserve',

	// 嵌入的代码片段的格式化方式(如 Markdown 中的代码块)
	embeddedLanguageFormatting: 'auto',

	// HTML 中的空白敏感度:遵循 CSS 规则
	htmlWhitespaceSensitivity: 'css',

	// 在 Vue 中缩进 <script> 与 <style> 内容
	vueIndentScriptAndStyle: true,

	// 统一使用 LF 换行符(跨平台更稳定)
	endOfLine: 'lf',

	// JSX 中使用单引号
	jsxSingleQuote: true,

	// 覆盖特定文件类型的格式化选项
	overrides: [
		{
			// JSON 文件通常更窄，便于审阅 diff
			files: '*.json',
			options: {
				printWidth: 80,
			},
		},
		{
			// Markdown 建议更窄并强制换行以避免超长行
			files: '*.md',
			options: {
				printWidth: 80,
				proseWrap: 'always',
			},
		},
		{
			// 显式指定 .vue 使用 vue 解析器(一般可自动识别，此处更明确)
			files: '*.vue',
			options: {
				parser: 'vue',
				bracketSameLine: true,
				singleAttributePerLine: true,
				htmlWhitespaceSensitivity: 'ignore',
			},
		},
		{
			// TypeScript 文件使用 TypeScript 解析器
			files: '*.ts',
			options: {
				parser: 'typescript',
			},
		},
		{
			// CSS 文件格式化
			files: '*.css',
			options: {
				parser: 'css',
				singleQuote: false,
				useTabs: true,
			},
		},
		{
			// YAML 配置文件
			files: '*.{yml,yaml}',
			options: {
				parser: 'yaml',
				singleQuote: false,
				tabWidth: 2,
			},
		},
		{
			// 环境变量文件
			files: '.env*',
			options: {
				parser: 'sh',
			},
		},
	],
}
