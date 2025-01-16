<template lang="html">
	<main class="flex justify-center items-center min-h-[100vh] md:py-[64px]">
		<section
			id="section"
			class="relative flex flex-col bg-white w-full h-[100vh] sm:w-[1024px] sm:h-[1024px] md:h-[914px]"
		>
			<slot :key="isDesktop || isTablet"></slot>
			<div id="mobile" class="relative flex flex-col gap-2 px-4"></div>
		</section>
	</main>
</template>
<script setup lang="js">
import { useScreenStore } from "~/stores/screenSizeStore";
import { storeToRefs } from "pinia";

const screenStore = useScreenStore();
const { isDesktop, isTablet } = storeToRefs(screenStore);
</script>
<style scoped lang="scss"></style>
