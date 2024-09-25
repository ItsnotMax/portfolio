import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import type { RouteLocationNormalized } from 'vue-router';
import type { User } from '~/types/types';

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const { $auth } = useNuxtApp();
    const userName: User | null = await $auth.checkAuth();

    if (!userName) {
        return navigateTo('/');
    }
    useNuxtApp().$userName = userName.user;
});
