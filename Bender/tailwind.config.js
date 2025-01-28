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
				xs: "376px",
				sm: "641px",
				md: "901px",
				lg: "1025px",
				xl: "1500px",
			},
		},
	},
	plugins: [],
};
