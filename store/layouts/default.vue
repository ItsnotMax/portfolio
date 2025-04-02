<template lang="html">
	<header class="flex justify-center p-6 sm:pt-10">
		<ProductSearch />
	</header>
	<main class="flex justify-center p-6 sm:py-12 2xl:max-w-screen-2xl">
		<slot></slot>
	</main>
	<footer
		class="flex justify-center items-center h-auto px-6 py-4 sm:pt-6 sm:pb-20 sm:mb-16"
	>
		<AdvCarousel :key="screenWidth" />
	</footer>
</template>

<script setup lang="js">
import ProductSearch from "~/components/ProductSearch.vue";
import AdvCarousel from "~/components/AdvCarousel.vue";
import { onMounted, onUnmounted } from "vue";

const screenWidth = useState("screenWidth", () => window.innerWidth);

const updateWidth = () => {
	screenWidth.value = window.innerWidth;
};
onMounted(() => {
	window.addEventListener("resize", updateWidth);
});
onUnmounted(() => {
	window.removeEventListener("resize", updateWidth);
});
</script>
<style scoped lang="scss"></style>
