// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	ssr: false,
	css: ["@/assets/main.scss", "@/assets/tailwind.css"],
	postcss: {
		plugins: {
			autoprefixer: {},
			tailwindcss: {},
		},
	},
	build: {
		transpile: ["@pinia/nuxt"],
	},
	modules: ["@pinia/nuxt"],
	// plugins: ["~/plugins/visibility.js"],
	app: {
		baseURL: "/", // Замените <repository-name> на имя вашего репозитория
		// buildAssetsDir: "/<repository-name>/_nuxt/", // Чтобы ресурсы корректно находились
	},
});
