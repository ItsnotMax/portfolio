// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	ssr: true,
	css: ["@/assets/main.scss", "@/assets/tailwind.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	runtimeConfig: {
		public: {
			postURL: "/api/mockpost",
			getURL: "/api/mock",
		},
	},
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},
});
