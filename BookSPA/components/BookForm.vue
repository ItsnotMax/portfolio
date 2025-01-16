<template lang="html">
	<div class="relative p-5 xs:p-7 sm:p-[32px]">
		<h1 class="text-[#0F172A] text-[20px] font-bold">{{ props.title }}</h1>
		<p class="text-[14px] text-[#8E959F] mb-[16px]">
			{{ props.p }}
		</p>
		<button
			type="button"
			@click.stop="emit('isOpen', false)"
			class="reset-btn absolute top-8 right-8 min-w-6 min-h-6"
		>
			<svg
				width="24"
				height="24"
				class="stroke-[#707786] transition-all duration-[300ms] hover:stroke-[#000000] hover:scale-110"
			>
				<use xlink:href="/sprites.svg#closeSVG"></use>
			</svg>
		</button>

		<form @submit.prevent="sendForm" class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<label for="title" class="font-bold text-[#0F172A] text-[14px]">
					<p class="mb-1">Название</p>
					<textarea
						name="title"
						v-model="form.title"
						id="title"
						class="w-full rounded-lg bg-[#F7F8FA] text-[14px] font-normal px-[12px] py-[10px] not-scrollbar resize-none"
						type="text"
						maxlength="200"
						title="Название произведения"
						placeholder="Название произведения"
						@input="isValidTitle"
					></textarea>
				</label>
				<label
					for="author"
					class="font-bold text-[#0F172A] text-[14px]"
				>
					<p class="mb-1">Автор</p>
					<input
						v-model="form.author"
						id="author"
						class="w-full rounded-lg bg-[#F7F8FA] text-[14px] font-normal px-[12px] py-[10px]"
						type="text"
						maxlength="200"
						title="Имя и фамилия автора"
						placeholder="Имя и фамилия автора"
						@input="isValidName"
					/>
				</label>
				<label for="year" class="font-bold text-[#0F172A] text-[14px]">
					<p class="mb-1">Год</p>
					<input
						v-model="form.year"
						id="year"
						class="w-full rounded-lg bg-[#F7F8FA] text-[14px] font-normal px-[12px] py-[10px]"
						type="text"
						title="Год выпуска"
						placeholder="Год выпуска"
						@input="isCurrentYear"
					/>
				</label>
				<label
					for="genre"
					class="font-bold text-[#0F172A] text-[14px] mb-4"
				>
					<p class="mb-1">Жанр</p>
					<input
						v-model="form.genre"
						id="genre"
						class="w-full rounded-lg bg-[#F7F8FA] text-[14px] font-normal px-[12px] py-[10px]"
						type="text"
						maxlength="200"
						title="Добавьте жанр произведения"
						placeholder="Добавьте жанр произведения"
						@input="isValidGenre"
					/>
				</label>
			</div>

			<label
				for="policy"
				class="relative flex items-center cursor-pointer"
			>
				<input
					id="policy"
					type="checkbox"
					class="invisible mr-[20px] peer"
					v-model="form.agree"
				/>
				<svg
					width="24"
					height="24"
					class="absolute left-0 stroke-[#707786] fill-[white] transition-all duration-[300ms] peer-checked:fill-[#1C7D41] peer-checked:stroke-[#1C7D41]"
				>
					<use xlink:href="/sprites.svg#checkboxSVG"></use>
				</svg>
				<svg
					width="18"
					height="18"
					class="absolute left-[7px] top-[3px] opacity-0 transition-all duration-[300ms] peer-checked:opacity-100"
				>
					<use xlink:href="/sprites.svg#checkMark"></use>
				</svg>

				<span class="text-sm text-[#707786] font-normal text-[9px]">
					Я согласен с условиями
					<a href="/" class="relative">
						Политики конфиденциальности
						<span
							class="absolute left-0 bottom-0 w-full h-[1px] bg-[#707786]"
						></span>
					</a>
				</span>
			</label>
			<div class="flex justify-end items-center gap-2">
				<button
					type="submit"
					class="flex flex-row gap-[4px] justify-center items-center transition-all duration-[300ms] rounded-lg py-[10px] px-[12px] w-full sm:w-[max-content] group"
					:class="{
						'cursor-not-allowed': !isFormValid,
						'ml-auto': !props.editBook,
						'bg-[#1C7D41]': isFormValid,
						'bg-[#D3D3D3]': !isFormValid,
					}"
					:disabled="!isFormValid"
				>
					<svg
						width="24"
						height="24"
						class="fill-none stroke-[rgba(255,255,255,0.5)] transition-all duration-[300ms]"
						:class="{
							'group-hover:stroke-[rgba(255,255,255,1)]':
								isFormValid,
						}"
					>
						<use
							:xlink:href="
								props.editBook
									? '/sprites.svg#saveEditedBookSVG'
									: '/sprites.svg#addBookSVG'
							"
						></use>
					</svg>

					<span
						class="text-white text-[14px] transition-all duration-300 hover:bg-[#19713B]"
						>{{ props.editBook ? "Сохранить" : "Добавить" }}
					</span>
				</button>
				<button
					v-if="props.editBook"
					@click.stop="deleteBook"
					type="button"
					class="flex flex-row gap-[4px] justify-center items-center bg-[#F7F8FA] rounded-lg py-[10px] px-[12px] group w-[max-content]"
				>
					<svg
						width="24"
						height="24"
						class="fill-none stroke-[#8E959F] transition-all duration-[300ms] group-hover:stroke-[#900B09]"
					>
						<use xlink:href="/sprites.svg#trashBinSVG"></use>
					</svg>
				</button>
			</div>
		</form>
	</div>
</template>
<script setup lang="js">
import { reactive, computed } from "vue";

const emit = defineEmits([
	"isOpen",
	"saveBook",
	"updateBook",
	"update:deleteBook",
]);
const props = defineProps({
	editBook: {
		type: [Object, null],
		required: true,
	},
	title: {
		type: [String, null],
		required: true,
	},
	p: {
		type: [String, null],
		required: true,
	},
});
const currentYear = new Date().getFullYear();
const form = reactive({
	title: props.editBook ? props.editBook.title : "",
	author: props.editBook ? props.editBook.author : "",
	year: props.editBook ? props.editBook.year : "",
	genre: props.editBook ? props.editBook.genre : "",
	agree: false,
});

const isFormValid = computed(() => {
	return Object.values(form).every(
		(value) => value !== false && value !== "",
	);
});
const isCurrentYear = () => {
	const pattern = /[^0-9]+/g;
	form.year = form.year.replace(pattern, "");

	if (form.year.length === 0) return;
	if (form.year > currentYear) form.year = Number(currentYear);
	form.year = Number(form.year);
};
const isValidTitle = () => {
	const pattern = /[^а-яa-z0-9\s\-,.?!:;()]/gi;
	form.title = form.title.replace(pattern, "");
};
const isValidName = () => {
	const pattern = /[^а-яa-z\s-]/gi;
	form.author = form.author.replace(pattern, "");
};
const isValidGenre = () => {
	const pattern = /[^а-яa-z\s-]/gi;
	form.genre = form.genre.replace(pattern, "");
};

function sendForm() {
	if (props.editBook) {
		form["key"] = props.editBook.key;
		emit("updateBook", form);
	} else emit("saveBook", form);

	emit("isOpen", true);
}

function deleteBook() {
	emit("update:deleteBook", props.editBook);
	emit("isOpen", true);
}
</script>
<style scoped lang="scss"></style>
