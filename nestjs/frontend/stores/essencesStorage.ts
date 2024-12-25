import { defineStore } from "pinia";
import type { CreatedEssence, ServerResponse } from "~/types/types";
import { ref } from "vue";

export const essencesStorage = defineStore("myStore", () => {
	const storage = ref<CreatedEssence[]>([]);

	const saveEssence = (
		essence: ServerResponse,
		selectedEntity: string
	): void => {
		storage.value.unshift({
			id: essence.id,
			essence: selectedEntity,
			request_id: essence.request_id,
			link: essence._links.self.href,
		});
	};

	const getEssences = (): CreatedEssence[] => {
		return storage.value;
	};

	return {
		getEssences,
		saveEssence,
	};
});
