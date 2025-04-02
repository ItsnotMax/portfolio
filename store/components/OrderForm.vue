<template lang="html">
	<form
		id="form"
		ref="form"
		class="relative w-full h-max max-w-lg mx-auto bg-white shadow-xl rounded-xl p-8"
	>
		<h1 class="text-3xl font-bold text-gray-800 mb-3">Оформить заказ</h1>

		<div class="mb-4">
			<h2 class="text-xl font-bold text-gray-800 mb-2">
				Информация о заказе:
			</h2>
			<div class="space-y-1">
				<div
					class="flex items-center justify-between gap-5 overflow-hidden"
				>
					<span class="text-sm text-gray-700 font-medium">
						Название
					</span>
					<span
						ref="productTitleContainer"
						class="flex flex-wrap text-sm text-gray-900"
					>
					</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-sm text-gray-700 font-medium">
						Цена
					</span>
					<span
						ref="priceContainer"
						class="flex text-sm text-gray-900"
					>
						₽&nbsp;
					</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-sm text-gray-700 font-medium">
						Вариант доставки
					</span>
					<span
						ref="deliveryContainer"
						class="flex text-sm text-gray-900"
					></span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-sm text-gray-700 font-medium">
						Подарок
					</span>
					<span
						ref="wishesContainer"
						class="flex text-sm text-gray-900"
					></span>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap -mx-4 mb-6">
			<div class="w-full md:w-1/2 px-4 mb-6 md:mb-0">
				<label
					class="block text-blue-600 text-lg font-semibold mb-2 cursor-default"
					for="first-name"
				>
					Имя
				</label>
				<input
					id="first-name"
					v-model="orderData.name"
					type="text"
					class="w-full px-4 py-3 border-2 border-blue-600 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-700 hover:border-blue-500 transition-all duration-300 ease-in-out"
					placeholder="Иван"
					:class="{
						'form--trigger':
							orderData.name.length === 0 && errorTrigger,
					}"
				/>
			</div>

			<div class="w-full md:w-1/2 px-4">
				<label
					class="block text-blue-600 text-lg font-semibold mb-2 cursor-default"
					for="surname"
				>
					Фамилия
				</label>
				<input
					id="surname"
					v-model="orderData.surname"
					type="text"
					class="w-full px-4 py-3 border-2 border-blue-600 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-700 hover:border-blue-500 transition-all duration-300 ease-in-out"
					placeholder="Иванов"
					:class="{
						'form--trigger':
							orderData.surname.length === 0 && errorTrigger,
					}"
				/>
			</div>
		</div>

		<div class="flex flex-wrap -mx-4 mb-6">
			<div class="w-full md:w-2/3 px-4 mx-auto">
				<label
					class="block text-blue-600 text-lg font-semibold mb-2"
					for="phone"
				>
					Номер телефона
				</label>
				<input
					v-model="orderData.phoneCustomer"
					id="phone"
					type="text"
					class="w-full px-4 py-3 border-2 border-blue-600 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-700 hover:border-blue-500 transition-all duration-300 ease-in-out"
					placeholder="+7 (___) ___-__-__"
					@input="formatPhoneNumber"
					:class="{
						'form--trigger':
							orderData.phoneCustomer.replace(/[^0-9]/g, '')
								.length >= 0 &&
							orderData.phoneCustomer.replace(/[^0-9]/g, '')
								.length < 11 &&
							errorTrigger,
					}"
				/>
			</div>
		</div>
		<div class="relative flex justify-center items-center">
			<button
				@click.prevent="placeOrder"
				class="mb-4 shrink w-full py-3 z-10 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 disabled:bg-black"
				:class="{ 'shrink--animate': isClicked }"
				:disabled="errorTrigger"
			>
				{{ hoverCount == 0 ? "Сделать заказ" : "Заказать, НУ ПОЗЯЗЯ" }}
			</button>
			<div
				v-show="isClicked"
				ref="rocket"
				class="absolute w-10 h-10 -rotate-45 scale-75 transition-opacity duration-300 z-0"
			>
				<Icon
					name="ic:baseline-rocket-launch"
					class="w-10 h-10 text-rose-700"
				/>
			</div>
		</div>

		<button
			@mouseover="closeFormAnimate"
			@click.prevent="closeForm"
			ref="cancelBtn"
			class="relative flex justify-self-end items-center w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 cursor-pointer"
			:disabled="cancelBtnIsAnimate || isClicked"
		>
			<span class="w-full pointer-events-none">
				{{ cancelBtnText }}
			</span>
		</button>
		<div
			v-show="hoverCount >= 1"
			class="invisible relative flex justify-self-end w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 cursor-pointer"
		>
			<span class="w-full pointer-events-none">
				{{ cancelBtnText }}
			</span>
		</div>
	</form>
	<teleport to="#form" v-if="isClicked">
		<AsyncAlert :text="'Мы уже летим доставлять твой заказ'" />
	</teleport>
</template>

<script setup lang="js">
import { ref, reactive, onMounted, defineAsyncComponent } from "vue";
import Inputmask from "inputmask";
import { splitText, animate } from "~/composables/splitText";
import { objectIsNull } from "~/utils/guards";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
const AsyncAlert = defineAsyncComponent(() => import("~/components/AnyAlert"));
gsap.registerPlugin(CSSPlugin);
Inputmask.extendAliases({
	name: {
		mask: "A{0,20}",
		definitions: {
			A: { validator: "[A-Za-zА-Яа-я]" },
		},
	},
});

const { delivery, wishes, productTitle, price } = defineProps({
	delivery: { type: String },
	wishes: { type: String },
	productTitle: { type: String },
	price: { type: String },
});

const emit = defineEmits(["update:isModalOpen"]);
const screenWidth = useState("screenWidth");
const productTitleContainer = ref(null);
const deliveryContainer = ref(null);
const wishesContainer = ref(null);
const priceContainer = ref(null);
const form = ref();
const cancelBtn = ref();
const rocket = ref();
const cancelBtnText = ref("Отменить заказ");
const cancelBtnIsAnimate = ref(false);
const hoverCount = ref(0);
const phoneMask = ref();
const errorTrigger = ref(false);
const isClicked = ref(false);
const orderData = reactive(
	Object.assign(
		{
			name: "",
			surname: "",
			phoneCustomer: "",
		},
		{ delivery, wishes, productTitle, price },
	),
);

onMounted(async () => {
	const timeline = gsap.timeline();
	const textItems = [
		{ text: productTitle, container: productTitleContainer.value },
		{ text: delivery, container: deliveryContainer.value },
		{ text: wishes, container: wishesContainer.value },
		{ text: price, container: priceContainer.value },
	];
	textItems.forEach(({ text, container }) => {
		const splitedText = splitText(text, document);
		timeline.add(animate(splitedText, container), "<");
	});

	phoneMask.value = new Inputmask("+7 (999) 999-99-99");
	phoneMask.value.mask(document.getElementById("phone"));

	const nameMask = new Inputmask("name");
	nameMask.mask(document.getElementById("first-name"));
	nameMask.mask(document.getElementById("surname"));
});

const closeForm = () => {
	gsap.set(form.value, {
		clipPath: "inset(0% 0% 0% 0%)",
	});
	gsap.to(form.value, {
		clipPath: "inset(50% 0% 50% 0%)",
		duration: 0.2,
		ease: "linear",
		onComplete: () => {
			emit("update:isModalOpen", false);
		},
	});
};
const closeFormAnimate = () => {
	if (isClicked.value && screenWidth.value < 1024) return;
	const duration = 0.3;
	cancelBtnIsAnimate.value = true;

	switch (hoverCount.value) {
		case 0:
			gsap.to(cancelBtn.value, {
				width: "20%",
				duration: duration,
				ease: "power2.out",
				onStart: () => {
					hoverCount.value++;
					gsap.set(cancelBtn.value, {
						position: "absolute",
						right: 32,
					});
				},
			});

			cancelBtnText.value = "Отменить";
			break;
		case 1:
			gsap.to(cancelBtn.value, {
				top: 16,
				right: 0,
				width: "100%",
				duration: duration,
				ease: "power2.out",
				onComplete: () => {
					cancelBtnText.value = "Нажми сюда";
					hoverCount.value++;
				},
			});
			break;
		case 2:
			gsap.to(cancelBtn.value, {
				top: 16,
				bottom: 0,
				right: 0,
				duration: duration,
				ease: "power2.out",
				onUpdate: function() {
					if (this.progress() >= 0.1) {
						cancelBtnText.value = "ОТМЕНИТЬ ЗДЕСЬ";
					}
				},
			});
			break;
	}
	setTimeout(() => {
		cancelBtnIsAnimate.value = false;
	}, duration * 1000);
};
const placeOrder = () => {
	if (
		objectIsNull(orderData) ||
		orderData.phoneCustomer.replace(/[^0-9]/g, "").length != 11
	) {
		errorTrigger.value = true;
		setTimeout(() => {
			errorTrigger.value = false;
		}, 500);
		return;
	}

	isClicked.value = true;
	let hasUpdated = false;

	gsap.set(cancelBtn.value, { top: "initial" });
	gsap.to(rocket.value, {
		y: -800,
		scale: 4,
		duration: 1,
		ease: "power1.in",
		onComplete: async () => {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve(emit("update:isModalOpen", false));
				}, 1000);
			});
		},
		onUpdate: function() {
			if (this.progress() > 0.01 && !hasUpdated) {
				hasUpdated = true;

				gsap.to(rocket.value, {
					rotation: -50,
					duration: 0.5,

					ease: "sine.inOut",
					onComplete: () => {
						gsap.to(rocket.value, {
							opacity: 1,
							rotation: -40,
							duration: 0.5,
							repeat: -1,
							yoyo: true,
							ease: "sine.inOut",
						});
					},
				});
			}
		},
	});
};
</script>

<style scoped lang="scss">
.shrink {
	clip-path: inset(0% 0% 0% 0%);
	&--animate {
		clip-path: inset(0% 50% 0% 50%);
		transition: clip-path 0.2s linear;
	}
}
.form--trigger {
	animation: shake 0.5s ease-in-out 1;
	background-color: pink;
}

@keyframes shake {
	0% {
		transform: translateX(0);
	}
	25% {
		transform: translateX(-10px);
	}
	50% {
		transform: translateX(10px);
	}
	75% {
		transform: translateX(-10px);
	}
	100% {
		transform: translateX(0);
	}
}
</style>
