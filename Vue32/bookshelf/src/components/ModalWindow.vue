<template lang="html">
    <div id="modalWindow" class="modal">
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="flex flex-right">
                    <h2>List of {{ props.h2 }} books</h2>
                    <button class="reset-btn close-button" @click="closeModalWindow"></button>
                </div>
                <ul class="list-book" v-if="booklist.length > 0">
                    <li class="flex flex-li" v-for="(book, index) in booklist" :key="book.id">
                        <span class="block list-id">{{ index + 1 }}.</span>
                        <span class="block list-size list-title">{{ book.title }}</span>
                        <span class="block list-size list-author">{{ book.author }}</span>
                        <span class="block list-size list-publication_year">{{ book.publication_year }} year</span>
                        <div class="delete-block">
                            <button type="button" @click="deleteBook(book)" class="reset-btn delete">Remove from
                                list</button>
                        </div>
                    </li>
                </ul>
                <p class="list-book" v-else>List is empty</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Book } from '@/types/book';
import { onMounted, onUnmounted, ref } from 'vue'
import { counterStore } from '@/stores/counterStore'
import { isModalWindow } from '@/typeguards/typeguards';

const modalWindowRef = ref<HTMLElement | null>(null);
const emit = defineEmits(['closeModal']);
const counterHandler = counterStore()

const props = defineProps({
    bookList: {
        type: Array as () => Book[],
        required: true
    },
    modalWindowFlag: {
        type: Boolean,
        required: true
    },
    h2: {
        type: String
    }
});
const booklist = ref(props.bookList)

const closeModalWindow = () => {
    emit('closeModal', false);
}

onMounted(async () => {
    modalWindowRef.value = document.querySelector('#modalWindow');
    if (modalWindowRef.value) {
        modalWindowRef.value.addEventListener('click', (event: Event) => {
            if (isModalWindow(event.target)) {
                closeModalWindow()
            }
        });
    }
});

onUnmounted(() => {
    if (modalWindowRef.value) {
        modalWindowRef.value.removeEventListener('click', (event: Event) => {
            if (isModalWindow(event.target)) {
                closeModalWindow()
            }
        });
    }
});

function isBook(item: any): item is Book[] {
    return Array.isArray(item) && item.every((element: any) => typeof element === 'object' && 'id' in element);
}


function removeBook<T>(list: T, bookToDelete: Book): T {
    if (isBook(list)) {
        const filtered = list.filter(book => {
            return book.id != bookToDelete.id
        }) as T
        return filtered
    } else {
        return list.filter(book => {
            return book != bookToDelete.id
        })
    }

}

const deleteBook = (bookToDelete: Book) => {
    const isReading = props.h2?.toLowerCase() === 'reading';
    const isRead = props.h2?.toLowerCase() === 'read';

    if (isReading) {
        counterHandler.readingList = removeBook(counterHandler.readingList, bookToDelete);
        counterHandler.disabledReadingButton = removeBook(counterHandler.disabledReadingButton, bookToDelete);
        counterHandler.reading = counterHandler.setCount(counterHandler.readingList);
    }
    if (isRead) {
        counterHandler.readList = removeBook(counterHandler.readList, bookToDelete);
        counterHandler.disabledReadButton = removeBook(counterHandler.disabledReadButton, bookToDelete);
        counterHandler.read = counterHandler.setCount(counterHandler.readList);
    }

    booklist.value = isReading ? counterHandler.readingList : counterHandler.readList;
}
</script>