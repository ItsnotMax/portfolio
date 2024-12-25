<template lang="html">
	<div class="w-[fit-content] mx-auto mb-6" role="banner">
		<NuxtLink to="/" aria-label="Go to home page">
			<img src="../public/logo.png" alt="Klerk logo" />
		</NuxtLink>
	</div>

	<div
		aria-label="Breadcrumbs"
		class="flex flex-row gap-x-2 justify-center items-center mb-6"
	>
		<ul class="list-none flex flex-row gap-x-2 items-center">
			<li
				class="font-roboto text-[13px] font-[400] leading-[16px] text-customGray"
			>
				Главная
			</li>
			<li>
				<img src="../public/arrow-right.svg" alt="arrow icon" />
			</li>
			<li
				class="font-roboto text-[13px] font-[400] leading-[16px] text-customGray"
			>
				{{ currentBreadcrumb }}
			</li>
			<li>
				<img src="../public/arrow-right.svg" alt="arrow icon" />
			</li>
			<li
				class="font-roboto text-[13px] font-[400] leading-[16px] text-customGray"
			>
				Хлебные крошки
			</li>
		</ul>
	</div>

	<section class="w-[fit-content] mx-auto" role="main">
		<h1
			class="font-roboto text-[2rem] font-[500] leading-[42px] text-black tracking-tighterCustom text-center xs:text-[3.5rem] xs:leading-[4.5rem]"
		>
			Подписки «Клерка»
		</h1>

		<nav
			class="flex flex-row gap-x-6 justify-center items-center pt-6 pb-[18px]"
			aria-label="Subscription navigation"
		>
			<NuxtLink
				class="text-[1rem] font-[400] leading-[1.5rem] text-customLightGray transition-colors duration-300 ease-linear"
				:class="{ 'text-activeLink link__active': route.path === '/' }"
				to="/"
				aria-current="page"
				aria-label="Go to mailings"
			>
				Рассылки
			</NuxtLink>

			<NuxtLink
				class="text-[1rem] font-[400] leading-[1.5rem] text-customLightGray transition-colors duration-300 ease-linear"
				:class="{
					'text-activeLink link__active': route.path === '/socials',
				}"
				to="/socials"
				aria-label="Go to socials"
			>
				Соцсети
			</NuxtLink>

			<NuxtLink
				class="text-[1rem] font-[400] leading-[1.5rem] text-customLightGray transition-colors duration-300 ease-linear"
				:class="{
					'text-activeLink link__active':
						route.path === '/messengers',
				}"
				to="/messengers"
				aria-label="Go to messengers"
			>
				Мессенджеры
			</NuxtLink>
		</nav>
	</section>
</template>

<script setup lang="js">
import { computed } from "vue";
import { useRoute } from "vue-router";

const breadcrumbMap = {
	"/": "Рассылки",
	"/socials": "Соцсети",
	"/messengers": "Мессенджеры",
};

const route = useRoute();

const currentBreadcrumb = computed(() => {
	return breadcrumbMap[route.path] || "Неизвестный раздел";
});
</script>
<style scoped lang="scss">
.nuxt-link:hover,
.nuxt-link:active {
	color: #000;
	animation: bounce;
}

.nuxt-link {
	transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.nuxt-link:hover {
	transform: scale(1.05);
}

.nuxt-link:active {
	transform: scale(1);
}

.link__active {
	position: relative;

	&::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		height: 2px;
		background-color: #5a8cf1;
		top: 100%;
		margin-top: 16px;
		z-index: 100;
	}
}
</style>
