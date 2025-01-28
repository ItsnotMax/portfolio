export default {
	mounted(el, binding) {
		el.style.visibility = binding.value ? "visible" : "hidden";
	},
	updated(el, binding) {
		el.style.visibility = binding.value ? "visible" : "hidden";
	},
};
