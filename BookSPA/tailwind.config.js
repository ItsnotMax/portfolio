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
			willChange: {
				transform: "transform",
			},
			screens: {
				xs: "381px",
				sm: "641px",
				md: "801px",
				lg: "1025px",
				xl: "1280px",
			},
		},
	},
	plugins: [],
};
