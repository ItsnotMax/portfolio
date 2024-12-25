<template lang="html">
	<label class="flex items-center cursor-pointer w-[fit-content]">
		<!-- Скрытый checkbox для управления состоянием -->
		<input
			type="checkbox"
			v-model="isChecked"
			class="hidden"
			@change="onChange"
		/>
		<!-- Стилизованный переключатель -->
		<div
			class="slider"
			:class="{ active: isChecked }"
			:style="{ width: sliderWidth, height: sliderHeight }"
		>
			<div class="toggle-thumb" :style="thumbStyles"></div>
		</div>
		<!-- Текстовая метка рядом с переключателем -->
		<span class="font-[500] text-[14px] leading-5 ml-2">
			{{ label }}
		</span>
	</label>
</template>

<script setup lang="js">
import { ref, computed, watch } from "vue";

const props = defineProps({
	label: String,
	id: String,
	isMainWidget: { type: Boolean, default: false },
	chosenAllMailings: { type: Boolean, default: false },
	sliderWidth: { type: String, default: "48px" },
	sliderHeight: { type: String, default: "24px" },
	thumbWidth: { type: String, default: "22px" },
	thumbHeight: { type: String, default: "22px" },
});

const emit = defineEmits(["update:choseAllMailings", "update:choseMailing"]);

const isChecked = ref(false);

const onChange = () => {
	if (props.isMainWidget) {
		emit("update:choseAllMailings", isChecked.value);
	} else {
		emit("update:choseMailing", props.id);
	}
};

watch(
	() => props.chosenAllMailings,
	(newVal) => {
		isChecked.value = newVal;
	}
);

const thumbStyles = computed(() => {
	const sliderWidthValue = parseFloat(props.sliderWidth);
	const thumbWidthValue = parseFloat(props.thumbWidth);
	return {
		width: props.thumbWidth,
		height: props.thumbHeight,
		transform: isChecked.value
			? `translate(${sliderWidthValue - thumbWidthValue}px, -50%)`
			: "translate(0, -50%)",
	};
});
</script>

<style scoped lang="scss">
.slider {
	background-color: #dcdcdc;
	border-radius: 25px;
	position: relative;
	transition: background-color 0.3s;
}

.toggle-thumb {
	content: "";
	position: absolute;
	background-color: white;
	border-radius: 50%;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	transition: transform 0.3s;
	width: inherit;
	height: inherit;
}

.slider.active {
	background-color: #316fee;
}
</style>
