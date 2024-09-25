import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to.path === '/' || !/\d/.test(to.path.slice(1))) {
        return navigateTo('/1')
    }
})
