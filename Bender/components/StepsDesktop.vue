<template lang="html">
	<section
		id="steps"
		class="relative min-h-[722px] font-[Merriweather] sm:mb-[61px] over-x"
	>
		<div ref="plane" class="absolute z-10 right-0 bottom-0 opacity-0">
			<img src="/public/plane.png" alt="plane" />
		</div>
		<h2
			class="text-[#313131] sm:text-[54px] sm:leading-[120%] sm:max-w-[806px] sm:mb-[54px]"
		>
			<span class="uppercase">Этапы преображения</span>
			<span class="flex items-center sm:gap-[20px]">
				<span class="uppercase">Васюков</span>
				<a
					href="/"
					class="relative text-[#3057A2] font-[Golos] sm:w-[280px] sm:text-[20px] sm:leading-[113%]"
				>
					Будущие источники обогащения васюкинцев
				</a>
			</span>
		</h2>
		<div
			ref="StepsContainer"
			class="relative grid grid-cols-12 gap-5 auto-rows-[minmax(112px,minmax(112px,1fr))] font-[Golos]"
		>
			<div
				class="non-visible relative font-medium text-[20px] leading-[120%] text-[#313131] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover row-span-1 col-span-4 py-5 pl-[72px] pr-6"
			>
				<div
					class="absolute top-5 left-5 flex justify-center items-center w-9 h-9 bg-white rounded-full"
				>
					1
				</div>
				Строительство железнодорожной магистрали Москва-Васюки
			</div>
			<div
				class="non-visible relative font-medium text-[20px] leading-[120%] text-[#313131] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover row-span-1 col-span-4 py-5 pl-[72px] pr-5"
			>
				<div
					class="absolute top-5 left-5 flex justify-center items-center w-9 h-9 bg-white rounded-full"
				>
					2
				</div>
				Открытие фешенебельной гостиницы «Проходная пешка» и других
				небоскрёбов
			</div>
			<div
				class="non-visible relative font-medium text-[20px] leading-[120%] text-[#313131] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover col-start-9 col-end-13 row-span-2 py-5 pl-[72px] pr-6"
			>
				<div
					class="absolute top-5 left-5 flex justify-center items-center w-9 h-9 bg-white rounded-full"
				>
					3
				</div>
				Поднятие сельского хозяйства в радиусе на&nbsp;тысячу
				километров: производство овощей, фруктов, икры, шоколадных
				конфет
			</div>
			<div
				class="non-visible relative font-medium text-[20px] leading-[120%] text-[#313131] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover row-span-1 col-span-4 py-5 pl-[72px] pr-6"
			>
				<div
					class="absolute top-5 left-5 flex justify-center items-center w-9 h-9 bg-white rounded-full"
				>
					4
				</div>
				Строительство дворца для&nbsp;турнира
			</div>
			<div
				class="non-visible relative font-medium text-[20px] leading-[120%] text-[#313131] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover row-span-1 col-span-4 py-5 pl-[72px] pr-6"
			>
				<div
					class="absolute top-5 left-5 flex justify-center items-center w-9 h-9 bg-white rounded-full"
				>
					5
				</div>
				Размещение гаражей для&nbsp;гостевого автотранспорта
			</div>
			<div
				class="non-visible relative font-medium text-[20px] leading-[120%] text-[#313131] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover row-span-1 col-start-1 col-span-4 py-5 pl-[72px] pr-6"
			>
				<div
					class="absolute top-5 left-5 flex justify-center items-center w-9 h-9 bg-white rounded-full"
				>
					6
				</div>
				Постройка сверхмощной радиостанции для передачи всему миру
				сенсационных результатов
			</div>
			<div
				class="non-visible relative font-medium text-[20px] leading-[120%] text-[#313131] bg-[url('/public/stamp-paper.png')] bg-no-repeat bg-center bg-cover row-span-1 col-start-5 col-span-8 py-5 pl-[72px] pr-[290px]"
			>
				<div
					class="absolute top-5 left-5 flex justify-center items-center w-9 h-9 bg-white rounded-full"
				>
					7
				</div>
				Создание аэропорта «Большие Васюки» с&nbsp;регулярным
				отправлением почтовых самолётов и дирижаблей во все концы света,
				включая Лос-Анжелос и Мельбурн
			</div>
		</div>
	</section>
</template>
<script setup lang="js">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const StepsContainer = ref();
const plane = ref();

const planeFlight = () => {
	const timeline = gsap.timeline();
	timeline.fromTo(
		plane.value,
		{
			xPercent: "-500",
			yPercent: "-200",
			scaleX: -1,
		},
		{
			xPercent: "200",
			yPercent: "-100",
			duration: 2,
			onStart() {
				gsap.set(plane.value, { opacity: 1 });
			},
		},
	);
	timeline.fromTo(
		plane.value,
		{ scaleX: 1 },
		{ xPercent: "2.5", yPercent: "0", duration: 2 },
		"-=0.7",
	);
};

onMounted(() => {
	const observer = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting) {
			Array.from(StepsContainer.value.children).forEach(
				(element, index) => {
					setTimeout(() => {
						element.classList.remove("non-visible");

						if (index == StepsContainer.value.children.length - 2) {
							planeFlight();
						}
					}, index * 500);
				},
			);
			observer.disconnect();
		}
	});
	observer.observe(StepsContainer.value);
});
</script>
<style scoped lang="scss"></style>
