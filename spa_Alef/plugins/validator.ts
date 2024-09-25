import { defineNuxtPlugin } from 'nuxt/app'
import { validator } from '~/composables/modules'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('validator', validator())
});
