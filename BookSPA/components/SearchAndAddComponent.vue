<template lang="html">
	<div
		class="relative flex flex-row gap-[25px] py-4 justify-between xs:justify-start"
	>
		<img
			class="min-w-[55px] min-h-[41px]"
			src="/public/main-sign.svg"
			alt="main sign"
			loading="lazy"
		/>
		<div
			class="relative flex items-center xs:flex-grow transition-all duration-300"
			:class="{ 'w-10 flex-row-reverse': isMobile, 'w-full': showInput }"
			@click.stop="isMobile ? (showInput = true) : null"
		>
			<svg
				:width="!inputedValue ? '20' : '24'"
				:height="!inputedValue ? '20' : '24'"
				class="absolute left-[10px] top-[50%] -translate-y-1/2 stroke-[#707786] xs:left-3"
				:class="{ 'reset-btn': inputedValue }"
				@click.stop="inputedValue && emit('update:modelValue', '')"
			>
				<use
					v-if="!inputedValue"
					xlink:href="/sprites.svg#searchSVG"
				></use>
				<use v-else xlink:href="/sprites.svg#closeSVG"></use>
			</svg>

			<input
				class="rounded-lg p-[10px] w-[inherit] xs:w-full xs:pl-[40px] sm:pr-[12px]"
				:class="{ 'pl-[30px]': showInput }"
				type="text"
				maxlength="200"
				title="Начните вводить"
				:placeholder="
					isMobile && !showInput ? '' : 'Найти ту самую книгу'
				"
				v-model="inputedValue"
				@input="
					() => {
						inputedValue = inputedValue.replace(
							/[^а-яa-z0-9\s\-,.?!:;()]/gi,
							'',
						);
					}
				"
			/>
		</div>
	</div>
	<div class="flex flex-row gap justify-between items-center">
		<div class="flex gap-2 text-[20px] font-semibold overflow-hidden">
			<span class="text-nowrap">{{
				!inputedValue ? "Книги в каталоге" : "Книги по запросу"
			}}</span>
			<span class="text-[#707786] truncate">
				{{
					!inputedValue
						? props.totalBooks
						: `&laquo;${inputedValue}&raquo;`
				}}
			</span>
		</div>
		<div id="desktop"></div>
	</div>
	<div class="flex gap-4">
		<button
			@click="toggleButton($event.target.dataset.option)"
			type="button"
			data-option="title"
			class="px-2 py-1 rounded-lg bg-slate-100 transition-all duration-300 hover:bg-slate-300"
		>
			Название
		</button>
		<button
			@click="toggleButton($event.target.dataset.option)"
			type="button"
			data-option="author"
			class="px-2 py-1 rounded-lg bg-slate-100 transition-all duration-300 hover:bg-slate-300"
		>
			Автор
		</button>
		<button
			@click="toggleButton($event.target.dataset.option)"
			type="button"
			data-option="year"
			class="px-2 py-1 rounded-lg bg-slate-100 transition-all duration-300 hover:bg-slate-300"
		>
			Год
		</button>
	</div>
</template>

<script setup lang="js">
import { computed, ref } from "vue";
import { useScreenStore } from "~/stores/screenSizeStore";
import { storeToRefs } from "pinia";

const showInput = ref(false);

const screenStore = useScreenStore();
const { isMobile } = storeToRefs(screenStore);
const sortBy = ref("");
const sortDir = ref(true);
const emit = defineEmits(["update:modelValue", "sortBy"]);
const props = defineProps({
	totalBooks: { type: Number, required: true },
	modelValue: String,
});

const inputedValue = computed({
	get: () => props.modelValue,
	set: (value) => emit("update:modelValue", value),
});

function toggleButton(option) {
	if (sortBy.value == option) sortDir.value = !sortDir.value;
	else sortDir.value = true;
	emit("sortBy", {
		option: option,
		dir: sortDir.value ? "ascending" : "descending",
	});
	sortBy.value = option;
}
</script>

<style scoped lang="scss"></style>
