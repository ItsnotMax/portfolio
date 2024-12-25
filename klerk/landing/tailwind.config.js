/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./components/**/*.{vue,js,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./app.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		extend: {
			letterSpacing: {
				tighterCustom: "-1px",
			},
			colors: {
				activeLink: "#5a8cf1",
				customGray: "#999999",
				customLightGray: "#666666",
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
			screens: {
				xs: "480px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
				"3xl": "1920px",
			},
		},
	},
	plugins: [],
};
