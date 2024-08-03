<template lang="html">
    <div class="container">
        <header>
            <div class="booklist-wrapper">
                <input type="text" class="searcher" placeholder="Enter the book title or author name"
                    v-model="searchQuery">
                <div class="header" v-if="authentication.isAuthenticated">
                    <button type="button" @click="showModalWindow(counter.readingList, 'reading')"
                        class="reset-btn status">Reading: {{ counter.reading
                        }}</button>
                    <button type="button" @click="showModalWindow(counter.readList, 'read')"
                        class="reset-btn status">Read: {{
                        counter.read
                    }}</button>
                    <button type="button" @click="login" class="reset-btn log-in reset-log-in">Log
                        out</button>
                </div>
                <div class="header header-warning" v-else>
                    <span>You are not authorized, so book search and book statuses are not available to you</span>
                    <button type="button" @click="login" class="reset-btn log-in reset-log-in">Log
                        in</button>
                </div>
            </div>
        </header>
        <main>
            <div class="booklist-wrapper">
                <CreateList :pageAndCover="paginationPageAndCover()" />
                <AppPagination :pagination="{ totalPages: pagination.totalPage, currentPage: pagination.currentPage }"
                    @update:current-page="handleUpdateCurrentPage" />
            </div>
            <ModalWindow v-if="modalWindowFlag" :h2="h2ToProps" :bookList="bookList" :modalWindowFlag="modalWindowFlag"
                @closeModal="closeModalWindow" />
        </main>
    </div>
</template>

<script setup lang="ts">
import { fetchGET } from '@/js_modules/fetch'
import { ref, onBeforeMount, computed } from 'vue'
import CreateList from '@/components/CreateList.vue';
import type { Book } from '@/types/book';
import { checkAuthStore } from '@/stores/authenticationStore'
import { counterStore } from '@/stores/counterStore';
import { checkText } from '@/js_modules/checkTxt';
import ModalWindow from '@/components/ModalWindow.vue';
import AppPagination from '@/components/AppPagination.vue';
import { pagination, assigningPagination } from '@/js_modules/assigningPagination'
import { useRouter } from 'vue-router';

const response = ref<Book[] | null>(null);
const bookCovers = ref<string[] | null>(null);
const searchQuery = ref<string | null>(null);
const modalWindowFlag = ref<boolean>(false);
const bookList = ref<Book[]>([]);
const authentication = checkAuthStore();
const counter = counterStore();
const h2ToProps = ref<string>('');
const router = useRouter();

onBeforeMount(async () => {
    const getAnswer = await fetchGET('https://freetestapi.com/api/v1/books');
    const bookCoverList = [...getAnswer].map((book) => book.cover_image);

    response.value = getAnswer;
    bookCovers.value = bookCoverList;
    if (response.value && bookCovers.value) {
        assigningPagination(response.value, bookCovers.value)
    }
})

const filteredBooks = computed(() => {
    if (!response.value || !searchQuery.value || !checkText(searchQuery.value)) return false;
    const query = checkText(searchQuery.value.toLowerCase());
    const filteredBooks = response.value.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    return filteredBooks
})

const login = () => {
    authentication.login();
}

const showModalWindow = (bookListToProps: Book[], h2: string) => {
    modalWindowFlag.value = true;
    bookList.value = bookListToProps;
    h2ToProps.value = h2;
}

const closeModalWindow = () => {
    modalWindowFlag.value = false;
}

const handleUpdateCurrentPage = (newPage: number) => {
    pagination.value.currentPage = newPage;
    router.push({ name: 'bookshelfPage', params: { page: pagination.value.currentPage } });
}

function setFirstPage() {
    router.replace({ params: { page: '1' } });
    pagination.value.currentPage = Number(1);
}

const paginationPageAndCover = () => {
    const page = Number(router.currentRoute.value.params.page)
    if (filteredBooks.value) {
        assigningPagination(filteredBooks.value);
        if (pagination.value.totalPage === 1 || pagination.value.totalPage < page) {
            setFirstPage();
        }
        return { response: pagination.value.list[page - 1], bookCovers: pagination.value.coverBookList[page - 1] }
    } else {
        (response.value && bookCovers.value) && assigningPagination(response.value, bookCovers.value);
    }

    return { response: pagination.value.list[page - 1], bookCovers: pagination.value.coverBookList[page - 1] }
}
</script>