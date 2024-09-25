<template lang="html">
    <section class="profile__section">
        <Spinner v-show="isLoading" />
        <div v-if="!isEmpty && !isLoading" class="grid profile">
            <div class="profile__img"><img src="~/public/slug.jpg" alt="error"></div>
            <div class="profile__info">
                <div class="profile__name">{{ (props.employee as EmployeeProfile).name }}</div>
                <div class="sidebar__slug"><span class="profile__email">email:</span>{{ (props.employee as
                    EmployeeProfile).email }}</div>
                <div class="sidebar__slug"><span class="profile__phone">phone:</span>{{ (props.employee as
                    EmployeeProfile).phone }}</div>
                <div class="profile__about">О себе</div>
                <div class="sidebar__slug">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
        </div>
        <div v-else class="flex flex__centring sidebar__slug employee__slug">Выберите сотрудника, чтобы посмотреть его
            профиль</div>
    </section>
</template>

<script setup lang="ts">
import Spinner from '~/components/Spinner.vue'
import { ref, computed, watch } from 'vue'
import type { EmployeeProfile } from '~/types/types';

const props = defineProps<{
    employee: EmployeeProfile | {};
}>()

const isLoading = ref(false);
const isEmpty = computed(() => !props.employee || Object.keys(props.employee).length === 0);

const timeout = ref<NodeJS.Timeout | null>(null);

watch(() => props.employee, (newEmployee) => {
    if (newEmployee && !isEmpty.value) {
        isLoading.value = true;
        timeout.value = setTimeout(() => {
            isLoading.value = false;
        }, 500);
    } else {
        isLoading.value = false;
    }
}, { immediate: true });

onBeforeUnmount(() => {
    if (timeout.value) {
        clearTimeout(timeout.value);
    }
});
</script>

<style scoped lang="scss">
@import '~/assets/styles/_mixins.scss';

@media (min-width: 1366px) {
    .profile {
        width: inherit;
        height: inherit;
        grid-template-columns: 424px 439px;
        height: 286px;
        column-gap: 61px;
        position: relative;
    }

    .profile__section {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .profile__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 1px solid #E0E0E0;
    }

    .profile__info {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .profile__name {
        margin-bottom: 10px;
        @include font-mixin(normal, 600, 16px);
        line-height: 140%;
        color: #000000;
    }

    .profile__email,
    .profile__phone {
        @include font-mixin(normal, 600, 14px);
        line-height: 140%;
        color: #333333;
        margin-right: 11px;
    }

    .profile__about {
        padding-top: 20px;
        padding-bottom: 25px;
        @include font-mixin(normal, 600, 16px);
        line-height: 140%;
        color: #333333;
    }

    .sidebar__slug {
        @include font-mixin(normal, 400, 14px);
        line-height: 17px;
        color: #76787D;
    }

    .employee__slug {
        width: inherit;
        height: inherit;
    }
}
</style>
