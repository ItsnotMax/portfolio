<template lang="html">
	<div
		class="flex justify-center items-center my-6 z-[9999]"
		:style="{
			height: circleSize.height + 'px',
		}"
	>
		<div
			class="circle"
			:style="{
				width: circleSize.width + 'px',
				height: circleSize.height + 'px',
				borderWidth: circleSize.borderWidth + 'px',
			}"
		></div>
		<div
			class="circle"
			:style="{
				width: circleSize.width + 'px',
				height: circleSize.height + 'px',
				borderWidth: circleSize.borderWidth + 'px',
			}"
		></div>
		<div
			class="circle"
			:style="{
				width: circleSize.width + 'px',
				height: circleSize.height + 'px',
				borderWidth: circleSize.borderWidth + 'px',
			}"
		></div>
	</div>
</template>

<script setup lang="js">
const props = defineProps({
	width: {
		type: String,
		default: "50",
	},
	height: {
		type: String,
		default: "50",
	},
	borderWidth: {
		type: String,
		default: "2",
	},
});

const circleSize = {
	width: props.width,
	height: props.height,
	borderWidth: props.borderWidth,
};
</script>

<style scoped lang="scss">
.circle {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 50%;
	border-color: rgb(7, 112, 220);
	border-style: solid;
	opacity: 0;
	animation: pulse 3s linear infinite;
	will-change: transform, opacity, box-shadow;
}

@keyframes pulse {
	0% {
		opacity: 0;
		transform: translate(-50%, -50%) scale(0);
		box-shadow: 0 0 0px rgba(7, 112, 220, 1);
	}
	50% {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
		box-shadow: 0 0 10px rgba(7, 112, 220, 1);
	}
	100% {
		opacity: 0;
		transform: translate(-50%, -50%) scale(2);
		box-shadow: 0 0 20px rgba(7, 112, 220, 1);
	}
}

.circle:nth-child(1) {
	animation-delay: -2s;
}

.circle:nth-child(2) {
	animation-delay: -1s;
}

.circle:nth-child(3) {
	animation-delay: 0s;
}
</style>
