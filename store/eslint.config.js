import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";

export default [
	{ files: ["**/*.{js,mjs,cjs,vue}"] },
	pluginJs.configs.recommended,
	...pluginVue.configs["flat/essential"],
	prettier,
	{
		files: ["**/*.vue"],
		languageOptions: {
			globals: {
				...globals.browser,
				useRuntimeConfig: "readonly",
				useAsyncData: "readonly",
				$fetch: "readonly",
				useHead: "readonly",
				nextTick: "readonly",
				useError: "readonly",
				useState: "readonly"
			},
		},
	},
	{
		rules: {
			"no-console": "off",
			quotes: ["error", "double"],
			"space-before-function-paren": [
				"error",
				{ anonymous: "never", named: "never", asyncArrow: "always" },
			],
			"vue/multi-word-component-names": [
				"error",
				{
					ignores: ["default", "index", "error"],
				},
			],
			"vue/singleline-html-element-content-newline": "off",
			"vue/multiline-html-element-content-newline": "off",
			"vue/order-in-components": [
				"error",
				{
					order: [
						"name",
						"props",
						"emits",
						"data",
						"computed",
						"watch",
						"methods",
						"render",
					],
				},
			],
			"vue/html-closing-bracket-newline": [
				"error",
				{
					multiline: "always",
					singleline: "never",
				},
			],
		},
	},
];
