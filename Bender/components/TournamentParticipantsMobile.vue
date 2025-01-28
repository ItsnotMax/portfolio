<template lang="html">
	<section class="font-[Merriweather] mb-[53px]">
		<h2
			class="text-[#313131] uppercase text-[36px] leading-[112%] mb-[39px]"
		>
			Участники турнира
		</h2>
		<div
			class="relative flex flex-row  mb-10 min-h-[388px]"
			ref="carousel"
		>
			<div
				v-for="(participant, index) in participants"
				class="absolute flex flex-col justify-center items-center min-w-full font-[Golos]"
				:class="{ 'opacity-0': index != 0 }"
				:key="index"
				ref="membersRefs"
			>
				<div class="mb-[30px] w-[244px]">
					<img :src="participant.img" alt="participant" />
				</div>
				<h3
					class="font-semibold text-[#313131] text-[24px] leading-[120%] mb-[10px]"
				>
					{{ participant.name }}
				</h3>
				<p
					class="mb-5 text-[rgba(49,49,49,0.6)] text-[20px] leading-[120%]"
				>
					{{ participant.who }}
				</p>
				<button
					type="button"
					class="reset-btn px-3 py-[6px] border-[1px] border-solid border-[#3057A2] text-[#3057A2] rounded-[62px] font-medium leading-[120%] text-[16px]"
				>
					Подробнее
				</button>
			</div>
		</div>
		<div
			class="relative mx-auto min-w-[150px] text-[16px] flex flex-row justify-center items-center gap-[15px] font-[Golos]"
		>
			<button
				type="button"
				class="group"
				:disabled="isAnimate"
				@click.stop="manualShift().prev"
			>
				<svg
					width="36"
					height="36"
					class="fill-[#313131] transition-colors duration-300"
				>
					<use xlink:href="/public/sprites.svg#btnLeft"></use>
				</svg>
			</button>
			<div class="flex justify-center items-center min-w-[35px] gap-[2px]">
				<span>{{ start + 1 }}</span>
				<span>/</span>
				<span>{{ participants.length }}</span>
			</div>
			<button
				type="button"
				class="group"
				@click.stop="manualShift().next"
			>
				<svg
					width="36"
					height="36"
					class="fill-[#313131] transition-colors duration-300"
				>
					<use xlink:href="/public/sprites.svg#btnRight"></use>
				</svg>
			</button>
		</div>
	</section>
</template>
<script setup lang="js">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

const start = ref(0);
const membersRefs = ref([]);
const isAnimate = ref(false);
const carousel = ref();
const intervalId = ref();
const timeoutId = ref();
const intervalTime = ref(4000);

const increment = () => {
	if (start.value < membersRefs.value.length - 1) {
		++start.value;
	} else {
		start.value = 0;
	}
};
const decrement = () => {
	if (start.value > 0) {
		--start.value;
	} else {
		start.value = participants.value.length - 1;
	}
};

function manualShift() {
	clearInterval(intervalId.value);
	clearTimeout(timeoutId.value);

	return {
		next: () => {
			if (!isAnimate.value) shift().next();

			timeoutId.value = setTimeout(() => {
				intervalId.value = setInterval(
					shift().next,
					intervalTime.value,
				);
			}, 10000);
		},
		prev: () => {
			if (!isAnimate.value) shift().prev();

			timeoutId.value = setTimeout(() => {
				intervalId.value = setInterval(
					shift().next,
					intervalTime.value,
				);
			}, 10000);
		},
	};
}

function shift() {
	return {
		prev: () => {
			isAnimate.value = true;
			const fromDisplay = membersRefs.value[start.value];
			const toDisplay =
				membersRefs.value[start.value - 1] ||
				membersRefs.value[membersRefs.value.length - 1];

			gsap.to(fromDisplay, { xPercent: 100, duration: 1 });
			gsap.fromTo(
				toDisplay,
				{
					xPercent: -100,
				},
				{
					xPercent: 0,
					duration: 1,
					onStart() {
						decrement();
						gsap.set(toDisplay, { opacity: 1 });
					},
					onComplete() {
						isAnimate.value = false;
					},
				},
			);
		},
		next: () => {
			isAnimate.value = true;
			const fromDisplay = membersRefs.value[start.value];
			const toDisplay =
				membersRefs.value[start.value + 1] || membersRefs.value[0];

			gsap.to(fromDisplay, { xPercent: -100, duration: 1 });
			gsap.fromTo(
				toDisplay,
				{
					xPercent: 100,
				},
				{
					xPercent: 0,
					duration: 1,
					onStart() {
						increment();
						gsap.set(toDisplay, { opacity: 1 });
					},
					onComplete() {
						isAnimate.value = false;
					},
				},
			);
		},
	};
}
onMounted(() => {
	const observer = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting) {
			clearTimeout(timeoutId.value);
			intervalId.value = setInterval(shift().next, intervalTime.value);
		} else {
			clearInterval(intervalId.value);
		}
	});
	observer.observe(carousel.value);
	onUnmounted(() => observer.disconnect());
});
const participants = ref([
	{
		img: "./participant-image.png",
		name: "Хозе-Рауль Капабланка",
		who: "Чемпион мира по шахматам",
	},
	{
		img: "./participant-image.png",
		name: "Эммануил Ласкер",
		who: "Чемпион мира по шахматам",
	},
	{
		img: "./participant-image.png",
		name: "Александр Алехин",
		who: "Чемпион мира по шахматам",
	},
	{
		img: "./participant-image.png",
		name: "Арон Нимцович",
		who: "Чемпион мира по шахматам",
	},
	{
		img: "./participant-image.png",
		name: "Рихард Рети",
		who: "Чемпион мира по шахматам",
	},
	{
		img: "./participant-image.png",
		name: "Остап Бендер",
		who: "Гроссмейстер",
	},
]);
</script>
<style scoped lang="scss"></style>
