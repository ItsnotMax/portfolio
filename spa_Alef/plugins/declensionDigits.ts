import { defineNuxtPlugin } from 'nuxt/app'
import { declension } from '~/composables/modules'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('declension', declension())
});
