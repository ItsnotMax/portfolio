<template lang="html">
    <aside class="sidebar">
        <div class="sidebar__title">Поиск сотрудников</div>
        <input class="block sidebar__query" type="text" @input="onSearch" placeholder="Введите Id или имя" />
        <div class="sidebar__title">Результаты</div>
        <div v-if="queryValue.length === 0 && searchQuery === null" class="sidebar__slug">начните поиск</div>
        <div v-else-if="queryValue.length > 0 && searchQuery === null" class="sidebar__slug">ничего не найдено</div>
        <ul v-else class="grid button-group">
            <Spinner v-show="isLoading" />
            <li class="reset-btn grid employee__button-group horizon__center" v-for="employee in searchQuery"
                v-show="!isLoading" :key="employee.id" @click="onClick(employee)">
                <div class="flex flex__centring button-group__img"><img src="~/public/slug.jpg" alt="error">
                </div>
                <div class="button-group__profile">
                    <h2 class="group-profile__name">{{ employee.name }}</h2>
                    <div class="group-profile__email">{{ employee.email }}</div>
                </div>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import Spinner from '~/components/Spinner.vue';
import { employeesStore } from '~/stores/employeesStore';
import type { EmployeeProfile } from '~/types/types';

const store = employeesStore();
const timeout = ref<NodeJS.Timeout | null>(null);
const searchQuery = ref<EmployeeProfile[] | null>(null);
const queryValue = ref<string>('');
const isLoading = ref(false);

const emit = defineEmits<{
    (event: 'employee', payload: EmployeeProfile | {}): void;
}>();

const onClick = (employee: EmployeeProfile | {}) => {
    emit('employee', employee);
}

const onSearch = (event: Event) => {
    clearTimeout(timeout.value as NodeJS.Timeout);

    const target = event.target as HTMLInputElement;
    const query = target.value;

    if (query.length === 0) {
        searchQuery.value = null;
        isLoading.value = false;
        queryValue.value = '';
        onClick({});
        return;
    }

    queryValue.value = query;
    searchQuery.value = store.searchEmployee(query);
    isLoading.value = true;

    timeout.value = setTimeout(() => {
        isLoading.value = false;
    }, 500);
};

onBeforeUnmount(() => {
    if (timeout.value) {
        clearTimeout(timeout.value);
    }
});
</script>

<style scoped lang="scss">
@import '~/assets/styles/_mixins.scss';

.sidebar__query {
    padding: 16px 24px;
    gap: 16px;
    background: #FFFFFF;
    border: 1.5px solid #E9ECEF;
    border-radius: 8px;
    margin-bottom: 22px;
    transition: all 0.3s ease;
}

.sidebar__query:hover {
    border-color: #007BFF;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sidebar__query:focus {
    border-color: #007BFF;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25);
}

.sidebar__query:active {
    background: #F8F9FA;
    border-color: #0056b3;
}

.group-profile__name {
    @include font-mixin(normal, 600, 14px);
    line-height: 17px;
    margin-bottom: 5px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
}

.group-profile__email {
    @include font-mixin(normal, 400, 14px);
    line-height: 17px;
    color: #76787D;
    overflow: hidden;
    text-overflow: ellipsis;
}

.button-group {
    position: relative;
    width: inherit;
    height: 380px;
    align-content: baseline;
    overflow: auto;
    grid-template-rows: 70px;
    row-gap: 18px;
    scrollbar-width: none;
    padding-top: 4px;
    padding-bottom: 15px;
}

.employee__button-group {
    position: relative;
    width: 240px;
    height: 70px;
    background: #FFFFFF;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    grid-template-columns: 70px 170px;
    row-gap: 18px;
    transition: all 0.3s ease;
}

.employee__button-group:hover {
    background: #E0E0E0;
    border-color: #007BFF;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.employee__button-group:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25);
}

.employee__button-group:active {
    background: #E2E6EA;
    border-color: #0056b3;
}

.button-group__profile {
    transition: all 0.3s ease;
}

.employee__button-group:hover .button-group__profile {
    color: #007BFF;
}

.employee__button-group:active .button-group__profile {
    color: #0056b3;
}

.button-group__img {
    grid-column: 1/2;

    >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.button-group__profile {
    grid-column: 2/3;
    padding: 15px;
    border-left: 1px solid #DEDEDD;
    border-radius: 0px 10px 10px 0px;
}

.group-profile__name {
    @include font-mixin(normal, 600, 14px);
    line-height: 17px;
    margin-bottom: 5px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sidebar__title {
    @include font-mixin(normal, 600, 16px);
    line-height: 140%;
    color: #333333;
}

.group-profile__email {
    @include font-mixin(normal, 400, 14px);
    line-height: 17px;
    color: #76787D;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sidebar {
    height: inherit;

    >.sidebar__title:nth-of-type(1) {
        margin-bottom: 22px;
    }

    >.sidebar__title:nth-of-type(2) {
        margin-bottom: 10px;
    }
}


.profile__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid #E0E0E0;

    >img {
        object-fit: none;
    }
}
</style>
