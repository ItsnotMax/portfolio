<template>
    <button @click="openModal" type="button" id="newclient" class="block reset-btn newclient-btn">
        <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z" />
        </svg>
        Добавить клиента
    </button>
    <ModalWindow v-if="showModal" @closeModalWindow="closeModalWindow" :title="'Новый клиент'" :cancel="'Отмена'" />
</template>

<script setup lang="ts">
import ModalWindow from './ModalWindow.vue';
import { ref } from 'vue';

const showModal = ref<boolean>(false);
const emits = defineEmits(['updateTable'])
const openModal = (): void => {
    showModal.value = true;
};

const closeModalWindow = () => {
    showModal.value = false;
    emits('updateTable');
}

</script>