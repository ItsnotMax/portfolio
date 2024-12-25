import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts,vue}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/essential"],
	{ files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
	{
		rules: {
			"no-console": "off",
			"quotes": ["error", "double"],
			"space-before-function-paren": ["error", "never"],
			"vue/multi-word-component-names": ["error", {
				"ignores": ["default", "index"]
			}],
			"vue/singleline-html-element-content-newline": "off",
			"vue/multiline-html-element-content-newline": "off",
			"vue/html-closing-bracket-newline": ["error", {
				"multiline": "always",
				"singleline": "never"
			}]
		}
	},
];
