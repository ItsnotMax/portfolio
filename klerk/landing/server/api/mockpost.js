import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async(event) => {
	try {
		const body = await readBody(event);

		if (!body || Object.keys(body).length === 0) {
			return {
				statusCode: 400,
				message: "Нет данных для обработки",
			};
		}

		return {
			statusCode: 200,
			message: "Данные успешно получены",
		};
	// eslint-disable-next-line no-unused-vars
	} catch (error) {
		return {
			statusCode: 500,
			message: "Произошла неожиданная ошибка",
		};
	}
});
