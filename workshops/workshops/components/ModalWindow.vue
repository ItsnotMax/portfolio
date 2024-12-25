<template lang="html">
	<div
		class="reset-btn flex justify-center items-center z-[9999] inset-0 bg-[rgba(0,0,0,0.3)] fixed"
	>
		<div
			class="relative flex overflow-scroll not-scrollbar w-[90vw] h-[99vh] bg-[rgb(255,255,255)] p-[1vw] border-8 border-gray-500 rounded-[1rem] shadow-[0_0_15px_10px_rgba(255,255,255,0.3)] cursor-default"
		>
			<div
				ref="animation__container"
				class="absolute top-0 left-0 flex justify-center items-center w-[100%] h-[100%]"
			>
				<div
					ref="animation"
					class="h-[inherit] w-[50%] bg-[rgb(255,255,255)] z-10"
				></div>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="js">
import { onMounted, ref } from "vue";
import gsap from "gsap";

const animation__container = ref(null);
const animation = ref(null);

const hideElement = () => {
	animation__container.value.style.display = "none";
};
onMounted(() => {
	if (animation.value) {
		gsap.to(animation.value, {
			width: "0%",
			duration: 1,
			onComplete: hideElement,
		});
	}
});
</script>
