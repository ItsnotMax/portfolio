<template>
	<div>
		<div class="loading-spinner mb-4 mx-auto" :style="spinnerStyle"></div>
		<div>ЗАГРУЗКА ДАННЫХ</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	size?: string;
}>();

const spinnerStyle = {
	width: props.size || "24px",
	height: props.size || "24px",
};
</script>

<style scoped lang="scss">
.loading-spinner {
	border: 4px solid rgba(255, 255, 255, 0.3);
	border-top: 4px solid #3498db;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
