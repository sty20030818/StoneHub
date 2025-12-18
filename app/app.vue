<template>
	<UApp :toaster="{ position: 'bottom-right', duration: 3200, max: 4, progress: true, expand: true }">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
