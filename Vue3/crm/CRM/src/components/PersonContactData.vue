<template lang="html">
    <div class="form-name-block form-select-block" data-parent="parent">
        <div class="flex border-wrapper">
            <button @click="toggleSelect" type="button" :data-index="props.index"
                class="reset-btn flex select-btn unvisible">
                <ul class="flex flex-col select" :data-index="props.index">
                    <li class="select-item" @click="selectItem" data-contact="tel">Телефон</li>
                    <li class="select-item" @click="selectItem" data-contact="adttel">ДопТелефон</li>
                    <li class="select-item" @click="selectItem" data-contact="email">Email</li>
                    <li class="select-item" @click="selectItem" data-contact="vk">Vk</li>
                    <li class="select-item" @click="selectItem" data-contact="facebook">Facebook</li>
                </ul>
            </button>
            <div class="flex contact-input-block">
                <label class="label" @focusin="focusIn" @focusout="focusOut">
                    <input type="text" @input="checkingValue" class="person-contact-data pl-15"
                        :data-index="props.index" :data-contact="selectedContactType"
                        :value="props.contact == null ? inputMock : inputed">
                    <span class="placeholder pl-15" :data-index="props.index" v-text="placeholder"></span>
                </label>
                <button @click="deleteContact" type="button" class="reset-btn delete-contact-data"></button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import { isEvent, isHtmlElement, isButtonElement, isInputEvent } from '@/types/typeguard';
import { switchPlaceholder } from '@/ts_modules/switchPlaceholder';
import { findParentByDataAttribute } from '@/ts_modules/findParentByDataAttribute';
import { streamCheck } from '@/ts_modules/check_txt';
import type { Contact } from '@/types/types';

const selectedContactType = ref<string>('tel');
const placeholder = ref<string>('tel');
const inputMock = ref<string>('');
const inputed = ref<string>('');

const props = defineProps({ index: Number, contact: { type: Object as () => (Contact | null), required: false } });
const emits = defineEmits(['toggleSelect', 'deleteContact']);

onMounted(() => {
    if (props.contact == null) {
        placeholder.value = switchPlaceholder(selectedContactType.value, 1)

    } else if (props.contact != null) {

        placeholder.value = '';
        selectedContactType.value = props.contact.type;
        inputed.value = props.contact.value;
        const ul = document.querySelector(`ul[data-index="${props.index}"].select`);
        if (ul) {
            const li = ul.querySelector(`li[data-contact="${selectedContactType.value}"]`);
            if (ul && li) { ul.insertBefore(li, ul.firstChild); }
        }

    }
});
const focusIn = (event: Event): void => {
    if (isInputEvent(event.target) && event.target && event.target.dataset.contact && inputed.value.length <= inputMock.value.length) {
        placeholder.value = ''
        inputMock.value = switchPlaceholder(event.target.dataset.contact, 2)
    }
}
const focusOut = (event: Event): void => {
    if (isInputEvent(event.target) && event.target && event.target.dataset.contact && inputed.value.length <= inputMock.value.length) {
        inputMock.value = ''
        placeholder.value = switchPlaceholder(selectedContactType.value, 1)
    }
}
const selectItem = (event: Event): void => {
    const selectedItem = event.target;
    if (isEvent(event) && isHtmlElement(selectedItem)) {
        const contactType = selectedItem.dataset.contact;

        if (typeof contactType === 'string') {
            const ulElement = selectedItem.parentElement;

            if (ulElement) {
                ulElement.classList.add('above');
                ulElement.insertBefore(selectedItem, ulElement.firstChild);
                if (selectedContactType.value != contactType) {
                    if (props.contact != null && selectedContactType.value != contactType) {
                        inputed.value = '';
                    }
                    selectedContactType.value = contactType;
                    inputMock.value = '';
                    placeholder.value = switchPlaceholder(contactType, 1);
                }
            }
        }
    }
}
const deleteContact = (event: Event): void => {
    if (isEvent(event) && isButtonElement(event.target)) {
        const selectedItem = event.target;

        const parentElement = findParentByDataAttribute(selectedItem, 'parent');
        if (parentElement != null) {
            parentElement.remove();
            emits('deleteContact')
        }
    }
}
const toggleSelect = () => {
    emits('toggleSelect', props.index)
}
const checkingValue = (event: Event) => {
    if (isInputEvent(event.target) && event.target.dataset.contact) {
        const string = event.target.value;
        const type = event.target.dataset.contact;
        event.target.value = streamCheck(string, type);
        inputed.value = event.target.value;
    }
}
</script>