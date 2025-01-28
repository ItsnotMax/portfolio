<template lang="html">
	<section
		id="chessThought"
		class="grid grid-cols-12 items-center uppercase font-[Merriweather] mb-[120px] sm:mb-[200px] sm:gap-y-10"
	>
		<div
			class="row-span-1 col-span-full text-[#313131] text-[28px] leading-[135%] mb-6 md:mb-0 md:leading-[135%] md:text-[36px] md:col-span-8"
		>
			<div>Чтобы поддержать</div>
			Международный васюкинский турнир
			<span v-if="isDesktop || isTablet">посетите лекцию на тему:</span>
			<span v-if="isDesktop || isTablet" class="text-[#F54932] font-bold">
				«Плодотворная дебютная идея»
			</span>
		</div>
		<div
			class="row-span-2 col-span-full justify-self-center mb-6 md:mb-0 md:row-span-1 md:col-start-9 md:col-span-full md:justify-self-end"
		>
			<img src="/public/men-group.png" loading="lazy" alt="group" />
		</div>
		<div
			v-if="isMobile"
			class="row-span-3 col-span-full text-[#313131] text-[28px] leading-[135%] mb-10"
		>
			посетите лекцию на тему
			<span class="text-[#F54932] font-bold">
				«Плодотворная дебютная идея»
			</span>
		</div>
		<div
			class="row-span-4 col-span-full mb-[38px] mx-auto md:row-span-1 md:col-span-5 md:mb-0"
		>
			<img
				class="relative w-[474px] max-h-[545px] scale-[1.12] translate-y-[5px]"
				src="/public/thinkler.jpg"
				loading="lazy"
				alt="thinkler"
			/>
		</div>
		<div
			class="relative flex flex-col row-span-5 col-span-full md:row-span-1 md:col-start-6 md:col-span-full md:self-start md:pl-[10px]"
		>
			<div
				class="font-normal text-[#313131] self-start mb-[44px] text-[28px] leading-[135%] sm:pt-[23px] sm:leading-[135%] sm:text-[36px] sm:mb-[62px]"
			>
				и Сеанс
				<span class="text-[#F54932] font-bold">
					одновременной игры в&nbsp;шахматы на 160 досках
				</span>
				гроссмейстера О.&nbsp;Бендера
			</div>
			<div
				class="normal-case font-[Golos] leading-[120%] flex flex-col mb-[40px] text-[20px] sm:grid sm:mb-[47px] sm:grid-cols-[43.4%_56.6%]"
			>
				<div
					class="text-[rgba(247,160,160,0.7)] font-normal row-start-1 row-end-2 col-start-1 col-end-2 border-[#D0D0D0] pb-3 sm:pb-[16px] sm:border-r-2 sm:border-b-2"
				>
					Место проведения:
				</div>
				<div
					class="font-semibold row-start-1 row-end-2 col-start-2 col-end-3 border-[#D0D0D0] border-b-2 pb-4 sm:pb-[14px] sm:pl-[17px]"
				>
					Клуб «Картонажник»
				</div>
				<div
					class="text-[rgba(247,160,160,0.7)] font-normal row-start-2 row-end-3 col-start-1 col-end-2 border-[#D0D0D0] py-[13px] sm:border-r-2 sm:border-b-2 sm:py-[14px] sm:h-[56px]"
				>
					Дата и время мероприятия:
				</div>
				<div
					class="font-semibold row-start-2 row-end-3 col-start-2 col-end-3 border-b-2 border-[#D0D0D0] pb-[15px] sm:p-[14px] sm:pl-[17px] sm:h-[56px]"
				>
					22 июня 1927 г. в 18:00
				</div>
				<div
					class="text-[rgba(247,160,160,0.7)] font-normal row-start-3 row-end-4 col-start-1 col-end-2 border-[#D0D0D0] pt-[17px] sm:border-r-2 sm:border-b-2 sm:py-[14px] sm:h-[56px]"
				>
					Стоимость входных билетов:
				</div>
				<div
					class="font-semibold row-start-3 row-end-4 col-start-2 col-end-3 border-b-2 py-3 border-[#D0D0D0] sm:p-[14px] sm:pl-[17px] sm:h-[56px]"
				>
					20 коп.
				</div>
				<div
					class="text-[rgba(247,160,160,0.7)] font-normal row-start-4 row-end-5 col-start-1 col-end-2 border-[#D0D0D0] border-b-2 pt-[17px] sm:border-r-2 sm:py-[14px] sm:h-[56px]"
					:class="{ 'pb-4': isMobile }"
				>
					<span :class="{ 'mr-2': isMobile }">Плата за игру:</span>
					<span
						v-if="!isDesktop && !isTablet"
						class="text-[initial] font-semibold"
					>
						50 коп.
					</span>
				</div>
				<div
					v-if="isDesktop || isTablet"
					class="font-semibold row-start-4 row-end-5 col-start-2 col-end-3 border-b-2 border-[#D0D0D0] sm:p-[14px] sm:pl-[17px] sm:h-[56px]"
				>
					50 коп.
				</div>
				<div
					class="text-[rgba(247,160,160,0.7)] font-normal row-start-5 row-end-6 col-start-1 col-end-2 pt-4 pb-3 sm:pb-0 sm:border-r-2 sm:pt-[16px]"
				>
					Взнос на телеграммы:
				</div>

				<div
					class="font-semibold row-start-5 row-end-6 col-start-2 col-end-3 sm:pt-[14px] sm:pl-[17px]"
				>
					<span class="line-through mr-[6px]">100 руб. </span>
					<span class="">21 руб.</span> 16 коп.
				</div>
			</div>
			<div
				class="text-[#3057A2] normal-case font-[Golos] font-normal leading-[120%] text-[18px] sm:text-[20px]"
			>
				По всем вопросам обращаться в&nbsp;администрацию к К. Михельсону
			</div>
		</div>
	</section>
</template>
<script setup lang="js">
import { storeToRefs } from "pinia";
import { useScreenStore } from "~/stores/screenSizeStore";
const screenStore = useScreenStore();
const { isMobile, isDesktop, isTablet } = storeToRefs(screenStore);
</script>
<style scoped lang="scss"></style>
