<template lang="html">
	<div class="w--full h-full z-[1000]">
		<div class="circle"></div>
		<div class="circle"></div>
		<div class="circle"></div>
	</div>
</template>

<script setup lang="js"></script>

<style scoped lang="scss">
.circle {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 110px;
	height: 110px;
	border: 4px solid rgb(7, 112, 220);
	border-radius: 50%;
	opacity: 0;
	animation: pulse 1.5s linear infinite;
}

@keyframes pulse {
	0% {
		opacity: 0;
		transform: translate(-50%, -50%) scale(0);
		box-shadow: 0 0 0px rgba(7, 112, 220, 1);
	}
	50% {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1.5);
		box-shadow: 0 0 10px rgba(7, 112, 220, 1);
	}
	100% {
		opacity: 0;
		transform: translate(-50%, -50%) scale(3);
		box-shadow: 0 0 20px rgba(7, 112, 220, 1);
	}
}

.circle:nth-child(1) {
	animation-delay: 0s;
}

.circle:nth-child(2) {
	animation-delay: 0.5s;
}

.circle:nth-child(3) {
	animation-delay: 1s;
}
</style>
