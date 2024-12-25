<template>
	<li class="flex flex-col mb-4">
		<div
			class="relative flex justify-between items-center p-4 bg-gray-200 rounded-tl-lg rounded-tr-lg hover:bg-gray-300 transition duration-150 ease-in-out"
		>
			<label class="flex items-center cursor-pointer">
				<input
					type="checkbox"
					v-model="isParentChecked"
					class="hidden"
					aria-label="Выбрать рубрику"
				/>
				<div class="relative">
					<div
						class="relative w-5 h-5 border-2 border-gray-400 rounded-lg flex items-center justify-center transition-all duration-200"
						:class="{
							'bg-blue-500 border-blue-500': isParentChecked,
							'bg-white': !isParentChecked,
						}"
					></div>
				</div>
			</label>

			<a
				:href="`https://www.klerk.ru/${rubric.url}`"
				target="_blank"
				class="text-blue-600 hover:underline"
			>
				{{ rubric.title }} ({{ rubric.count }}, {{ childCount }})
			</a>
			<SaveButton
				@click="toggleChildren"
				:text="showChildren ? 'Свернуть' : 'Развернуть'"
				:isDisabled="isDisabled"
				class="ml-4"
			/>
		</div>
		<DropdownMenu
			:children="rubric.children"
			:showChildren="showChildren"
			@isChecked="isChildChecked"
			v-model:isDisabled="isDisabled"
		/>
	</li>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import SaveButton from "./SaveButton.vue";
import DropdownMenu from "./DropdownMenu.vue";

const props = defineProps({
	rubric: Object,
	showEmpty: Boolean,
});

const emit = defineEmits(["update-total", "update-child"]);

const showChildren = ref(false);
const isParentChecked = ref(false);
const isDisabled = ref(false);

const childCount = computed(() => {
	return props.rubric.children.reduce((sum, child) => sum + child.count, 0);
});

const toggleChildren = () => {
	showChildren.value = !showChildren.value;
};

watch(isParentChecked, (newVal) => {
	emit("update-total", newVal ? props.rubric.count : -props.rubric.count);
});

const isChildChecked = (count) => {
	emit("update-child", count);
};
</script>

<style scoped>
label {
	cursor: pointer;
}

input[type="checkbox"]:checked + div {
	background-color: transparent;
	border-color: #3b82f6;
}
</style>
