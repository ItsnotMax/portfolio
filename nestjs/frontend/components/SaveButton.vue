<template lang="html">
	<button
		v-if="!props.posting"
		@click="post"
		class="p-4 truncate w-[9rem] border border-gray-300 bg-gray-100 rounded-md"
		:class="{
			'hover:bg-sky-700 bg-sky-600 text-white': !props.disabled,
			'bg-gray-300 cursor-not-allowed': props.disabled,
		}"
		:disabled="props.disabled"
	>
		{{ props.text }}
	</button>
	<button
		v-else
		ref="shrinkingBtn"
		class="p-4 border border-gray-300 bg-gray-100 rounded-md cursor-wait flex justify-center"
		disabled
	>
		<LoadingSpinner :size="'24px'" />
	</button>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { gsap } from "gsap";
import LoadingSpinner from "./LoadingSpinner.vue";

const shrinkingBtn = ref<HTMLElement | null>(null);
const emit = defineEmits(["update:posting"]);
const props = defineProps<{
	text: string;
	disabled: boolean;
	posting: boolean;
}>();

watch(shrinkingBtn, (newVal) => {
	if (newVal && shrinkingBtn.value) {
		gsap.from(shrinkingBtn.value, {
			width: "9rem",
			backgroundColor: "#0ea5e9",
			duration: 0.2,
		});
	}
});

const post = (): void => {
	emit("update:posting", true);
};
</script>
<style scoped lang="scss"></style>
