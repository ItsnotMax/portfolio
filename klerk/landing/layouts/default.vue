<template lang="html">
	<header class="container pt-12 mx-auto">
		<HeaderComp />
	</header>
	<main
		class="container max-w-[1024px] mx-auto py-12 px-4 xs:px-6 bg-[#F5F5F8] rounded-[10px]"
	>
		<slot></slot>
	</main>
	<footer class="container mx-auto">
		<FooterComp />
	</footer>
</template>
<script setup lang="ts">
import HeaderComp from "~/components/HeaderComp.vue";
import FooterComp from "~/components/FooterComp.vue";
</script>
