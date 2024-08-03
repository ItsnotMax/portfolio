import type { Book, Pagination } from '@/types/book'
import { ref } from 'vue';

export const pagination = ref<Pagination>({
    totalPage: 0,
    currentPage: 1,
    list: [[]],
    coverBookList: []
})

export function assigningPagination(bookList: Book[], coverBook?: string[]) {
    const blockSize = 8;
    pagination.value.list = divideToPagination(bookList, blockSize);
    if (coverBook) {
        pagination.value.coverBookList = divideToPagination(coverBook, blockSize);
    }
    pagination.value.totalPage = pagination.value.list.length;
}

function divideToPagination<T>(array: T[], stepSize: number): T[][] {
    const step = stepSize;
    const blocks = [];
    let index = 0;

    while (index < array.length) {
        blocks.push(array.slice(index, index + step));
        index += step;
    }
    return blocks;
}