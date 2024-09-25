<template lang="html">
    <h2 class="title not-allocated">Персональные данные</h2>
    <div class="flex flex-col person__input-group">
        <div class="group">
            <div class="input__placeholder" :class="{ 'input--error': errorClass.name }">{{ placeholder.name }}</div>
            <input class="block group--input" type="text" v-model="person.name" @input="validateNameInput">
        </div>
        <div class="group">
            <div class="input__placeholder" :class="{ 'input--error': errorClass.age }">{{ placeholder.age }}</div>
            <input class="block group--input" type="text" v-model="person.age" @input="validateAgeInput" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { isNull, isPlaceholderKey } from '~/types/typeguards';
import type { Person, Placeholder, PlaceholderKeys } from '~/types/types';

const { $validator } = useNuxtApp();
const emit = defineEmits<{
    (event: 'person', person: Person): void;
}>();
const props = defineProps<{
    isPersonErrors: string[];
}>();

const placeholder = reactive<Placeholder>({
    name: 'Имя',
    age: 'Возраст',
    required: ': должно быть заполнено'
});

const errorClass = reactive<{ name: Boolean, age: boolean }>({
    name: false,
    age: false
});

const person = reactive<Person>({
    name: null,
    age: null
});

const updatePlaceholderAndClass = (field: PlaceholderKeys, value: string | null): void => {
    const isEmptyValue = isNull(value);
    const hasRequiredPlaceholder = placeholder[field].includes(placeholder.required);

    if (isEmptyValue && !hasRequiredPlaceholder) {
        placeholder[field] += placeholder.required;
        errorClass[field] = true;
    } else if (!isEmptyValue && hasRequiredPlaceholder) {
        placeholder[field] = placeholder[field].replace(placeholder.required, "");
        errorClass[field] = false;
    }
};

watch(() => person.name, (newVal) => {
    updatePlaceholderAndClass('name', newVal);
}, { deep: true });

watch(() => person.age, (newVal) => {
    updatePlaceholderAndClass('age', newVal);
}, { deep: true });

watch(() => props.isPersonErrors, (newVal) => {
    if (Array.isArray(newVal)) {
        newVal.forEach(error => {
            if (isPlaceholderKey(error)) {
                if (!placeholder[error].includes(placeholder.required)) {
                    placeholder[error] += placeholder.required;
                    errorClass[error] = true;
                }
            }
        });
    }
}, { deep: true });

const validateNameInput = () => {
    person.name = $validator.name(person.name);
    emit('person', person);
};

const validateAgeInput = () => {
    person.age = $validator.age(person.age);
    emit('person', person);
};
</script>
