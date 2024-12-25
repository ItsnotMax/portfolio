<template>
	<div class="flex relative justify-between items-center h-[4rem] mb-4">
		<DropdownMenu
			:essences="essences as Essences"
			v-model:selectedEntity="selectedEntity"
		/>
		<SaveButton
			:text="'Создать'"
			:disabled="!isNull(selectedEntity) ? false : true"
			v-model:posting="posting"
		/>
	</div>
	<div class="relative z-0">
		<EssencesList :essencesList="сreatedEssencesRef" />
	</div>
</template>

<script setup lang="ts">
useHead({
	title: "AmoCRM POST",
	meta: [
		{
			name: "description",
			content: "Создание сущностей в AmoCRM с помощью API",
		},
		{
			name: "keywords",
			content: "AmoCRM, API, POST, сделка, контакт, компания",
		},
		{ name: "author", content: "Максим Ушаков" },
	],
});
import { useHead, useFetch } from "#app";
import { ref, watch } from "vue";
import DropdownMenu from "~/components/DropdownMenu.vue";
import EssencesList from "~/components/EssencesList.vue";
import SaveButton from "~/components/SaveButton.vue";
import { isNull } from "~/types/typeguards";
import type { CreatedEssence, Essences } from "~/types/types";
import { essencesStorage } from "~/stores/essencesStorage";

const store = essencesStorage();
const selectedEntity = ref<null | string[]>(null);
const posting = ref<boolean>(false);
const сreatedEssencesRef = ref<CreatedEssence[]>(store.getEssences());
const { data: essences } = await useFetch<Essences>("/api/essences");

watch(posting, async(newVal) => {
	if (newVal && !isNull(selectedEntity.value)) {
		try {
			const response = await fetch("/api/posting", {
				method: "POST",
				headers: {
					"Content-Type": "text/plain",
				},
				body: selectedEntity.value[0],
			});

			if (response.ok) {
				const responseJSON = await response.json();

				store.saveEssence(
					responseJSON.data[0],
					selectedEntity.value[1]
				);

				сreatedEssencesRef.value = store.getEssences();

				console.log("Запрос успешно выполнен");
			} else {
				console.error("Ошибка при выполнении запроса");
			}
		} catch (error) {
			console.error("Ошибка запроса:", error);
			posting.value = false;
		} finally {
			// имитация ожидания ответа
			setTimeout(() => {
				posting.value = false;
			}, 1000);
		}
	}
});
</script>
<style scoped></style>
