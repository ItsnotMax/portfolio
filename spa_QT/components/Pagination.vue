<template>
    <ul class="flex container__pagination">
        <li v-for="(pageNumber, index) in filteredpaginationArray " :key="index"
            :class="pageNumber == config.currentPage ? ['pagination__item', 'pagination--marked'] : 'pagination__item'">
            <nuxt-link v-if="config.currentPage > 1 && index == 0" :to="`/${config.currentPage - 1}`"
                class="pagination__item pagination--action"><img src="/assets/img/arrow_back.svg" alt="Back">
            </nuxt-link>
            <nuxt-link v-else :to="`/${pageNumber}`">
                {{ pageNumber }}
            </nuxt-link>
        </li>
        <li v-if="config.currentPage < config.totalPages" class="pagination__item pagination--action">
            <nuxt-link :to="`/${config.currentPage + 1}`"><img src="/assets/img/arrow_next.svg" alt="Next">
            </nuxt-link>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ARTICLES_PER_PAGE, PAGES_PER_PAGINATION } from '../config'
import { computed } from 'vue'
import type { Config } from '~/types/types';

interface Props {
    totalArticles: number;
    currentPage: number;
}

const props = defineProps<Props>();

const config: Config = {
    totalArticles: props.totalArticles,
    pagesPerPagination: PAGES_PER_PAGINATION,
    articlesPerPage: ARTICLES_PER_PAGE,
    get totalPages() { return Math.ceil(this.totalArticles / this.articlesPerPage) },
    get paginationArray() {
        return [...Array(this.totalPages)].map((_, i) => i + 1);
    },
    get currentPage() {
        return props.currentPage
    }
}

const filteredpaginationArray = computed<number[]>(() => {
    const pagesPerPagination = config.pagesPerPagination;
    const currentPage = config.currentPage;
    const currentPageIndex = currentPage + 1;

    if (currentPage >= pagesPerPagination) {
        return config.paginationArray.slice(currentPageIndex - pagesPerPagination, currentPageIndex);
    } else {
        return config.paginationArray.slice(0, pagesPerPagination);
    }
});
</script>
