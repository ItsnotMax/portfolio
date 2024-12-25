import { defineEventHandler } from "h3";
import { isEssenceArray } from "~/types/typeguards";

export default defineEventHandler(async() => {
	// какая-то логика проверки
	const response = await $fetch("http://localhost:4000/essences");

	if (isEssenceArray(response)) return response;
	else return ["Произошла ошибка"];
});
