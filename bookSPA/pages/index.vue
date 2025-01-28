<template lang="html">
	<div class="bg-[#F7F8FA] pb-4 px-5 xs:px-7 sm:px-[52px]">
		<SearchAndAddComponent
			:total-books="
				isLoadedBooks
					? String(savedBooks.length)
					: 'загружаю, подождите'
			"
			v-model="search"
			@update:open-add-book-form="isOpenAddBookForm = $event"
			@sort-by="
				sortBy($event, searchedResults ? searchedResults : savedBooks)
			"
		/>
	</div>
	<div
		v-if="isLoadedBooks"
		class="flex-grow py-4 px-5 h-min overflow-scroll not-scrollbar xs:px-7 sm:px-[52px]"
	>
		<div
			v-if="savedBooks.length === 0 && search.length === 0"
			class="flex flex-col flex-grow text-[16px] text-[#707786] leading-[120%] px-5 xs:px-7 sm:px-[52px]"
		>
			В вашем хранилище нет книг
		</div>
		<div
			class="flex flex-col flex-grow gap-4"
			v-else-if="savedBooks.length > 0 && searchedResults"
		>
			<div
				v-for="book in searchedResults.length > 0
					? searchedResults
					: savedBooks"
				:key="book.key"
				class="p-4 rounded-2xl border-[#F7F8FA] border-[2px] transition-all duration-[300ms] hover:bg-[#F7F8FA]"
			>
				<div class="flex justify-between items-start gap-10 mb-2">
					<span class="text-[16px] leading-[120%] text-[#0f172a]">
						{{ book.title }}
					</span>
					<button
						type="button"
						@click.stop="toEditBook(book)"
						class="reset-btn"
					>
						<svg
							width="20"
							height="20"
							class="fill-none stroke-[#707786] transition-all duration-[300ms] hover:scale-125"
						>
							<use xlink:href="/sprites.svg#editBook"></use>
						</svg>
					</button>
				</div>
				<div
					class="flex gap-4 text-[14px] leading-[150%] text-[#707786] truncate"
				>
					<span>{{ book.author }}</span>
					<span>{{ book.year }}</span>
					<span>{{ book.genre }}</span>
				</div>
			</div>
		</div>
		<div
			v-else
			class="flex flex-col flex-grow text-[16px] text-[#707786] leading-[120%] px-5 xs:px-7 sm:px-[52px]"
		>
			По вашему запросу ничего не найдено
		</div>
	</div>
	<div v-else class="flex-grow">
		<LoadingCircle />
	</div>
	<teleport
		:to="isDesktop || isTablet ? 'body' : '#section'"
		v-if="isOpenAddBookForm"
	>
		<ModalWindowComponent @is-open="closeFormHandler($event)">
			<template #default>
				<BookForm
					@save-book="saveBook($event)"
					@update-book="updateBook($event)"
					@is-open="closeFormHandler($event)"
					@update:delete-book="deleteBook($event)"
					:editBook="bookForEdit"
					:title="bookForEdit ? 'Редактирование' : 'Добавить книгу'"
					:p="
						bookForEdit
							? 'Внесите изменение в карточке'
							: 'Заполните все поля и добавьте книгу в список'
					"
				/>
			</template>
		</ModalWindowComponent>
	</teleport>
	<teleport
		v-if="isMounted"
		:to="isDesktop || isTablet ? '#desktop' : '#mobile'"
	>
		<button
			id="addBook"
			@click.stop="isOpenAddBookForm = true"
			class="flex flex-row gap-[4px] justify-center items-center bg-[#1C7D41] rounded-lg py-[10px] px-[12px] w-full transition-all duration-300 group sm:min-w-[max-content] hover:bg-[#19713B]"
			:class="{ 'order-2': isMobile }"
		>
			<svg
				width="24"
				height="24"
				class="fill-none stroke-[rgba(255,255,255,0.5)] transition-all duration-[300ms] group-hover:stroke-[rgba(255,255,255,1)]"
			>
				<use xlink:href="/sprites.svg#addBookSVG"></use>
			</svg>

			<span class="text-white text-[14px]">Добавить книгу</span>
		</button>
	</teleport>
	<teleport
		:to="isDesktop || isTablet ? '#section' : '#mobile'"
		v-if="isMounted && Object.keys(notification).length > 0"
	>
		<button
			@click.stop="notificationHandler"
			type="button"
			class="reset-btn sticky mx-auto bottom-4 flex flex-row gap-[10px] justify-center items-center rounded-lg py-[10px] px-[12px] w-full sm:w-[max-content]"
			:class="[
				notification.class,
				{ group: !('deletedBook' in notification) },
			]"
		>
			<svg width="24" height="24" class="fill-none stroke-white">
				<use :xlink:href="notification.svg"></use>
			</svg>

			<span class="reset-btn text-white text-[14px]">{{
				notification.title
			}}</span>

			<svg
				width="24"
				height="24"
				class="stroke-[#707786] transition-all duration-[300ms] group-hover:stroke-[rgba(255,255,255,1)]"
				:class="{
					'hover:stroke-[rgba(255,255,255,1)]':
						'deletedBook' in notification,
				}"
				@click.stop="notification = {}"
			>
				<use xlink:href="/sprites.svg#closeSVG"></use>
			</svg>
		</button>
	</teleport>
</template>
<script setup lang="js">
import SearchAndAddComponent from "~/components/SearchAndAddComponent.vue";
import ModalWindowComponent from "~/components/ModalWindowComponent.vue";
import LoadingCircle from "~/components/LoadingCircle.vue";
import BookForm from "~/components/BookForm.vue";
import { onMounted, watch, ref, computed } from "vue";
import { useDBStore } from "~/stores/dbStore";
import { storeToRefs } from "pinia";
import { useScreenStore } from "~/stores/screenSizeStore";

const screenStore = useScreenStore();
const { isDesktop, isTablet, isMobile } = storeToRefs(screenStore);

const dbStore = useDBStore();
const isOpenAddBookForm = ref(false);
const savedBooks = ref([]);
const bookForEdit = ref(null);
const isMounted = ref(false);
const search = ref("");
const searchedResults = ref([]);
const notification = ref({});
const isLoadedBooks = ref(false);

// eslint-disable-next-line space-before-function-paren
onMounted(async () => {
	isMounted.value = true;
	// eslint-disable-next-line space-before-function-paren
	setTimeout(async () => {
		await dbStore.initDB();
		savedBooks.value = await dbStore.getAllBooks();
		isLoadedBooks.value = true;
	}, 2000);
});
function sortBy(options, array) {
	const isStringSort = options.option !== "year";
	const sortFn = isStringSort
		? (a, b) =>
				a[options.option].localeCompare(
					b[options.option],
					["ru", "en", "en-u-kn-true"],
					{ sensitivity: "base" },
				)
		: (a, b) => a[options.option] - b[options.option];

	array.sort((a, b) =>
		options.dir === "ascending" ? sortFn(a, b) : sortFn(b, a),
	);
}
function toEditBook(book) {
	bookForEdit.value = book;
	isOpenAddBookForm.value = true;
}
async function saveBook(book) {
	await dbStore.addBook(book);
	savedBooks.value = await dbStore.getAllBooks();

	if (
		searchedResults.value.length > 0 &&
		"deletedBook" in notification.value
	) {
		searchedResults.value.push(book);
	} else if ("deletedBook" in notification.value && !searchedResults.value) {
		searchedResults.value = [];
		searchedResults.value.push(book);
	}

	notification.value = {
		title: "Книга добавлена в список",
		svg: "sprites.svg#addBookSVG",
		class: "bg-[#1C7D41] hover:bg-[#19713B] duration-300 transition-all",
	};
}
async function deleteBook(book) {
	notification.value = {
		title: "Книга удалена. Вернуть её",
		svg: "sprites.svg#trashBinSVG",
		class: "bg-[#1C7D41] hover:bg-[#19713B] duration-300 transition-all",
		deletedBook: book,
	};
	await dbStore.deleteBook(book.key);
	savedBooks.value = await dbStore.getAllBooks();

	if (searchedResults.value.length > 0)
		searchedResults.value = searchedResults.value.filter(
			(result) => result.key !== book.key,
		);

	if (searchedResults.value.length === 0 && search.value.length > 0)
		searchedResults.value = false;
}
async function updateBook(book) {
	await dbStore.updateBook(book.key, book);
	savedBooks.value = await dbStore.getAllBooks();
	searchedResults.value = searchedResults.value
		.map((searchedBook) => {
			return savedBooks.value.filter(
				(book) => book.key == searchedBook.key,
			);
		})
		.flat();
}
const findIntersections = computed(() => {
	const targetSet = new Set(search.value.toLowerCase());
	const results = [];
	const books =
		searchedResults.value && searchedResults.value.length !== 0
			? searchedResults.value
			: savedBooks.value;

	books &&
		books.forEach((book) => {
			const bookSet = new Set(book.title.toLowerCase());

			if (book.title.length < search.value.length) return;

			const intersection = [...targetSet].filter((char) =>
				bookSet.has(char),
			);
			const intersectionPercent =
				(intersection.length / bookSet.size) * 100 +
				(search.value.length / book.title.length) * 100;

			if (intersection.length > 0) {
				results.push({
					book: book,
					percentage: intersectionPercent.toFixed(2),
				});
			}
		});

	if (results.length === 0) return false;

	results.sort((a, b) => b.percentage - a.percentage);

	return results.map((book) => book.book);
});
function notificationHandler() {
	if ("deletedBook" in notification.value) {
		saveBook(notification.value.deletedBook);
	} else {
		notification.value = {};
	}
}
function closeFormHandler(close) {
	if (!close) {
		notification.value = {
			title: "Книга не добавлена",
			svg: "sprites.svg#bookNotAddedSVG",
			class: "bg-[#900B09] hover:bg-[#820A08] duration-300 transition-all",
		};
	}

	isOpenAddBookForm.value = close ? !close : close;
}
watch(isOpenAddBookForm, (newVal, oldVal) => {
	if (oldVal && !newVal) {
		bookForEdit.value = null;
	}
});
watch(search, (newVal, oldVal) => {
	if (newVal === "") {
		searchedResults.value = [];
		return;
	}
	if (oldVal && newVal.length < oldVal.length) searchedResults.value = [];
	searchedResults.value = findIntersections.value;
});
</script>
<style scoped lang="scss"></style>
