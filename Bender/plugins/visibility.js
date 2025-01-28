import VisibilityDirective from "~/directives/visibility";

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("visibility", VisibilityDirective);
});
