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
			autoprefixer: {},
			tailwindcss: {},
		},
	},
	build: {
		transpile: ["@pinia/nuxt", "@nuxt/static"],
	},
	modules: ["@pinia/nuxt"],
	plugins: ["~/plugins/visibility.js"],
	app: {
		baseURL: "/portfolio/bender/",
		buildAssetsDir: "/docs/",
	},
});
