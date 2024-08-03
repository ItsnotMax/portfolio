<template lang="html">
    <ul class="flex flex-wrap flex-gap" v-if="props.pageAndCover.response && props.pageAndCover.bookCovers">
        <li v-for="(book, index) in props.pageAndCover.response" :key="book.id">
            <div class='flex flex-row book' @mouseover="handleMouseOver(index)" @mouseleave="resetHoveredBook(index)">
                <img class="bookcover" :src="props.pageAndCover.bookCovers[index]" alt="Ooops">
                <div class="book-description">
                    <div class="title">{{ book.title }}</div>
                    <div class="author">Author: <span class="author-size">{{ book.author }}</span></div>
                </div>
                <div v-if="hoveredBooks[index] && authentication.isAuthenticated" class="flex read-buttons">
                    <button @click="(event) => start(event, book)" type="button" class="reset-btn reading"
                        :class="{ 'disabled-button': checkMatch('Reading', book.id) }"
                        :disabled="checkMatch('Reading', book.id)">Reading</button>

                    <button @click="(event) => finish(event, book)" type="button" class="reset-btn read"
                        :class="{ 'disabled-button': checkMatch('Read', book.id) }"
                        :disabled="checkMatch('Read', book.id)">Read</button>
                </div>
            </div>
        </li>
    </ul>

</template>

<script setup lang="ts">
import type { Book } from '@/types/book';
import { ref } from 'vue';
import { checkAuthStore } from '@/stores/authenticationStore'
import { counterStore } from '@/stores/counterStore';
import { isElement } from '@/typeguards/typeguards'

const hoveredBooks = ref<boolean[]>([false]);
const authentication = checkAuthStore();
const counterHandler = counterStore();

const props = defineProps({
    pageAndCover: {
        type: Object as () => { response: Book[], bookCovers: string[] },
        required: true
    }
});

const checkMatch = (statusBook: string, id: number) => {
    if (statusBook.toLowerCase() == 'reading') {
        return counterHandler.disabledReadingButton.includes(id);
    }
    if (statusBook.toLowerCase() == 'read') {
        return counterHandler.disabledReadButton.includes(id);
    }
    return false;
}



const start = (event: Event, book: Book) => {
    if (isElement(event.target) && event.target.textContent) {
        counterHandler.startReading(book);
        'disabled' in event.target && event.target.textContent.toLowerCase() === 'reading' ? (counterHandler.disabledReadingButton.push(book.id)) : (counterHandler.disabledReadButton.push(book.id))
    }
}
const finish = (event: Event, book: Book) => {
    if (isElement(event.target) && event.target.textContent) {
        counterHandler.finishReading(book);
        'disabled' in event.target && event.target.textContent.toLowerCase() === 'read' ? (counterHandler.disabledReadButton.push(book.id)) : (counterHandler.disabledReadingButton.push(book.id))
    }
}

const handleMouseOver = (index: number) => {
    hoveredBooks.value[index] = true;
};

const resetHoveredBook = (index: number) => {
    hoveredBooks.value[index] = false;
};


</script>