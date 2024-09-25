import { defineNuxtPlugin } from 'nuxt/app';
import { userAuth } from '~/composables/modules';

export default defineNuxtPlugin(async (nuxtApp) => {
    const auth = userAuth();
    nuxtApp.provide('auth', auth);
});
