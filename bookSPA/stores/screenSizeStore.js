import { defineStore } from "pinia";
import { ref, onBeforeUnmount, onBeforeMount } from "vue";

export const useScreenStore = defineStore("screen", () => {
	const isMobile = ref(false);
	const isTablet = ref(false);
	const isDesktop = ref(false);

	const mobileQuery = window.matchMedia("(max-width: 480px)");
	const desktopQuery = window.matchMedia("(min-width: 1024px)");

	let listenersAdded = false;

	const updateWidth = () => {
		if (import.meta.client) {
			isMobile.value = mobileQuery.matches;
			isDesktop.value = desktopQuery.matches;
			isTablet.value = isMobile.value || isDesktop.value ? false : true;
		}
	};
	if (!listenersAdded) {
		mobileQuery.addEventListener("change", updateWidth);
		desktopQuery.addEventListener("change", updateWidth);
		listenersAdded = true;
	}
	onBeforeMount(() => {
		updateWidth();
	});

	onBeforeUnmount(() => {
		if (listenersAdded) {
			mobileQuery.removeEventListener("change", updateWidth);
			desktopQuery.removeEventListener("change", updateWidth);
			listenersAdded = false;
		}
	});

	return { isMobile, isTablet, isDesktop };
});
