<template lang="html">
	<div class="relative w-full max-w-lg">
		<div
			class="flex items-center py-2 flex-col sm:gap-4 sm:border-b sm:border-teal-500 sm:flex-row sm:visible"
		>
			<input
				@input="search"
				v-model="searchString"
				class="appearance-none border-none w-full text-gray-700 p-4 sm:py-2 sm:px-3 leading-tight focus:outline-none bg-gray-100 rounded-t-lg sm:rounded-none text-lg md:text-xl sm:bg-transparent sm:border sm:border-gray-300"
				type="text"
				placeholder="Начните поиск"
				aria-label="start searching"
			/>
			<button
				@click="
					goTo = searchString.length > 0 && searchResults.length > 0
				"
				class="flex-shrink-0 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-lg md:text-xl border-4 text-white py-1 px-2 rounded-b-lg sm:rounded w-full sm:w-auto"
				type="button"
			>
				Найти
			</button>
			<button
				@click="searchString = ''"
				class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-lg md:text-xl py-1 px-2 rounded w-full sm:w-auto"
				type="button"
			>
				Стереть
			</button>
		</div>

		<ul
			v-if="searchResults.length"
			class="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-20"
		>
			<li
				v-for="item in searchResults"
				@click="searchString = item.name.toLowerCase()"
				:key="item.id"
				class="flex justify-between px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-opacity-80 cursor-pointer transition-all"
			>
				<div class="relative flex justify-start items-center gap-1">
					<div
						class="flex items-center font-semibold text-sm sm:text-base md:text-lg text-blue-700 mr-3"
					>
						{{ item.name.toUpperCase() }}
					</div>
					<div
						class="font-thin text-gray-500 text-xs sm:text-sm md:text-base"
					>
						id:{{ item.id }}
					</div>
				</div>
				<span
					class="text-gray-500 ml-2 text-xs sm:text-sm md:text-base"
				>
					{{ item.price }}₽
				</span>
			</li>
		</ul>

		<div
			v-if="searchString.length >= 2 && searchResults.length === 0"
			class="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 p-4 text-center text-gray-500 text-sm sm:text-base md:text-lg z-10"
		>
			Ничего не найдено
		</div>
	</div>

	<teleport to="body">
		<AsynModalWindow v-if="goTo" :bgTransparent="true">
			<template #default>
				<div
					class="flex items-center justify-center h-full relative mx-auto"
				>
					<div class="absolute z-0">
						<AsynLoadingCircle
							:width="screenWidth >= 640 ? '150' : '100'"
							:height="screenWidth >= 640 ? '150' : '100'"
							:borderWidth="screenWidth >= 640 ? '6' : '3'"
						/>
					</div>
					<div
						class="flex items-center justify-center bg-black/60 p-4 rounded-lg z-10"
					>
						<Icon
							name="svg-spinners:3-dots-move"
							class="w-12 h-12 transition-colors duration-[600ms]"
							:style="{ color: dotColorLeft }"
						/>
						<span
							class="w-full mx-4 text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide uppercase text-center sm:w-[450px]"
						>
							{{ loadingText }}
						</span>
						<Icon
							ref="dotsRightAnimate"
							name="svg-spinners:3-dots-move "
							class="w-12 h-12 transition-colors duration-[600ms]"
							:style="{ color: dotColorRight }"
						/>
					</div>
				</div>
				<AsynAnyAlert v-if="alert" :text="'Пссс. Покупай крокодила!'" />
			</template>
		</AsynModalWindow>
	</teleport>
</template>
<script setup lang="js">
import { ref, computed, watch, defineAsyncComponent, onUnmounted } from "vue";
import { getRandomColor } from "~/utils/random";

const AsynModalWindow = defineAsyncComponent(
	() => import("~/components/ModalWindow"),
);
const AsynLoadingCircle = defineAsyncComponent(
	() => import("~/components/LoadingCircle"),
);
const AsynAnyAlert = defineAsyncComponent(
	() => import("~/components/AnyAlert"),
);

const searchString = ref("");
const goTo = ref(false);
const alert = ref(false);
const dotColorLeft = ref(getRandomColor());
const dotColorRight = ref(getRandomColor());
const loadingText = ref("");
const debouncedSearchString = ref("");
const screenWidth = ref(window.innerWidth);

const delay = 100;
let timeout = null;
let intervalColor = null;

watch(goTo, (newVal) => {
	if (newVal) {
		loadingText.value = "Загружаю страницу";
		intervalColor = setInterval(() => {
			dotColorLeft.value = getRandomColor();
			dotColorRight.value = getRandomColor();
		}, 600);
	} else {
		clearInterval(intervalColor);
	}
});

watch(loadingText, (newVal) => {
	if (newVal === "Загружаю страницу") {
		setTimeout(() => {
			loadingText.value = "Пытаюсь поймать";
		}, 1000);
	} else if (newVal === "Пытаюсь поймать") {
		setTimeout(() => {
			loadingText.value = `${searchString.value}: слишком быстрый`;
			alert.value = true;

			setTimeout(() => {
				alert.value = false;
				searchString.value = "";
				goTo.value = false;
			}, 2000);
		}, 1000);
	}
});

watch(searchString, (newVal) => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		debouncedSearchString.value = newVal;
	}, delay);
});

const searchResults = computed(() => {
	if (debouncedSearchString.value.length < 2) return [];
	const term = debouncedSearchString.value.toLowerCase();
	return Object.entries(mock)
		.filter(([key]) => key.includes(term))
		.slice(0, 5)
		.map(([key, value]) => ({ name: key, ...value }));
});

onUnmounted(() => {
	clearInterval(intervalColor);
	clearTimeout(timeout);
});

const mock = {
	"собака весёлая": { id: 1, price: 24999 },
	"собака грустная": { id: 1, price: 23999 },
	"собака подозрительная": { id: 1, price: 25999 },
	"кошка наглая": { id: 2, price: 19999 },
	"кошка загадочная": { id: 2, price: 21999 },
	"кошка непонятная": { id: 2, price: 22999 },
	"попугай болтливый": { id: 3, price: 7999 },
	"попугай молчаливый": { id: 3, price: 6999 },
	"попугай философский": { id: 3, price: 9999 },
	"варан голодный": { id: 46, price: 21999 },
	"варан ленивый": { id: 46, price: 22999 },
	"варан подозрительный": { id: 46, price: 23999 },
	"тигрёнок бешеный": { id: 36, price: 999999 },
	"тигрёнок сонный": { id: 36, price: 1099999 },
	"тигрёнок вредный": { id: 36, price: 1199999 },
	"альпака белоснежная": { id: 27, price: 59999 },
	"альпака смущённая": { id: 27, price: 61999 },
	"альпака чё такая дерзкая": { id: 27, price: 63999 },
	"змея притворяющаяся шнурком": { id: 16, price: 15999 },
	"змея задумчивая": { id: 16, price: 17999 },
	"змея с хитрым планом": { id: 16, price: 18999 },
	"крыса деловая": { id: 14, price: 3499 },
	"крыса вредная": { id: 14, price: 2999 },
	"крыса тайный агент": { id: 14, price: 1999 },
	"паук-птицеед слишком большой": { id: 21, price: 13999 },
	"паук-птицеед подозрительный": { id: 21, price: 11999 },
	"паук-птицеед не ваш друг": { id: 21, price: 10999 },
	"енот карманный вор": { id: 31, price: 24999 },
	"енот несёт какую-то фигню": { id: 31, price: 26999 },
	"енот главный тут": { id: 31, price: 22999 },
	"какаду скандальный": { id: 48, price: 39999 },
	"какаду надменный": { id: 48, price: 41999 },
	"какаду мечтает о свободе": { id: 48, price: 43999 },
	"ара слишком громкий": { id: 50, price: 59999 },
	"ара в плохом настроении": { id: 50, price: 61999 },
	"ара философ": { id: 50, price: 62999 },
	"обезьяна планирующая": { id: 45, price: 74999 },
	"обезьяна не доверяет вам": { id: 45, price: 77999 },
	"обезьяна вынашивает заговор": { id: 45, price: 79999 },
	"ленивец ещё спит": { id: 47, price: 67999 },
	"ленивец задумался о смысле жизни": { id: 47, price: 68999 },
	"ленивец слишком медленный": { id: 47, price: 69999 },
	"капибара пофигистичная": { id: 29, price: 54999 },
	"капибара тусовщица": { id: 29, price: 56999 },
	"капибара слишком умиротворённая": { id: 29, price: 58999 },
	"кенгуру с пакетом": { id: 30, price: 79999 },
	"кенгуру без пакета": { id: 30, price: 81999 },
	"кенгуру в сомнении": { id: 30, price: 83999 },
	"выдра деловая": { id: 32, price: 28999 },
	"выдра наглая": { id: 32, price: 30999 },
	"выдра в шоке": { id: 32, price: 31999 },
	"павлин с завышенной самооценкой": { id: 28, price: 18999 },
	"павлин на расслабоне": { id: 28, price: 19999 },
	"павлин уверенный в себе": { id: 28, price: 20999 },
	"лиса хитрющая": { id: 42, price: 39999 },
	"лиса строит планы": { id: 42, price: 41999 },
	"лиса притворяется кошкой": { id: 42, price: 42999 },
	"морская свинка с секретом": { id: 15, price: 6999 },
	"морская свинка философ": { id: 15, price: 7199 },
	"морская свинка запуталась": { id: 15, price: 7399 },
	"осёл упрямый": { id: 26, price: 44999 },
	"осёл задумчивый": { id: 26, price: 45999 },
	"осёл подозрительный": { id: 26, price: 46999 },
	"пингвин в костюме": { id: 43, price: 59999 },
	"пингвин бизнесмен": { id: 43, price: 60999 },
	"пингвин в отпуске": { id: 43, price: 61999 },
	"енот воришка": { id: 31, price: 24999 },
	"енот бандит": { id: 31, price: 25999 },
	"енот под прикрытием": { id: 31, price: 26999 },
	"ленивец слишком ленивый": { id: 47, price: 67999 },
	"ленивец задумался": { id: 47, price: 68999 },
	"ленивец, который не хочет вставать": { id: 47, price: 69999 },
	"мангуст в боевой готовности": { id: 38, price: 22999 },
	"мангуст с амбициями": { id: 38, price: 23999 },
	"мангуст не понял шутку": { id: 38, price: 24999 },
	"хамелеон, который не смог слиться с фоном": { id: 35, price: 15999 },
	"хамелеон, который перепутал цвет": { id: 35, price: 16999 },
	"хамелеон в депрессии": { id: 35, price: 17999 },
	"тигрёнок в сапогах": { id: 36, price: 999999 },
	"тигрёнок в сомнениях": { id: 36, price: 1000000 },
	"тигрёнок, который не рычит, а пищит": { id: 36, price: 1000001 },
	"медведь-интроверт": { id: 40, price: 999999 },
	"медведь после зимней спячки": { id: 40, price: 1000000 },
	"медведь, который заказывает мёд на AliExpress": { id: 40, price: 1000001 },
	"обезьяна, которая знает секреты": { id: 45, price: 74999 },
	"обезьяна, которая что-то затеяла": { id: 45, price: 76999 },
};
</script>
<style lang=""></style>
