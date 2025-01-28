import { gsap } from "gsap";

export const toHideAnimate = (toHide, duration) => {
	const tl = gsap.timeline();
	tl.to(toHide, {
		clipPath: "inset(100% 0% 0% 0%)",
		duration: duration,
	});
	return tl;
};
export const toShowAnimate = (toShow, duration) => {
	const tl = gsap.timeline();
	tl.to(toShow, {
		clipPath: "inset(0% 0% 0% 0%)",
		duration: duration,
	});
	return tl;
};
