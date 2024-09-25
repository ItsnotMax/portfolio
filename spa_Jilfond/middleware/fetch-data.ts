import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { employeesStore } from '~/stores/employeesStore';
import type { RouteLocationNormalized } from 'vue-router';

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const store = employeesStore();
    await store.fetchEmployeesList();
    console.log(await store.getEmployeesStorage());
});
