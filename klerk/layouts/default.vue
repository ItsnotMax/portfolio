<template lang="html">
	<div
		class="flex justify-center items-center z-[9999] inset-0 bg-[rgba(0,0,0,0.3)] fixed"
	>
		<div
			ref="element"
			class="overflow-scroll not-scrollbar w-[80vw] h-[80vh] bg-[rgb(255,255,255)] p-[1vw] border-8 border-gray-500 rounded-[1rem] shadow-[0_0_15px_10px_rgba(255,255,255,0.3)]"
		>
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const element = ref<HTMLElement | null>(null);
</script>
