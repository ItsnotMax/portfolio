<template lang="html">
	<section class="relative font-[Merriweather] overflow-hidden mb-[120px]">
		<h2 class="uppercase text-[#313131] text-[36px] leading-[110%] mb-3">
			Этапы преображения Васюков
		</h2>
		<div class="mb-[144px]">
			<a
				href="/"
				class="text-[#3057A2] font-[Golos] text-[18px] leading-[120%]"
			>
				Будущие источники обогащения васюкинцев
			</a>
		</div>

		<div
			ref="carouselContainer"
			class="relative w-full flex flex-row left-0 font-[Golos] text-[18px] font-medium mb-[28px] h-[300px]"
		>
			<div
				class="relative min-w-full flex flex-col gap-[28px] leading-[123%] pt-[62px] pb-[23px] pr-[24px] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover"
			>
				<div class="relative">
					<div
						class="absolute top-0 left-[20px] flex justify-center items-center w-9 h-9 bg-white rounded-full"
					>
						1
					</div>
					<div class="pl-[72px]">
						Строительство железнодорожной магистрали Москва-Васюки
					</div>
				</div>
				<div class="relative">
					<div
						class="absolute top-0 left-[20px] flex justify-center items-center w-9 h-9 bg-white rounded-full"
					>
						2
					</div>
					<div class="pl-[72px]">
						Открытие фешенебельной гостиницы «Проходная пешка» и
						других небоскрёбов
					</div>
				</div>
			</div>
			<div
				class="relative min-w-full pt-[62px] pb-[34px] pr-[24px] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover"
			>
				<div class="relative">
					<div
						class="absolute top-0 left-[20px] flex justify-center items-center w-9 h-9 bg-white rounded-full"
					>
						3
					</div>
					<div class="pl-[72px]">
						Поднятие сельского хозяйства в радиусе на тысячу
						километров: производство овощей, фруктов, икры,
						шоколадных конфет
					</div>
				</div>
			</div>
			<div
				class="relative min-w-full flex flex-col gap-[28px] pt-[62px] pb-[34px] pr-[24px] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover"
			>
				<div class="relative">
					<div
						class="absolute top-0 left-[20px] flex justify-center items-center w-9 h-9 bg-white rounded-full"
					>
						4
					</div>
					<div class="pl-[72px]">
						Строительство дворца для турнира
					</div>
				</div>
				<div class="relative">
					<div
						class="absolute top-0 left-[20px] flex justify-center items-center w-9 h-9 bg-white rounded-full"
					>
						5
					</div>
					<div class="pl-[72px]">
						Размещение гаражей для&nbsp;гостевого автотранспорта
					</div>
				</div>
			</div>
			<div
				class="relative min-w-full pt-[62px] pb-[34px] pr-[24px] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover"
			>
				<div class="relative">
					<div
						class="absolute top-0 left-[20px] flex justify-center items-center w-9 h-9 bg-white rounded-full"
					>
						6
					</div>
					<div class="pl-[72px]">
						Постройка сверхмощной радиостанции для передачи всему
						миру сенсационных результатов
					</div>
				</div>
			</div>
			<div
				class="relative min-w-full pt-[62px] pb-[34px] pr-[24px] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover"
			>
				<div class="relative">
					<div
						class="absolute top-0 left-[20px] flex justify-center items-center w-9 h-9 bg-white rounded-full"
					>
						7
					</div>
					<div class="pl-[72px]">
						Создание аэропорта «Большие Васюки» с регулярным
						отправлением почтовых самолётов и дирижаблей во все
						концы света, включая Лос-Анжелос и Мельбурн
					</div>
				</div>
			</div>
		</div>

		<div class="relative flex flex-row justify-center items-center gap-4">
			<button
				type="button"
				class="group"
				:disabled="currentStep === 1"
				@click.stop="handler.decrement"
			>
				<svg
					width="36"
					height="36"
					class="fill-[#313131] transition-colors duration-300"
					:class="{
						'fill-[rgba(0,0,0,0.2)]': currentStep === 1,
					}"
				>
					<use xlink:href="/public/sprites.svg#btnLeft"></use>
				</svg>
			</button>
			<div class="flex gap-[6px]">
				<svg
					v-for="index in 5"
					:key="index"
					width="10"
					height="10"
					class="transition-colors duration-300"
					:class="{
						'fill-[#313131]': currentStep === index,
						'fill-[#D9D9D9]': currentStep !== index,
					}"
				>
					<use xlink:href="/public/sprites.svg#dotBtn"></use>
				</svg>
			</div>
			<button
				type="button"
				class="group"
				:disabled="currentStep === stepsCount"
				@click.stop="handler.increment"
			>
				<svg
					width="36"
					height="36"
					class="fill-[#313131] transition-colors duration-300"
					:class="{
						'fill-[rgba(0,0,0,0.2)]': currentStep === stepsCount,
					}"
				>
					<use xlink:href="/public/sprites.svg#btnRight"></use>
				</svg>
			</button>
		</div>
		<div
			ref="plane"
			class="absolute z-10 scale-[1.1] -rotate-[3deg] top-[200px] left-[22px]"
		>
			<img src="/public/plane.png" alt="plane" />
		</div>
	</section>
</template>
<script setup lang="js">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const carouselContainer = ref();
const stepsCount = 5;
const currentStep = ref(1);

const handler = (() => {
	let shift = 0;

	return {
		decrement: () => {
			if (1 < currentStep.value) {
				shift += 100;
				gsap.to(carouselContainer.value, {
					xPercent: shift,
					duration: 0.5,
				});
				--currentStep.value;
			}
		},
		increment: () => {
			if (5 > currentStep.value) {
				shift -= 100;
				gsap.to(carouselContainer.value, {
					xPercent: shift,
					duration: 0.5,
				});
				++currentStep.value;
			}
		},
	};
})();

onMounted(() => {});
</script>
<style scoped lang="scss"></style>
