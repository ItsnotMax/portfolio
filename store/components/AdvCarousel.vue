<template lang="html">
	<div class="relative w-full">
		<div class="relative w-full">
			<h2
				class="text-xl font-bold text-blue-700 px-4 py-6 shadow-sm uppercase sm:mb-16"
			>
				Вас также может заинтересовать:
			</h2>
		</div>

		<div
			class="relative w-full h-fit overflow-x-clip not-scrollbar"
			@wheel.prevent="handleScroll"
		>
			<div
				v-show="screenWidth < 1024"
				class="absolute w-full h-full flex justify-between gap-9 top-1/2 -translate-y-1/2 px-3 sm:px-8 z-[100] pointer-events-none"
			>
				<button
					@click="prev"
					type="button"
					class="w-1/6 text-left rounded-2xl pointer-events-auto bg-gradient-to-r active:from-black/10 active:to-transparent disabled:invisible"
					:disabled="centerIndex === 0"
				>
					<Icon
						name="streamline:interface-arrows-button-right-arrow-right-keyboard"
						class="rotate-180 w-10 h-10 text-[white]"
					/>
				</button>

				<button
					@click="next"
					type="button"
					class="w-1/6 text-right rounded-2xl pointer-events-auto bg-gradient-to-l active:from-black/10 active:to-transparent disabled:invisible"
					:disabled="centerIndex === images.length - 1"
				>
					<Icon
						name="streamline:interface-arrows-button-right-arrow-right-keyboard"
						class="w-10 h-10 text-[white]"
					/>
				</button>
			</div>
			<div
				v-show="isVisible"
				ref="carousel"
				class="relative w-full flex items-center py-12"
			>
				<a
					v-for="(image, index) in images"
					:href="index === centerIndex ? '/portfolio/store/' : null"
					:key="index"
					ref="carouselItems"
					class="flex items-center"
					:class="[
						screenWidth >= 1024
							? 'min-w-[calc((100%/7))]'
							: 'min-w-[calc((100%/3))]',
						index === centerIndex ? 'pointer' : null,
					]"
				>
					<img
						:src="image.src"
						:alt="image.alt"
						loading="lazy"
						class="rounded-lg object-cover select-none"
					/>
				</a>
			</div>

			<LoadingCircle v-if="!isVisible" />
		</div>
	</div>
</template>

<script setup>
import gsap from "gsap";
import { ref, onMounted, watch } from "vue";
import LoadingCircle from "./LoadingCircle.vue";
const images = [
	{ src: "../store/adv/img1.jpg", alt: "Image 1" },
	{ src: "../store/adv/img2.jpg", alt: "Image 2" },
	{ src: "../store/adv/img3.jpg", alt: "Image 3" },
	{ src: "../store/adv/img1.jpg", alt: "Image 4" },
	{ src: "../store/adv/img2.jpg", alt: "Image 5" },
	{ src: "../store/adv/img3.jpg", alt: "Image 6" },
	{ src: "../store/adv/img2.jpg", alt: "Image 7" },
	{ src: "../store/adv/img3.jpg", alt: "Image 8" },
	{ src: "../store/adv/img1.jpg", alt: "Image 9" },
	{ src: "../store/adv/img1.jpg", alt: "Image 10" },
];

const screenWidth = useState("screenWidth");
const carousel = ref(null);
const carouselItems = ref(null);
const isVisible = ref(false);
const centerIndex = ref(screenWidth.value >= 1024 ? 3 : 1);
const timeline = gsap.timeline();
let prevDirection = null;

const setParams = (itemsProxy) => {
	Array.from(itemsProxy).forEach((item, index) => {
		gsap.set(item, {
			...getScaleClass(index),
		});
	});
};

onMounted(() => {
	setTimeout(() => {
		isVisible.value = true;
	}, 1000);
	setParams(carouselItems.value);
});

watch(screenWidth, () => {
	centerIndex.value = screenWidth.value >= 1024 ? 3 : 1;
	setParams(carouselItems.value);
});

const getScaleClass = (index) => {
	const distance = Math.abs(index - centerIndex.value);
	if (distance === 0)
		return {
			scale: screenWidth.value >= 1024 ? 2 : 2,
			opacity: 1,
			zIndex: 9999,
			filter: "blur(0px)",
		};
	if (distance === 1)
		return {
			scale: screenWidth.value >= 1024 ? 1 : 0.75,
			opacity: 0.9,
			zIndex: 10,
			filter: "blur(2px)",
		};
	if (distance === 2)
		return {
			scale: 0.75,
			opacity: 0.75,
			zIndex: 0,
			filter: "blur(4px)",
		};
	if (distance === 3)
		return { scale: 0.5, opacity: 0.6, zIndex: -10, filter: "blur(8px)" };
	return { scale: 0.25, opacity: 0.5, zIndex: -20, filter: "blur(16px)" };
};
const carouselShift = (xOffset, carouselItemsArray, duration = 0.5) => {
	const tl = gsap.timeline();
	if (!timeline.isActive()) {
		timeline.clear();
	}

	tl.to(carousel.value, {
		x: `+=${xOffset}`,
		duration: duration,
		ease: "linear",
	});
	Array.from(carouselItemsArray).forEach((item, index) => {
		tl.to(
			item,
			{
				...getScaleClass(index),
				duration: duration,
				ease: "linear",
			},
			"<",
		);
	});
	return tl;
};

const killTimeline = (timeline, imagesArray, apndx = 2) => {
	let count = 0;
	timeline.getChildren().forEach((child) => {
		if (child.progress() === 0) {
			count += 1;
			child.kill();
		}
	});
	return count / (imagesArray.length + apndx); // 1 - timeline, 1 - div carousel
};
const getImageWidth = (carouselItems) => {
	const carouselElement = carouselItems[0];
	return carouselElement ? carouselElement.offsetWidth : 0;
};
const prev = () => {
	const imageWidth = getImageWidth(carouselItems.value);
	if (centerIndex.value <= 0) return;

	const direction = 1;

	if (prevDirection == null) {
		prevDirection = direction;
	}
	if (direction !== prevDirection) {
		const center = killTimeline(timeline, images);
		centerIndex.value = centerIndex.value - direction * center;
		prevDirection = direction;
	}

	centerIndex.value -= 1;
	timeline.add(carouselShift(imageWidth, carouselItems.value), ">");
};
const next = () => {
	const imageWidth = getImageWidth(carouselItems.value);
	if (centerIndex.value >= images.length - 1) return;

	const direction = -1;

	if (prevDirection == null) {
		prevDirection = direction;
	}
	if (direction !== prevDirection) {
		const center = killTimeline(timeline, images);
		centerIndex.value = centerIndex.value - direction * center;
		prevDirection = direction;
	}

	centerIndex.value += 1;
	timeline.add(carouselShift(-imageWidth, carouselItems.value), ">");
};
function handleScroll(event) {
	const imageWidth = getImageWidth(carouselItems.value);
	if (imageWidth === 0) return;

	const direction = event.deltaY > 0 ? -1 : 1;

	if (prevDirection == null) {
		prevDirection = direction;
	}

	if (direction !== prevDirection) {
		const center = killTimeline(timeline, images);
		centerIndex.value = centerIndex.value - direction * center;
		prevDirection = direction;
	}

	if (centerIndex.value > 0 && centerIndex.value < images.length - 1) {
		centerIndex.value = centerIndex.value - direction;
		timeline.add(
			carouselShift(direction * imageWidth, carouselItems.value),
			">",
		);
	} else if (centerIndex.value === 0 && direction === -1) {
		centerIndex.value = centerIndex.value - direction;
		timeline.add(carouselShift(-imageWidth, carouselItems.value), ">");
	} else if (centerIndex.value === images.length - 1 && direction === 1) {
		centerIndex.value = centerIndex.value - direction;
		timeline.add(carouselShift(imageWidth, carouselItems.value), ">");
	}
}
</script>
