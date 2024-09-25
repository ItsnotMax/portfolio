<template lang="html">
    <div ref="modalWindow" class="modal" @click="closeModalWindow">
        <div class="modal__content">
            <h2>Modal Header</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sequi aperiam placeat accusantium. Iure,
                totam deleniti! A, facilis officia possimus, earum deleniti nesciunt aperiam animi, id reiciendis
                deserunt repudiandae assumenda.</p>
            <p>Your form could be here</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CloseModalWindowEvent } from '~/types/types';


const modalWindow = ref < HTMLElement | null > (null);
const emit = defineEmits < (event: 'isModalWindow', value: boolean) => void> ();

function closeModalWindow(event: CloseModalWindowEvent): void {
    if (event.target === modalWindow.value) {
        emit('isModalWindow', false)
    }
}
</script>
