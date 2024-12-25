<template>
	<ul
		ref="slider"
		class="border border-t-0 rounded-bl-md rounded-br-md border-gray-300 w-full h-0 bg-gray-100 overflow-hidden"
	>
		<li
			v-for="child in props.children"
			:key="child.id"
			class="flex items-center justify-between p-4 truncate w-full cursor-pointer bg-gray-100 hover:bg-gray-200 z-10 transition-colors"
		>
			<label class="flex items-center cursor-pointer ml-8">
				<input
					type="checkbox"
					class="hidden"
					v-model="child.isChecked"
					@change="isChildChecked($event, child)"
					aria-label="Выбрать элемент"
				/>
				<div class="relative">
					<div
						class="w-5 h-5 border-2 border-gray-400 rounded-lg flex items-center justify-center transition-colors duration-200"
						:class="{
							'bg-blue-600 border-blue-600': child.isChecked,
							'bg-white border-gray-400': !child.isChecked,
						}"
					>
						<svg
							v-if="child.isChecked"
							class="w-3 h-3 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								d="M7.629 10.413l-2.854-2.853a1 1 0 0 0-1.415 1.415l3.5 3.5a1 1 0 0 0 1.415 0l7.5-7.5a1 1 0 0 0-1.415-1.415l-6.5 6.5z"
							/>
						</svg>
					</div>
				</div>
			</label>
			<a
				:href="`https://www.klerk.ru/${child.url}`"
				target="_blank"
				class="text-blue-600 hover:underline"
			>
				{{ child.title }} ({{ child.count }})
			</a>
		</li>
	</ul>
</template>

<script setup lang="js">
import { ref, watch } from "vue";
import { gsap } from "gsap";

const props = defineProps({
	children: Array,
	showChildren: Boolean
});

const emit = defineEmits(["isChecked", "update:isDisabled"]);

const isChecked = ref(false);
const slider = ref();
const isDisabled = ref(false);

const isChildChecked = (event, child) => {
	isChecked.value = event.target.checked;
	emit("isChecked", isChecked.value ? child.count : -child.count);
};

watch(() => props.showChildren, (newVal) => {
	if (slider.value) {
		isDisabled.value = true;
		if (newVal === true) {
			gsap.to(slider.value, {
				height: "auto",
				duration: 0.6,
				onComplete: () => {
					isDisabled.value = false;
				}
			});
		} else {
			gsap.to(slider.value, {
				height: 0,
				duration: 0.4,
				onComplete: () => {
					isDisabled.value = false;
				}
			});
		}
	}
});

watch(isDisabled, () => {
	emit("update:isDisabled", isDisabled.value);
});
</script>
<style scoped lang="scss"></style>
