<template>
	<div class="relative w-[19rem] h-[inherit]">
		<button
			type="button"
			class="flex w-[inherit] items-center p-4 border rounded-tl-md rounded-tr-md border-gray-300 bg-gray-100 justify-between hover:bg-gray-200"
			:class="{ 'rounded-md': !isOpen }"
			@click="toggleDropdown"
		>
			<span class="truncate">{{
				selectedItem || props.essences[0].slug
			}}</span>
			<img v-if="!isOpen" class="ml-2" src="/arrow-down.svg" alt="down" />
			<img v-else class="ml-2" src="/arrow-up.svg" alt="up" />
		</button>
		<ul
			ref="slider"
			class="relative border border-t-0 rounded-bl-md rounded-br-md border-gray-300 w-[inherit] bg-gray-100 overflow-hidden h-[0rem] z-10"
		>
			<li
				v-for="(essence, index) in props.essences"
				:key="Object.keys(essence)[0]"
				@click="
					selectItem(
						Object.values(essence)[0],
						Object.keys(essence)[0]
					)
				"
				class="relative flex items-center justify-between p-4 truncate w-[inherit] cursor-pointer bg-gray-100 hover:bg-gray-200 z-10"
			>
				<span class="truncate">{{ Object.values(essence)[0] }}</span>
				<img
					v-if="
						selectedItem === Object.values(essence)[0] &&
						index !== 0
					"
					src="/check-mark.svg"
					alt="check"
				/>
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { isNull } from "~/types/typeguards";
import { gsap } from "gsap";
import type { Essences } from "~/types/types";

const props = defineProps<{
	essences: Essences;
}>();
const emit = defineEmits(["update:selectedEntity"]);
const selectedItem = ref<null | string>(null);
const selectedKey = ref<null | string>(null);
const isOpen = ref<boolean>(false);
const slider = ref<HTMLElement | null>(null);

watch(selectedItem, (newVal) => {
	if (!isNull(newVal) && newVal !== props.essences[0].slug) {
		emit("update:selectedEntity", [selectedKey.value, selectedItem.value]);
	} else {
		emit("update:selectedEntity", null);
	}
});

const toggleDropdown = (): void => {
	isOpen.value = !isOpen.value;
};

const selectItem = (item: string, key: string): void => {
	selectedItem.value = item;
	selectedKey.value = key;
	isOpen.value = false;
};

watch(isOpen, (newVal) => {
	if (slider.value) {
		if (newVal === true) {
			gsap.to(slider.value, {
				height: "auto",
				duration: 0.5,
			});
		} else {
			gsap.to(slider.value, {
				height: 0,
				duration: 0.2,
			});
		}
	}
});
</script>
<style scoped lang="scss"></style>
