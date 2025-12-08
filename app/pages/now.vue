<template>
	<section class="space-y-4">
		<p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">Now</p>
		<h1 class="text-3xl font-bold md:text-4xl">我现在在做什么</h1>
		<p class="text-slate-300">这里将以简短 Markdown 记录当前的关注点、学习内容和在做的项目。</p>
		<UCard
			class="bg-white/5 ring-1 ring-white/10"
			:ui="{
				body: 'p-5 space-y-1 text-slate-200',
			}">
			<p>· 占位：近期进展将写在这里。</p>
			<p>· 后续可直接读取 content/now.md 或手写段落。</p>
		</UCard>
	</section>
</template>
