import { defineEventHandler } from "h3";
import { isString } from "~/types/typeguards";

export default defineEventHandler(async(event) => {
	const data = await readBody(event);
	// какая-то логика проверки перед отправкой запроса
	if (isString(data)) {
		const body = { essence: data };
		try {
			const response = await $fetch("http://localhost:4000/posting", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			return response;
		} catch (error) {
			console.error("Ошибка при выполнении POST запроса:", error);
		}
	}
});
