<template lang="html">
	<div class="grid gap-8 lg:grid-cols-2">
		<div
			class="relative flex flex-row overflow-hidden rounded-2xl shadow-xl"
		>
			<img
				v-for="(url, index) in json.images"
				:key="url + index"
				:src="url"
				:alt="'Картинка'"
				loading="lazy"
				class="absolute min-w-full h-full object-center object-cover"
				:class="currentImage == url ? 'z-[10]' : 'z-0'"
			/>

			<button
				@click="prev"
				class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition hover:bg-white/30 active:scale-90 active:bg-black/10 z-20"
			>
				<Icon
					name="material-symbols:arrow-back-2-rounded"
					class="w-6 h-6 text-white"
				/>
			</button>
			<button
				@click="next"
				class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition hover:bg-white/30 active:scale-90 active:bg-black/10 z-20"
			>
				<Icon
					name="material-symbols:play-arrow-rounded"
					class="w-6 h-6 text-white"
				/>
			</button>
		</div>

		<div
			class="relative grid grid-rows-[auto_auto_auto] gap-1 bg-white rounded-2xl shadow-xl h-full w-full p-4 md:p-6 lg:p-8"
		>
			<h1 class="relative text-3xl font-bold text-gray-900">
				{{ json.productTitle }}
			</h1>

			<div class="relative flex flex-col flex-wrap w-full gap-4 py-8">
				<div class="relative w-[inherit] py-4">
					<h2>{{ json.badges.delivery.title }}</h2>
					<div
						class="flex flex-row flex-wrap justify-center items-center gap-6 bg-gray-50"
					>
						<label
							v-for="badge in json.badges.delivery.options.slice(
								0,
								4,
							)"
							:key="badge"
							class="relative flex flex-1 justify-center bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
							:class="{
								'blur-sm hover:blur-0':
									selectedOptions.delivery != null &&
									selectedOptions.delivery != badge,
								'badges--trigger':
									errorTrigger &&
									selectedOptions.delivery == null,
							}"
						>
							<input
								type="radio"
								name="delivery"
								:value="badge"
								class="hidden"
								v-model="selectedOptions.delivery"
							/>
							<span
								class="p-4 text-center font-semibold text-lg text-blue-700 uppercase"
							>
								{{ badge }}
							</span>
							<Icon
								v-show="selectedOptions.delivery === badge"
								name="stash:check-circle"
								class="absolute -top-2 -right-2 w-10 h-10 text-green-600"
							/>
						</label>
					</div>
				</div>

				<div class="py-4">
					<h2>
						{{ json.badges.wishes.title }}
					</h2>
					<div
						class="flex flex-row flex-wrap justify-center items-center gap-6 bg-gray-50"
					>
						<label
							v-for="badge in json.badges.wishes.options.slice(
								0,
								4,
							)"
							:key="badge"
							class="relative flex flex-1 justify-center bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
							:class="{
								'blur-sm hover:blur-0':
									selectedOptions.wishes != null &&
									selectedOptions.wishes != badge,
								'badges--trigger':
									errorTrigger &&
									selectedOptions.wishes == null,
							}"
						>
							<input
								type="radio"
								name="wishes"
								:value="badge"
								class="hidden"
								v-model="selectedOptions.wishes"
							/>
							<span
								class="p-4 text-center font-semibold text-lg text-blue-700 uppercase"
							>
								{{ badge }}
							</span>
							<Icon
								v-show="selectedOptions.wishes === badge"
								name="stash:check-circle"
								class="absolute -top-2 -right-2 w-10 h-10 text-green-600"
							/>
						</label>
					</div>
				</div>
			</div>

			<div
				class="flex flex-col gap-4 justify-center self-end sm:flex-row"
			>
				<div
					class="flex flex-[3] justify-center sm:justify-end items-center text-2xl font-semibold text-blue-700 lg:flex-[2]"
				>
					{{ json.price }} ₽
				</div>
				<button
					@click="openForm"
					class="flex-[7] bg-blue-600 text-white py-3 rounded-lg transition text-xl uppercase hover:bg-blue-700 disabled:bg-black lg:flex-[8]"
					:disabled="errorTrigger"
				>
					Купить
				</button>
			</div>
		</div>
	</div>
	<component :is="AsyncModalForm" v-if="showModal">
		<template #default>
			<AsyncOrderForm
				v-bind="selectedOptions"
				@update:isModalOpen="showModal = $event"
			/>
		</template>
	</component>
</template>

<script setup lang="js">
import { ref, reactive, computed, defineAsyncComponent } from "vue";
import { objectIsNull } from "~/utils/guards";
const AsyncModalForm = defineAsyncComponent(
	() => import("~/components/ModalWindow"),
);
const AsyncOrderForm = defineAsyncComponent(
	() => import("~/components/OrderForm"),
);

const showModal = ref(false);
const currentIndex = ref(0);
const errorTrigger = ref(false);
const selectedOptions = reactive({
	delivery: null,
	wishes: null,
});

const props = defineProps({
	json: Object,
});

const next = () => {
	if (!props.json.images?.length) return;
	currentIndex.value = (currentIndex.value + 1) % props.json.images.length;
};

const prev = () => {
	if (!props.json.images?.length) return;
	currentIndex.value =
		(currentIndex.value - 1 + props.json.images.length) %
		props.json.images.length;
};

const currentImage = computed(
	() => props.json.images?.[currentIndex.value] ?? "../placeholder.jpg",
);
const openForm = () => {
	if (objectIsNull(selectedOptions)) {
		errorTrigger.value = true;
		setTimeout(() => {
			errorTrigger.value = false;
		}, 500);
		return;
	}
	selectedOptions.productTitle = props.json.productTitle;
	selectedOptions.price = props.json.price;
	showModal.value = true;
};
</script>

<style scoped lang="scss">
.badges--trigger {
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
