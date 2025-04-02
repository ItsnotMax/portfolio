import { getRandomLetter } from "~/utils/random";
import { gsap } from "gsap";

export function splitText(text, document) {
	const container = [];

	Array.from(text).forEach((symbol) => {
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.justifyContent = "center";

		if (symbol === " ") {
			div.innerHTML = "&nbsp;";
		} else {
			div.textContent = symbol;
		}

		container.push(div);
	});
	return container;
}

export function createMixedTextPrintingTimeline(div, container) {
	const tl = gsap.timeline();

	const repeatCount = 2;
	const originalText = div.textContent;
	const isUpperCase = originalText === originalText.toUpperCase();

	tl.set(div, { width: 8 });
	tl.add(() => container.appendChild(div));

	for (let i = 0; i < repeatCount; i++) {
		tl.to(div, {
			textContent: isUpperCase
				? getRandomLetter().toUpperCase()
				: getRandomLetter(),
			duration: 0.05,
		});
	}

	tl.to(div, {
		duration: 0.05,
		onStart: () => {
			tl.set(div, { width: "inherit" });
			div.textContent = originalText;
		},
	});

	return tl;
}

export function animate(splitedText, container) {
	const timeline = gsap.timeline();

	splitedText.forEach((div) => {
		timeline.add(createMixedTextPrintingTimeline(div, container), ">");
	});
	return timeline;
}
