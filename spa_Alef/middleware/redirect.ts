import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import type { RouteLocationNormalized } from 'vue-router';
import { personInfoStore } from '~/stores/personInfoStore';
import { isEmpty, isNull } from '~/types/typeguards';
import { useRuntimeConfig } from '#app';

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const config = useRuntimeConfig();
    const store = personInfoStore();

    if (to.path == '/preview' && (isNull(store.getPersonStorage().name) || isNull(store.getPersonStorage().age))) {
        store.setMessage(config.public.message);
        return navigateTo({
            path: '/',
            query: { preview: 'err' }
        });
    }

    if (to.path == '/' && !isEmpty(to.query) && isNull(store.getMessage())) {
        return navigateTo({
            path: '/'
        });
    }

    if (from.path == '/preview' && to.path == '/' && !isEmpty(store.getPersonStorage())) {
        store.setMessage(null);
    }
});
