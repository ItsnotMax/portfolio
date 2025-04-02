<template lang="html">
	<div class="relative grid grid-rows-[1fr_auto] gap-4">
		<ProductSlider :json="json" />
		<ProductTabs
			:description="json.description"
			:specification="json.specification"
		/>
	</div>
</template>

<script setup lang="js">
import ProductSlider from "~/components/ProductSlider.vue";
import ProductTabs from "~/components/ProductTabs.vue";

const json = {
	productTitle: "Какие-то крокодилы",
	description: "Какое-то описание",
	specification: "Какая-то спека",
	price: "1999",
	images: [
		"../store/product_imgs/img1.jpg",
		"../store/product_imgs/img2.jpg",
		"../store/product_imgs/img3.jpg",
	],
	badges: {
		delivery: {
			title: "Доставка",
			options: ["Домой", "На работу", "Сразу в зоопарк"],
		},
		wishes: {
			title: "Подарок",
			options: ["Аквариум", "Курицы", "Бинты", "Намордник"],
		},
	},
	availability: "В наличии",
};
useHead({
	title: json.productTitle,
	meta: [{ name: "description", content: json.description }],
});
</script>
<style scoped lang="scss"></style>
