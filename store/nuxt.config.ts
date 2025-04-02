// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	ssr: false,
	nitro: {
		prerender: {
			crawlLinks: true,
			failOnError: false,
		},
	},
	css: ["@/assets/main.scss", "@/assets/tailwind.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	build: {
		transpile: ["@pinia/nuxt", "@nuxt/static"],
	},
	modules: ["@nuxt/eslint", "@nuxt/icon"],
	// plugins: ["~/plugins/visibility.js"],
	app: {
		baseURL: "/portfolio/store/",
		buildAssetsDir: "/docs/",
	},
});
