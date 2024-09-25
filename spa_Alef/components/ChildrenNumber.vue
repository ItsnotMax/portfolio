<template lang="html">
    <h2 class="title not-allocated">Дети (макс. {{ maxChild }})</h2>
    <ul class="flex flex-col children__list">
        <li class="grid children__input-group" v-for="(child, index) in children" :key="index">
            <div class="group">
                <div class="input__placeholder" :class="{ 'input--error': child.errorName }">{{ child.placeholderName
                    }}
                </div>
                <input class="group--input" type="text" v-model="child.name" @input="() => validatorNameInput(index)">
            </div>
            <div class="group">
                <div class="input__placeholder" :class="{ 'input--error': child.errorAge }">{{ child.placeholderAge }}
                </div>
                <input class="block group--input" type="text" v-model="child.age"
                    @input="() => validatorAgeInput(index)" />
            </div>
            <button type="button" class="reset-btn children--remove" @click="() => removeChild(index)">Удалить</button>
        </li>
    </ul>
    <button v-show="!isMaxChildrenReached" class="reset-btn children--add" type="button" @click="addChild">Добавить
        ребенка</button>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { reactive, ref, computed, watch } from 'vue';
import { isEmpty, isUndefined } from '~/types/typeguards';
import { updateField } from '~/composables/modules';
import type { Child, Placeholder, Props } from '~/types/types';

const config = useRuntimeConfig();
const { $validator } = useNuxtApp();
const emit = defineEmits<{
    (event: 'children', children: Child[]): void;
}>();
const maxChild = ref<number>(Number(config.public.maxChild));
const children = reactive<Child[]>([]);
const placeholder = reactive<Placeholder>({
    name: 'Имя',
    age: 'Возраст',
    required: ': должно быть заполнено',
    error: 'Ребенок старше родителя'
});

const props = defineProps<{
    isChildrenErrors: number[];
    isChildOlder: number[];
}>();

watch(children, () => {
    emit('children', children);
}, { deep: true });

watch(() => props.isChildrenErrors, (newVal) => {
    for (const errorIndex of props.isChildrenErrors.slice(0, -1)) {
        updateField(children, errorIndex, 'name', 'errorName', 'placeholderName', placeholder.name, placeholder.required);
        updateField(children, errorIndex, 'age', 'errorAge', 'placeholderAge', placeholder.age, placeholder.required);
    }
}, { deep: true });

watch(() => props.isChildOlder, (newVal, oldVal) => {
    if (!isEmpty(props.isChildOlder)) {
        for (const errorIndex of props.isChildOlder) {
            const isIncludePlaceholderAge = !isUndefined(placeholder.error) && children[errorIndex].placeholderAge.includes(placeholder.error);
            if (!isIncludePlaceholderAge) {
                children[errorIndex].errorAge = true;
                children[errorIndex].placeholderAge = `${placeholder.error}`;
            }
        }
    }

    const filter = oldVal?.filter(el => !newVal.includes(el)) ?? [];
    if (!isEmpty(filter)) {
        for (const errorIndex of filter) {
            const currentPlaceholder = !isUndefined(placeholder.error) && children[errorIndex].placeholderAge.includes(placeholder.error);
            if (currentPlaceholder) {
                children[errorIndex].errorAge = false;
                children[errorIndex].placeholderAge = `${placeholder.age}`;
            }
        }
    }
}, { deep: true });

const validatorNameInput = (index: number) => {
    children[index].name = $validator.name(children[index].name);
    updateField(children, index, 'name', 'errorName', 'placeholderName', placeholder.name, placeholder.required);
};

const validatorAgeInput = (index: number) => {
    children[index].age = $validator.age(children[index].age);
    updateField(children, index, 'age', 'errorAge', 'placeholderAge', placeholder.age, placeholder.required);
};

const isMaxChildrenReached = computed(() => children.length >= maxChild.value);

const addChild = () => {
    if (!isMaxChildrenReached.value) {
        children.push({
            name: null,
            age: null,
            errorName: false,
            errorAge: false,
            placeholderName: placeholder.name,
            placeholderAge: placeholder.age
        });
    }
};

const removeChild = (index: number) => {
    if (index >= 0 && index < children.length) {
        children.splice(index, 1);
    }
};
</script>
