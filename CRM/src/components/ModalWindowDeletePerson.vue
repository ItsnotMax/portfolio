<template>
    <div id="modalBackground" @click="closeModalWindow" class="modal-wrapper" :class="{ 'reset-btn': cursorPosition }">
        <div class="modalBackground modalBackground-delete">
            <div class="white-block">
                <div id="modalClose" @click="closeModalWindow" class="reset-btn"></div>
                <h3 class="form-title not-selectable delete-title">Удалить клиента</h3>
                <div class="flex not-selectable center">
                    <div class="confirm-delete">
                        Вы действительно хотите удалить данного клиента?
                    </div>
                </div>
                <div class="grid form-buttons-block">
                    <button @click="deletePerson" class="block reset-btn save-contact">Удалить</button>
                    <button @click="closeModalWindow" class="block reset-btn cancel">Отмена</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { cursorPosition, handleMouseMove } from '@/ts_modules/handlerMouseMove'
import { GetPerson, Person } from '@/types/classes/Person';
import { isEvent } from '@/types/typeguard';
import { defineEmits, defineProps } from 'vue';

onMounted(() => {
    const id = document.querySelector('#modalBackground')
    if (id) {
        id.addEventListener('mousemove', handleMouseMove);
    }
});

onBeforeUnmount(() => {
    const id = document.querySelector('#modalBackground')
    if (id) {
        id.removeEventListener('mousemove', handleMouseMove);
    }
});

const emits = defineEmits(['closeModalWindow'])
const props = defineProps({
    person: Object as () => GetPerson | null,
})

const closeModalWindow = (event: Event) => {
    if (isEvent(event) && event.target == event.currentTarget) {
        emits('closeModalWindow')
    }
}

const deletePerson = () => {
    if (props.person) { Person.toDelete(props.person.id); emits('closeModalWindow') }
}
</script>