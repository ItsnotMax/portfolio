import formsPlugin from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./pages/**/*.{js,ts,vue}",
		"./components/**/*.{js,ts,vue}",
		"./layouts/**/*.{js,ts,vue}",
		"./plugins/**/*.{js,ts,vue}",
		"./app.vue",
	],
	theme: {
		extend: {
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
		},
	},
	plugins: [formsPlugin],
};
