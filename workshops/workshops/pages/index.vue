<template>
	<ModalWindow>
		<form
			@submit.prevent="saveToCookies"
			class="flex flex-col w-[50%] mx-auto p-6 bg-white rounded-lg shadow-md cursor-default"
		>
			<label
				for="город"
				class="block text-lg font-semibold mb-2 cursor-default"
			>
				Город:
			</label>
			<select
				v-model="form.selectedCity"
				id="город"
				class="w-full p-2 border border-gray-300 rounded-md mb-4 cursor-pointer"
				required
			>
				<option v-show="!mock" value="" disabled>Выберите город</option>
				<option v-for="(_, key) in mock.workspaces" :key="key">
					{{ key }}
				</option>
			</select>

			<label
				for="цех"
				class="block text-lg font-semibold mb-2 cursor-default"
			>
				Цех:
			</label>
			<select
				v-model="form.selectedFactory"
				id="цех"
				class="w-full p-2 border border-gray-300 rounded-md mb-4"
				:class="{
					'cursor-not-allowed': !form.selectedCity,
					'cursor-pointer': form.selectedCity,
				}"
				required
				:disabled="!form.selectedCity"
			>
				<option v-show="!mock" value="" disabled>Выберите цех</option>
				<option v-for="(_, key) in currentFactories" :key="key">
					{{ key }}
				</option>
			</select>

			<label
				for="сотрудник"
				class="block text-lg font-semibold mb-2 cursor-default"
			>
				Сотрудник:
			</label>
			<select
				v-model="form.selectedEmployee"
				id="сотрудник"
				class="w-full p-2 border border-gray-300 rounded-md mb-4"
				:class="{
					'cursor-not-allowed':
						!form.selectedCity || !form.selectedFactory,
					'cursor-pointer': form.selectedCity && form.selectedFactory,
				}"
				required
				:disabled="!form.selectedCity || !form.selectedFactory"
			>
				<option v-show="!mock" value="" disabled>
					Выберите сотрудника
				</option>
				<option v-for="employee in currentEmployees" :key="employee">
					{{ employee }}
				</option>
			</select>

			<label
				for="бригада"
				class="block text-lg font-semibold mb-2 cursor-default"
			>
				Бригада:
			</label>
			<select
				v-model="form.selectedTeam"
				id="бригада"
				class="w-full p-2 border border-gray-300 rounded-md mb-4"
				:class="{
					'cursor-not-allowed': !form.selectedCity,
					'cursor-pointer': form.selectedCity,
				}"
				:disabled="!form.selectedCity"
			>
				<option v-show="!form.selectedCity" value="">
					Выберите бригаду
				</option>
				<option v-for="team in mock.teams" :key="team">
					{{ team }}
				</option>
			</select>

			<label
				for="смена"
				class="block text-lg font-semibold mb-2 cursor-default"
			>
				Смена:
			</label>
			<select
				v-model="form.selectedShift"
				id="смена"
				class="w-full p-2 border border-gray-300 rounded-md mb-4"
				:class="{
					'cursor-not-allowed': !form.selectedCity,
					'cursor-pointer': form.selectedCity,
				}"
				:disabled="!form.selectedCity"
			>
				<option v-show="!form.selectedCity" value="">
					Выберите смену
				</option>
				<option v-for="shift in mock.shifts" :key="shift">
					{{ shift }}
				</option>
			</select>

			<button
				type="submit"
				class="reset-btn w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 not-allocated"
				:disabled="!isFormValid"
				:class="{ 'cursor-not-allowed': !isFormValid }"
			>
				Сохранить
			</button>
		</form>
	</ModalWindow>
</template>

<script setup>
useHead({
	title: "Форма для выбора города, цеха и сотрудника",
	meta: [
		{
			name: "description",
			content:
				"Заполните форму для выбора города, цеха, сотрудника, бригады и смены.",
		},
		{
			name: "robots",
			content: "index, follow",
		},
		{
			name: "keywords",
			content: "форма, город, цех, сотрудник, смена, бригада",
		},
	],
});

import { reactive, computed, watch } from "vue";
import ModalWindow from "~/components/ModalWindow.vue";

const config = useRuntimeConfig();

const form = reactive({
	selectedCity: "",
	selectedFactory: "",
	selectedEmployee: "",
	selectedTeam: "",
	selectedShift: "",
});

watch(
	() => form.selectedCity,
	(newVal, oldVal) => {
		if (newVal !== oldVal && oldVal !== "") {
			Object.keys(form).forEach((key) => {
				if (key !== "selectedCity") {
					form[key] = "";
				}
			});
		}
	},
);

const { data: mock } = await useAsyncData("mock", async() => {
	try {
		return await $fetch(config.public.getURLmock);
	} catch (err) {
		console.log(err);
		return {};
	}
});

const currentFactories = computed(() =>
	form.selectedCity ? mock.value.workspaces[form.selectedCity] : [],
);
const currentEmployees = computed(() =>
	form.selectedCity && form.selectedFactory
		? mock.value.workspaces[form.selectedCity][form.selectedFactory]
		: [],
);

const isFormValid = computed(() => {
	return Object.values(form).every((value) => value);
});

function saveToCookies() {
	const formData = {
		selectedCity: form.selectedCity,
		selectedFactory: form.selectedFactory,
		selectedEmployee: form.selectedEmployee,
		selectedTeam: form.selectedTeam,
		selectedShift: form.selectedShift,
	};

	const formDataString = JSON.stringify(formData);

	document.cookie = `formData=${encodeURIComponent(formDataString)}; max-age=${60 * 60 * 24 * 7}; path=/`;
	form.selectedCity = "";
	alert("Данные сохранены в Cookie");
}
</script>
