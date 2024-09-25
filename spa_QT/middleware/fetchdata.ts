import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import type { RouteLocationNormalized } from 'vue-router';
import { articlesStore } from '@/stores/articlesStore';
import { sendRequest } from '../server/api';
import { ARTICLES_PER_PAGE } from '../config';
import { isString } from '@/types/typeguards';

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const store = articlesStore();

    if (store.checkStoreIsEmpty()) {
        const response = await sendRequest();
        store.setData(response)
    }

    const pageId = isString(to.params.id) ? parseInt(to.params.id, 10) : 1
    const totalPages = Math.ceil(store.getArticlesLength() / ARTICLES_PER_PAGE)

    if (pageId < 1 || pageId > totalPages) {
        return navigateTo('/1')
    }
});
