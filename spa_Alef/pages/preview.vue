<template lang="html">
    <div class="flex flex-col main__container horizon__center">
        <div class="person__info">
            <h2 class="title not-allocated">Персональные данные</h2>
            <div class="preview__person preview__child__container not-scrollbar">{{ personInfo.name }}, {{
                $declension.age(personInfo.age) }}</div>
        </div>
        <div class="children__info">
            <h2 class="title not-allocated">Дети</h2>
            <ul class="flex flex-col  preview__child__container">
                <li v-if="!isEmpty(childrenInfo)" class="preview__child not-scrollbar"
                    v-for="(child, index) in childrenInfo" :key="index">
                    {{ child.name }}, {{ child.age }}
                </li>
                <li v-else class="preview__child not-scrollbar">Детей нет</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { personInfoStore } from '~/stores/personInfoStore';
import { isEmpty } from '~/types/typeguards';
import type { Child, Person } from '~/types/types';

const store = personInfoStore();
const personInfo = ref<Person>(store.getPersonStorage());
const childrenInfo = ref<Child[]>(store.getPersonChildrenStorage());
const { $declension } = useNuxtApp();

definePageMeta({
    middleware: ['redirect'],
});

useHead({
    title: personInfo.value ? `${personInfo.value.name}, ${$declension.age(personInfo.value.age)}` : 'Default Title',
    meta: [
        { name: 'description', content: 'Some description' },
        { name: 'keywords', content: 'some, description' },
    ]
});
</script>

<style scoped lang="scss">
@import '../assets/styles/mixins';

.preview__person {
    @include font-mixin(normal, 700, 16px);
    line-height: 24px;
    color: #111111;
}

.preview__child__container {
    width: 100%;
    max-width: 616px;
    row-gap: 20px;
}

.preview__child {
    padding: 10px 20px;
    width: fit-content;
    gap: 10px;
    background: #F1F1F1;
    @include font-mixin(normal, 700, 16px);
    line-height: 24px;
    color: #000000;
    white-space: nowrap;
    overflow: scroll;
}
</style>
