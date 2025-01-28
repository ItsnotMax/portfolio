<template lang="html">
	<section ref="container" class="relative min-h-full font-[Merriweather]">
		<h2
			class="text-[#313131] uppercase text-[54px] leading-[120%] mb-[60px]"
		>
			Участники турнира
		</h2>
		<div class="relative flex flex-row h-[462px] font-[Golos]">
			<div
				ref="firstThreeToAnimate"
				class="absolute w-full flex flex-row"
			>
				<div
					class="flex flex-col justify-center items-center min-w-[calc(100%/3)]"
					v-for="(participant, index) in participants.slice(0, 3)"
					:key="index"
					ref="membersRefs"
				>
					<div class="mb-7">
						<img :src="participant.img" alt="participant" />
					</div>
					<h3
						class="font-semibold text-[#313131] text-[24px] leading-[120%] mb-2"
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
						class="reset-btn px-3 py-2 border-[1px] border-solid border-[#3057A2] text-[#3057A2] rounded-[62px] font-medium leading-[120%] text-[16px] hover:bg-[#3057A2] hover:text-[#ffffff] transition-all duration-300"
					>
						Подробнее
					</button>
				</div>
			</div>

			<div
				ref="secondThreeToAnimate"
				class="absolute w-full flex flex-row clip-path-inset-none"
			>
				<div
					class="flex flex-col justify-center items-center min-w-[calc(100%/3)]"
					v-for="(participant, index) in participants.slice(3)"
					:key="index"
					ref="membersRefs"
				>
					<div class="mb-7">
						<img :src="participant.img" alt="participant" />
					</div>
					<h3
						class="font-semibold text-[#313131] text-[24px] leading-[120%] tracking-[-1px] mb-2"
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
						class="reset-btn px-3 py-[6px] border-[1px] border-solid border-[#3057A2] text-[#3057A2] rounded-[62px] font-medium leading-[120%] text-[16px] hover:bg-[#3057A2] hover:text-[#ffffff] transition-all duration-300"
					>
						Подробнее
					</button>
				</div>
			</div>
		</div>
		<div
			class="absolute max-w-[150px] top-[10px] right-[1px] text-[16px] flex flex-row justify-center items-center gap-[14px]"
		>
			<button
				type="button"
				class="group"
				@click.stop="nextMembersHandler"
			>
				<svg
					width="44"
					height="44"
					class="fill-[#313131] group-hover:fill-[#FBCE51] transition-colors duration-300"
				>
					<use xlink:href="/public/sprites.svg#btnLeft"></use>
				</svg>
			</button>
			<div class="flex gap-[4px]">
				<span>{{ countMembersOnDisplay }}</span>
				<span>/</span>
				<span>{{ participants.length }}</span>
			</div>
			<button
				type="button"
				class="group"
				@click.stop="nextMembersHandler"
			>
				<svg
					width="44"
					height="44"
					class="fill-[#313131] group-hover:fill-[#FBCE51] transition-colors duration-300"
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
import { toShowAnimate, toHideAnimate } from "~/composables/animation";

const countMembers = ref(3);
const countMembersOnDisplay = ref(countMembers.value);
const membersRefs = ref([]);
const firstThreeToAnimate = ref();
const secondThreeToAnimate = ref();
const animateFlag = ref(true);
const animateProgress = ref(false);
const container = ref();

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

onMounted(() => {
	let timer;
	const observer = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting) {
			timer = setInterval(nextMembersHandler, 4000);
		} else {
			clearInterval(timer);
		}
	});
	observer.observe(container.value);
	onUnmounted(() => observer.disconnect());
});

function nextMembersHandler() {
	if (!animateProgress.value) {
		animateProgress.value = true;

		const timeline = gsap.timeline();
		const duration = 0.5;

		if (animateFlag.value) {
			timeline.add(
				toHideAnimate(firstThreeToAnimate.value, duration).add(
					toShowAnimate(secondThreeToAnimate.value, duration),
				),
			);
		} else {
			timeline
				.add(toHideAnimate(secondThreeToAnimate.value, duration))
				.add(toShowAnimate(firstThreeToAnimate.value, duration));
		}

		timeline.eventCallback(
			"onStart",
			() =>
				(countMembersOnDisplay.value =
					countMembersOnDisplay.value == membersRefs.value.length
						? countMembers.value
						: countMembersOnDisplay.value + countMembers.value),
		);

		timeline.eventCallback("onComplete", () => {
			animateFlag.value = !animateFlag.value;
			animateProgress.value = false;
		});
	}
}
</script>
<style scoped lang="scss"></style>
