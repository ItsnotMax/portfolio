<template lang="html">
    <form class="flex flex-col main__container horizon__center" @submit.prevent="onSubmit">
        <p class="input--error" v-if="message">{{ message }}</p>
        <div class="person__info">
            <PersonInfo @person="handlePersonCompleteness" :isPersonErrors="isPersonErrorsRef" />
        </div>
        <div class="children__info">
            <ChildrenNumber @children="handleChildrenCompleteness" :isChildrenErrors="isChildrenErrorsRef"
                :isChildOlder="isChildOlderRef" />
        </div>
        <button :disabled="!isSubmitEnabled" class="reset-btn form--save" type="submit">Сохранить</button>
    </form>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['redirect'],
});

useHead({
    title: 'Персональные данные',
    meta: [
        { name: 'description', content: 'Some description' },
        { name: 'keywords', content: 'some, description' },
    ]
});

import { reactive, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import PersonInfo from '~/components/PersonInfo.vue';
import ChildrenNumber from '~/components/ChildrenNumber.vue';
import { isEmpty, isNull } from '~/types/typeguards';
import { personInfoStore } from '~/stores/personInfoStore';
import type { Child, Person, FormData } from '~/types/types';

const router = useRouter();
const isSubmitEnabled = ref(false);
const isPersonErrorsRef = ref<string[]>([]);
const isChildrenErrorsRef = ref<number[]>([]);
const isChildOlderRef = ref<number[]>([]);
const store = personInfoStore();
const formData = reactive<FormData>({
    personInfo: { name: null, age: null },
    children: [] as Child[]
});

const { data: message, refresh } = useAsyncData('message', async () => {
    return store.getMessage();
});

const handlePersonCompleteness = (person: Person): void => {
    formData.personInfo.name = person.name;
    formData.personInfo.age = person.age;
};

const handleChildrenCompleteness = (children: Child[]): void => {
    formData.children = children;
};

const validateForm = computed(() => {
    const isPersonErrors = new Set<string>();
    const isChildrenErrors = new Set<number>();
    const isChildOlder = new Set<number>();

    for (const key in formData.personInfo) {
        if (isNull(formData.personInfo[key as keyof Person])) {
            isPersonErrors.add(key);
        }
    }

    formData.children.forEach((child, index) => {
        if (isNull(child.name) || isNull(child.age)) {
            isChildrenErrors.add(index);
        }

        if (!isNull(formData.personInfo.age) && child.age !== null && Number(child.age) >= Number(formData.personInfo.age)) {
            isChildOlder.add(index);
        }
    });

    isPersonErrorsRef.value = Array.from(isPersonErrors);
    isChildrenErrorsRef.value = Array.from(isChildrenErrors);
    isChildOlderRef.value = Array.from(isChildOlder);

    isSubmitEnabled.value = isEmpty(isPersonErrorsRef.value) &&
        isEmpty(isChildrenErrorsRef.value) &&
        isEmpty(isChildOlderRef.value);
});

watch(() => formData, () => {
    validateForm.value;
}, { deep: true });

const onSubmit = (): void => {
    store.setPersonStorage(formData.personInfo);
    store.setPersonChildrenStorage(formData.children);

    router.push('/preview');
};
</script>
