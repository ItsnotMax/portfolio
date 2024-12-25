<template lang="html">
	<h3
		class="flex mx-auto text-left xs:text-center tracking-tighterCustom font-[600] text-[1.5rem] leading-[2rem] mb-6"
	>
		Выберите рассылки, которые подходят именно вам
	</h3>
	<div class="flex relative mb-4">
		<div
			v-if="props.showWarning"
			class="absolute text-[0.75rem] text-[red] top-0 left-[1rem]"
		>
			Email введен не верно
		</div>
		<input
			type="text"
			maxlength="20"
			placeholder="Электронная почта"
			class="p-4 rounded-[30px] w-full rounded-r-[100px]"
			v-model="email"
			@input="emitEmailChange"
		/>
		<button
			v-if="isClient"
			class="absolute p-[1rem] text-white bg-[#316FEE] rounded-[100px] right-0 transition-colors duration-300 ease-linear hover:bg-[#583bcb] xs:px-8 xs:py-4"
			type="submit"
		>
			<img
				v-if="isSmallScreen"
				src="../public/post-arrow.svg"
				alt="post"
			/>
			<span v-else>Подписаться</span>
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { updateScreenSize } from "~/composables/updateScreenSize";

const email = ref("");
const isSmallScreen = ref(false);
const isClient = ref(false);

const props = defineProps({
	showWarning: Boolean,
});

const emit = defineEmits(["update:email"]);

const handleResize = () => {
	isSmallScreen.value = updateScreenSize().width < 480;
};

const addResizeListener = () => {
	window.addEventListener("resize", handleResize);
};

const removeResizeListener = () => {
	window.removeEventListener("resize", handleResize);
};

const emitEmailChange = () => {
	emit("update:email", email.value);
};

// Хук onMounted
onMounted(() => {
	isClient.value = true;
	handleResize();
	addResizeListener();
});

// Хук onUnmounted
onUnmounted(() => {
	removeResizeListener();
});
</script>
