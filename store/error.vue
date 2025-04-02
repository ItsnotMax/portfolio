<template lang="html">
	<NuxtLayout>
		<div>
			<div>ТАКОГО ЕЩЕ НЕТ</div>
			<div>
				<NuxtLink to="/">Назад</NuxtLink>
			</div>
		</div>
	</NuxtLayout>
</template>
<script setup lang="js">
useHead({
	title: "Error",
	meta: [{ name: "description", content: "Таких страниц у нас нет!" }],
});
</script>
<style scoped lang="scss"></style>
