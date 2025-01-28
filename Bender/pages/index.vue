<template lang="html">
	<header class="mx-auto max-w-[1920px]">
		<HeroBanner />
		<RunningLine />
	</header>
	<main
		class="mx-auto max-w-[1920px] px-[20px] py-[48px] sm:px-[72px] sm:py-[80px] sm:mb-[60px]"
	>
		<DescribeGrid />
		<StepsDesktop v-if="isDesktop" />
		<StepsMobile v-else />
		<TournamentParticipantsDesktop v-if="isDesktop" />
		<TournamentParticipantsMobile v-else />
	</main>
	<footer class="mx-auto max-w-[1920px]">
		<RunningLine />
		<div
			class="bg-[#E9DED4] text-[16px] leading-[120%] text-[rgba(49,49,49,0.6)] font-[Golos] px-5 py-10 sm:px-[72px]"
		>
			Все персонажи, события и цитаты являются вымышленными
			и&nbsp;не&nbsp;принадлежат создателям сайта. С&nbsp;подробностями
			можно познакомиться в&nbsp;главе XXXIV романа Ильи Ильфа
			и&nbsp;Евгения Петрова «Двенадцать стульев».
		</div>
	</footer>
</template>
<script setup lang="js">
import { storeToRefs } from "pinia";
import { useScreenStore } from "~/stores/screenSizeStore";
import HeroBanner from "~/components/HeroBanner.vue";
import RunningLine from "~/components/RunningLine.vue";
import DescribeGrid from "~/components/DescribeGrid.vue";
import StepsDesktop from "~/components/StepsDesktop.vue";
import StepsMobile from "~/components/StepsMobile.vue";
import TournamentParticipantsDesktop from "~/components/TournamentParticipantsDesktop.vue";
import TournamentParticipantsMobile from "~/components/TournamentParticipantsMobile.vue";

const screenStore = useScreenStore();
const { isDesktop } = storeToRefs(screenStore);
</script>
<style scoped lang="scss"></style>
