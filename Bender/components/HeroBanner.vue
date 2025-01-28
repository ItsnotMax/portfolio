<template>
	<section
		class="hero-warp font-[Golos] min-h-[774px] py-[18px] px-[20px] sm:py-[26px] md:px-[72px] sm:min-h-[700px] xl:px-[348.5px]"
	>
		<div class="sm:max-w-[542px]">
			<div
				class="max-w-[100px] flex flex-row justify-start items-center mb-[42px] gap-[6.5px] sm:mb-[62px] sm:max-w-[246px]"
			>
				<div
					ref="logo"
					class="flex clip-path-inset-none gap-[1px] sm:gap-0"
				>
					<svg
						:width="isMobile ? '19' : '23'"
						:height="isMobile ? '27' : '31'"
						v-for="_ in 4"
						:key="_"
					>
						<use xlink:href="/sprites.svg#horse"></use>
					</svg>
				</div>

				<h1
					ref="h1Title"
					class="font-bold leading-[109%] clip-path-inset-none__bottom text-[14px] tracking-[0.3px] sm:text-[17px] sm:tracking-[0px]"
				>
					КЛУБ ЧЕТЫРЕХ&nbsp;КОНЕЙ
				</h1>
			</div>
			<h2
				class="relaitve uppercase flex flex-col font-[Merriweather] text-[#313131] text-[36px] leading-[110%] mb-[26px] sm:text-[60px] sm:mb-[24px]"
			>
				<div class="flex flex-col">
					<div
						ref="hTitleFirstContainer"
						class="flex flex-wrap"
					></div>
					<div
						ref="hTitleSecondContainer"
						class="flex flex-wrap pl-[1px] sm:pl-0"
					></div>
				</div>
				<div
					ref="hTitleThirdContainer"
					class="flex justify-center w-full pl-2 sm:pl-0"
				></div>
				<div
					ref="hTitleFourthContainer"
					class="flex justify-end w-full pl-[30px] sm:pl-0"
				></div>
			</h2>
			<p
				ref="pContainer"
				class="text-[20px] leading-[23px] tracking-[-1.12px] clip-path-inset-none__left mb-[32px] sm:mb-[40px] sm:text-[19px] sm:text-center sm:tracking-[-0.6px]"
			>
				Оплатите взнос на телеграммы для&nbsp;организации Международного
				васюкинского турнира по шахматам
			</p>
			<div
				ref="buttonsContainer"
				class="flex flex-col gap-4 clip-path-inset-none__right sm:flex-row"
			>
				<a
					class="tracking-[0px] pt-[10px] pb-[12px] text-[16px] flex-1 text-center bg-[#1F1F1F] rounded-[66px] leading-[130%] border-[2px] border-[#1F1F1F] font-[500] text-white sm:px-[40px] sm:py-[14px] sm:max-w-[263px] sm:tracking-[-0.1px] hover:border-[#FBCE51] hover:text-[#1F1F1F] hover:bg-[#FBCE51] transition-all duration-300"
					href="#chessThought"
					>Поддержать шахматную мысль
				</a>
				<a
					class="tracking-[0px] pt-[9px] pb-[12px] px-[30px] text-[16px] flex-1 text-center rounded-[66px] leading-[130%] border-[2px] bg-[#ffffff] font-[500] text-[#1F1F1F] sm:px-[80px] sm:py-[14px] sm:max-w-[263px] sm:tracking-[-0.1px]  hover:text-[#FFFFFF] sm:border-[#1F1F1F] lg:bg-[transparent] hover:bg-[#1F1F1F] transition-all duration-300"
					href="#steps"
					>Подробнее о турнире
				</a>
			</div>
		</div>
	</section>
</template>
<script setup lang="js">
import { storeToRefs } from "pinia";
import { useScreenStore } from "~/stores/screenSizeStore";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { toShowAnimate } from "~/composables/animation";

const screenStore = useScreenStore();
const { isMobile } = storeToRefs(screenStore);

const logo = ref();
const h1Title = ref();
const hTitleFirstContainer = ref();
const hTitleSecondContainer = ref();
const hTitleThirdContainer = ref();
const hTitleFourthContainer = ref();
const pContainer = ref();
const buttonsContainer = ref();

const hTitleFirstLine = ref("Превратите".split(""));
const hTitleSecondLine = ref("уездный город".split(""));
const hTitleThirdLine = ref("в столицу".split(""));
const hTitleFourthLine = ref("земного шара".split(""));

function createSpan(text, container, reverse = false) {
	const tl = gsap.timeline();
	const textLength = text.length;

	text.forEach((symbol, index) => {
		const div = document.createElement("div");
		const delay = (textLength - index - 1) * 0.1;

		if (symbol === " ") {
			div.innerHTML = "&nbsp;";
		} else {
			div.textContent = symbol;
		}

		container.appendChild(div);

		tl.fromTo(
			div,
			{
				scale: 4,
				opacity: 0,
				x: !reverse ? -300 : 300,
				y: Math.floor(Math.random() * 101) - 50,
				rotate: Math.floor(Math.random() * 101) - 50,
			},
			{
				scale: 1,
				opacity: 1,
				x: 0,
				y: 0,
				rotate: 0,
				duration: 0.6,
			},
			!reverse ? "-=0.4" : delay,
		);
	});

	return tl;
}

onMounted(() => {
	const timeline = gsap.timeline();

	timeline.add(toShowAnimate(logo.value, 2), "+=0.5");
	timeline.add(toShowAnimate(h1Title.value, 2), "<");
	timeline.add(
		createSpan(hTitleFirstLine.value, hTitleFirstContainer.value, true),
		"<",
	);
	timeline.add(
		createSpan(hTitleSecondLine.value, hTitleSecondContainer.value, true),
		"-=1.5",
	);
	timeline.add(
		createSpan(hTitleThirdLine.value, hTitleThirdContainer.value),
		"-=0.5",
	);
	timeline.add(
		createSpan(hTitleFourthLine.value, hTitleFourthContainer.value),
		"-=2.2",
	);
	timeline.add(toShowAnimate(pContainer.value, 0.5), "-=0.1");
	timeline.add(toShowAnimate(buttonsContainer.value, 0.5), "<");
});
</script>
<style scoped lang="scss">
.hero-warp {
	background-repeat: no-repeat;
	background-size: cover;
}
@media (min-width: 1920px) {
	.hero-warp {
		background-image: url("../public/hero-warp-lg.jpg");
		background-position: left;
	}
}
@media (max-width: 1919px) {
	.hero-warp {
		background-image: url("../public/hero-warp-lg.jpg");
		background-position: center;
	}
}
@media (max-width: 550px) {
	.hero-warp {
		background-image: url("../public/hero-warp-sm.jpg");
		background-position: center top;
	}
}
</style>
