<template lang="html">
	<div>
		<h1>Дерево рубрик</h1>
		<RubricTree />
	</div>
</template>

<script setup lang="ts">
import RubricTree from "~/components/RubricTree.vue";

// eslint-disable-next-line no-undef
useHead({
	title: "Klerk tree",
	meta: [
		{
			name: "description",
			content: "Дерево сущностей Klerk",
		},
		{
			name: "keywords",
			content: "Klerk, API, GET, дерево, ссылки Klerk, компания",
		},
		{ name: "author", content: "Максим Ушаков" },
	],
});
</script>

<style scoped lang="scss"></style>
