import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Child, Person } from '~/types/types';

export const personInfoStore = defineStore('myStore', () => {
    const personStorage = ref<Person>({ name: null, age: null });
    const personChildrenStorage = ref<Child[]>([]);
    const messageRef = ref<string | null>(null);

    const setMessage = (message: string | null): void => {
        messageRef.value = message;
    };

    const getMessage = (): string | null => {
        return messageRef.value;
    };

    const getPersonStorage = (): Person => {
        return personStorage.value;
    };

    const getPersonChildrenStorage = (): Child[] => {
        return personChildrenStorage.value;
    };

    const setPersonStorage = (person: Person): void => {
        personStorage.value = person;
    };

    const setPersonChildrenStorage = (children: Child[]): void => {
        personChildrenStorage.value = children;
    };

    return {
        setPersonStorage,
        setPersonChildrenStorage,
        getPersonStorage,
        getPersonChildrenStorage,
        setMessage,
        getMessage
    };
});
