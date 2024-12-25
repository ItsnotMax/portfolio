<template lang="html">
	<button
		class="relative flex items-center justify-center p-4 truncate w-[9rem] border border-gray-300 bg-gray-100 rounded-md hover:bg-blue-600 hover:text-fuchsia-50 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
		:disabled="isDisabled"
		aria-label="Кнопка {{ text }}"
	>
		<svg
			v-if="isDisabled"
			class="mr-2 w-5 h-5 animate-spin"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<circle
				class="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke-width="4"
			></circle>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M12 2v8h8M12 22v-8H4"
			></path>
		</svg>
		{{ text }}
	</button>
</template>

<script setup lang="ts">
const { text, isDisabled } = defineProps<{
	text: string;
	isDisabled: boolean;
}>();
</script>
<style scoped lang="scss"></style>
