<template>
	<div class="p-4 bg-white shadow rounded-lg">
		<div class="flex items-center mb-4">
			<label class="flex items-center cursor-pointer">
				<input type="checkbox" v-model="showEmpty" class="hidden" />
				<div class="slider" :class="{ active: showEmpty }"></div>
				<span class="text-gray-700 ml-2">
					{{
						showEmpty
							? "Пустые рубрики отображаются"
							: "Пустые рубрики скрыты"
					}}
				</span>
			</label>
		</div>

		<div class="mb-4">
			<strong class="block text-lg">
				Сумма рубрик:
				<span class="text-blue-600">{{ totalCount }}</span>
			</strong>
			<strong class="block text-lg">
				Сумма дочерних элементов:
				<span class="text-blue-600">{{ childCount }}</span>
			</strong>
		</div>

		<ul v-if="rubrics.length > 0" class="space-y-2">
			<RubricItem
				v-for="rubric in filteredRubrics"
				:key="rubric.id"
				:rubric="rubric"
				:show-empty="showEmpty"
				@update-total="updateTotal"
				@update-child="updateChild"
				class="rounded-lg bg-gray-100 p-4 transition duration-150 ease-in-out"
			/>
		</ul>
		<div v-else class="flex justify-center items-center my-16">
			<LoadingSpinner :size="'120px'" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import RubricItem from "./RubricItem.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const showEmpty = ref(false);
const rubrics = ref([]);
const totalCount = ref(0);
const childCount = ref(0);

const fetchRubrics = async() => {
	const response = await fetch(
		`https://www.klerk.ru/yindex.php/v3/event/rubrics?allowEmpty=${
			showEmpty.value ? 1 : 0
		}`
	);
	const data = await response.json();
	rubrics.value = data;
};

onBeforeMount(fetchRubrics);

const filteredRubrics = computed(() => {
	return showEmpty.value
		? rubrics.value
		: rubrics.value.filter(
				(rubric) =>
					rubric.count > 0 && Object.keys(rubric.children).length > 0
		  );
});

const updateTotal = (count) => {
	totalCount.value += count;
};
const updateChild = (count) => {
	childCount.value += count;
};
</script>

<style scoped>
.slider {
	width: 50px;
	height: 25px;
	background-color: #ccc;
	border-radius: 25px;
	position: relative;
	transition: background-color 0.3s;
}

.slider::before {
	content: "";
	position: absolute;
	width: 20px;
	height: 20px;
	background-color: white;
	border-radius: 50%;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	transition: transform 0.3s;
}

.slider.active {
	background-color: #4caf50;
}

.slider.active::before {
	transform: translate(30px, -50%);
}
</style>
