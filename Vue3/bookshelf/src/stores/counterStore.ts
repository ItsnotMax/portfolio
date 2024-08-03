import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Book } from '@/types/book';

export const counterStore = defineStore('count', () => {
    const reading = ref<number>(0);
    const read = ref<number>(0);
    const readingList = ref<Book[]>([]);
    const readList = ref<Book[]>([]);

    const disabledReadingButton = ref<number[]>([]);
    const disabledReadButton = ref<number[]>([]);

    const setCount = (list: Book[]) => {
        return list.length;
    }

    const startReading = (book: Book) => {
        readingList.value.push(book);
        reading.value = setCount(readingList.value)
    }

    const finishReading = (book: Book) => {
        readList.value.push(book);
        read.value = setCount(readList.value);
        [...readList.value].forEach(readBook => {
            readingList.value = readingList.value.filter(readingBook => readingBook.id != readBook.id)
            disabledReadingButton.value = disabledReadingButton.value.filter(id => id != readBook.id)
        })
        reading.value = setCount(readingList.value)
    }

    return { reading, read, setCount, disabledReadingButton, disabledReadButton, readingList, readList, startReading, finishReading }
})

