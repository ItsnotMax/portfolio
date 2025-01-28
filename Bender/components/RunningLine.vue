<template lang="html">
	<section
		class="relative flex flex-row flex-nowrap max-w-[1920px] font-[Merriweather] text-[16px] overflow-hidden bg-[#F54932] text-white py-[7px] md:text-[22px] md:py-[14px]"
	>
		<div
			class="relative uppercase max-w-fit flex flex-row flex-nowrap gap-3 items-center runnig-line1"
		>
			<span class="pl-3 text-nowrap">
				Дело помощи утопающим — дело рук самих утопающих!
			</span>
			<span class="text-nowrap">
				<svg width="6" height="6">
					<use xlink:href="/public/sprites.svg#dot"></use>
				</svg>
			</span>
			<span class="text-nowrap">
				Шахматы двигают вперед не только культуру, но и экономику!
			</span>
			<span class="text-nowrap">
				<svg width="6" height="6">
					<use xlink:href="/public/sprites.svg#dot"></use>
				</svg>
			</span>
			<span class="text-nowrap">
				Лед тронулся, господа присяжные заседатели!
			</span>
			<span class="text-nowrap">
				<svg width="6" height="6">
					<use xlink:href="/public/sprites.svg#dot"></use>
				</svg>
			</span>
		</div>
		<div
			class="relative uppercase max-w-fit flex flex-row flex-nowrap gap-3 items-center runnig-line2"
		>
			<span class="pl-3 text-nowrap">
				Дело помощи утопающим — дело рук самих утопающих!
			</span>
			<span class="text-nowrap">
				<svg width="6" height="6">
					<use xlink:href="/public/sprites.svg#dot"></use>
				</svg>
			</span>
			<span class="text-nowrap">
				Шахматы двигают вперед не только культуру, но и экономику!
			</span>
			<span class="text-nowrap">
				<svg width="6" height="6">
					<use xlink:href="/public/sprites.svg#dot"></use>
				</svg>
			</span>
			<span class="text-nowrap">
				Лед тронулся, господа присяжные заседатели!
			</span>
			<span class="text-nowrap">
				<svg width="6" height="6">
					<use xlink:href="/public/sprites.svg#dot"></use>
				</svg>
			</span>
		</div>
		<div
			class="relative uppercase max-w-fit flex flex-row flex-nowrap gap-3 items-center runnig-line3"
		>
			<span class="pl-3 text-nowrap">
				Дело помощи утопающим — дело рук самих утопающих!
			</span>
			<span class="text-nowrap">
				<svg width="6" height="6">
					<use xlink:href="/public/sprites.svg#dot"></use>
				</svg>
			</span>
			<span class="text-nowrap">
				Шахматы двигают вперед не только культуру, но и экономику!
			</span>
			<span class="text-nowrap">
				<svg width="6" height="6">
					<use xlink:href="/public/sprites.svg#dot"></use>
				</svg>
			</span>
			<span class="text-nowrap">
				Лед тронулся, господа присяжные заседатели!
			</span>
			<span class="text-nowrap">
				<svg width="6" height="6">
					<use xlink:href="/public/sprites.svg#dot"></use>
				</svg>
			</span>
		</div>
	</section>
</template>
<script setup lang="js"></script>
<style scoped lang="scss">
.runnig-line1 {
	animation: runningLine1 39s linear -39s infinite forwards;
}
.runnig-line2 {
	animation: runningLine2 39s linear -26s infinite forwards;
}
.runnig-line3 {
	animation: runningLine3 39s linear -13s infinite forwards;
}

@keyframes runningLine1 {
	0% {
		transform: translateX(200%);
	}
	100% {
		transform: translateX(-100%);
	}
}
@keyframes runningLine2 {
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(-200%);
	}
}
@keyframes runningLine3 {
	0% {
		transform: translateX(0%);
	}
	100% {
		transform: translateX(-300%);
	}
}
</style>
