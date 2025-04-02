<template lang="html">
	<div
		@click="close"
		class="fixed z-[9999] inset-0 bg-[rgba(15,23,42,0.1)] py-10"
	>
		<div class="flex h-full justify-center items-center px-2 xl:px-[25%]">
			<div
				class="flex w-full h-[90%] p-4 md:p-8 bg-[rgb(255,255,255)] rounded-[1rem] overflow-scroll not-scrollbar"
				:class="{ 'bg-transparent': bgTransparent }"
			>
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script setup lang="js">
const { bgTransparent } = defineProps({
	bgTransparent: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(["update:isModalOpen"]);
const close = () => {
	emit("update:isModalOpen", false);
};
</script>
