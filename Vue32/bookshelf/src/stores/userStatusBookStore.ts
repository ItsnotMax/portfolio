import { defineStore } from 'pinia';
import type { Book } from '@/types/book';

export const userStatusBookStore = defineStore('statusBook', {
  state: () => ({
    reading: [] as Book[],
    read: [] as Book[],
  }),
  actions: {
    pushReadingBook(book: Book) {
      this.reading.push(book);
    },
    pushReadBook(book: Book) {
      this.read.push(book);
    },
  },
});
