<template lang="html">
    <section class="articles">
        <h1>Articles</h1>
        <div class="grid grid__articles container--centering">
            <nuxt-link :to="{ path: `/article/${toKebabCase(article.title)}`, query: { id: article.id } }"
                v-for="(article, index) in articles" :key="index" class="grid-item" @mouseover="itemUp"
                @mouseleave="itemDown">
                <img :src="article.image" :alt="'site unavailable'"
                    :class="(index + 1) % 2 === 0 ? 'grid__articles--even' : 'grid__articles--odd'" />
                <h3 class="articles__preview">{{ article.preview }}</h3>
                <div class="button__read-more invisible">Read more</div>
            </nuxt-link>
        </div>
        <Pagination :totalArticles="articlesCount" :currentPage="currentPage" />
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { articlesStore } from '~/stores/articlesStore'
import Pagination from '../components/Pagination.vue'
import type { ArticleStore } from '../types/types';
import { isString } from '../types/typeguards';
import { toKebabCase, itemUp, itemDown } from '~/composables/modules'

const route = useRoute()
const store: ArticleStore = articlesStore()
const currentPage = ref < number > (isString(route.params.id) ? parseInt(route.params.id, 10) : 1);
const articles = store.getArticlesArrayPerPage(currentPage.value)
const articlesCount = store.getArticlesLength()

useHead({
    title: 'Articles list',
    meta: [
        { name: 'description', content: 'All QTIM articles' },
        { name: 'keywords', content: 'keywords, for, page' },
    ]
})

definePageMeta({
    middleware: ['fetchdata', 'redirect'],
})
</script>
