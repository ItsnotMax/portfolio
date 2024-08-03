<template>
    <div id="modalBackground" class="modal-wrapper" @click="closeModalWindow"
        :class="cursorPosition ? 'reset-btn' : null">
        <div class="modalBackground">
            <div class="white-block">
                <form>
                    <div class="form-name-block">
                        <div id="modalClose" @click="closeModalWindow" class="reset-btn"></div>
                        <h3 class="form-title not-selectable">{{ props.title }} <span v-if="props.id"
                                class="props-id">ID: {{ props.id.substring(props.id.length - 6) }}</span></h3>
                        <label class="label" @focusin="(event) => animationStart(event)"
                            @focusout="(event) => animationFinish(event, inputLastname)">
                            <input @input="checkingValue" type="text" data-name="name" class="form-name pl-15"
                                ref="inputLastname"
                                :value="props.person ? props.person.surname : (inputLastname != null && inputLastname.value != null ? inputLastname.value : '')">
                            <span class="template">Фамилия*</span>
                        </label>
                        <label class="label" @focusin="(event) => animationStart(event)"
                            @focusout="(event) => animationFinish(event, inputName)">
                            <input @input="checkingValue" type="text" data-name="name" class="form-name pl-15"
                                ref="inputName"
                                :value="props.person ? props.person.name : (inputName != null && inputName.value != null ? inputName.value : '')">
                            <span class="template">Имя*</span>
                        </label>
                        <label class="label" @focusin="(event) => animationStart(event)"
                            @focusout="(event) => animationFinish(event, inputSecondname)">
                            <input @input="checkingValue" type="text" data-name="name" data-empty="empty"
                                class="form-name pl-15" ref="inputSecondname"
                                :value="props.person ? props.person.lastName : (inputSecondname != null && inputSecondname.value != null ? inputSecondname.value : '')">
                            <span class="template">Отчество*</span>
                        </label>
                    </div>
                    <PersonContactData v-for="(item, index) in countPersonContactData" :key="index" :index="index"
                        @toggleSelect="toggleSelect" @deleteContact="deleteContact"
                        :contact="props.person && props.person.contacts ? props.person.contacts[index] : null" />
                    <div class="form-add-contact-block">
                        <button @click="addContactOfPerson" type="button" data-newContact="new-contact"
                            class="block reset-btn block-add-contact">
                            Добавить контакт
                        </button>
                    </div>
                    <div class="grid form-buttons-block">
                        <button @click.prevent="sendForm" class="block reset-btn save-contact">Сохранить</button>
                        <button @click="closeModalWindow" type="button" class="block reset-btn cancel">
                            {{ props.cancel }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import PersonContactData from '@/components/PersonContactData.vue'
import { isEvent, isNumber, isButtonElement, isInputEvent, isHtmlElement } from '@/types/typeguard'
import { ref, defineEmits, defineProps, onMounted, onBeforeUnmount } from 'vue';
import { cursorPosition, handleMouseMove } from '@/ts_modules/handlerMouseMove'
import { GetPerson, Person } from '@/types/classes/Person';
import type { Contacts, Contact } from '@/types/types';
import { validEmail } from '@/ts_modules/emailValidator';
import { streamCheck, formattedPhoneNumber, validatePhoneNumber, validateSocialWeb } from '@/ts_modules/check_txt';
import { animationSpanStart, animationSpanFinish, animateModalIn, sentForm } from '@/ts_modules/animationGSAP';

const emits = defineEmits(['closeModalWindow']);
const props = defineProps({
    title: String,
    cancel: String,
    id: { type: String as () => string | null, required: false },
    person: { type: Object as () => GetPerson | null, required: false }
});
const isOpenSelect = ref<number | null>(null);
const countContacts = ref<number>(0);
const inputLastname = ref<HTMLInputElement | null>(null);
const inputName = ref<HTMLInputElement | null>(null);
const inputSecondname = ref<HTMLInputElement | null>(null);
const countPersonContactData = ref<number>(0);

onMounted(() => {
    const id = document.querySelector('#modalBackground')
    if (id) {
        id.addEventListener('mousemove', handleMouseMove);
        animateModalIn();
    }
    if (props.person && props.person.contacts && props.person.contacts?.length > 0) {
        const btn = document.querySelector('button[data-newContact="new-contact"]')
        countContacts.value = props.person.contacts?.length;
        countPersonContactData.value = props.person.contacts?.length;
        if (isButtonElement(btn) && countContacts.value >= 10) {
            btn.disabled = true
        }
    }
    const labels = document.querySelectorAll('label.label')
    if (labels) {
        [...labels].map((label) => {
            isHtmlElement(label.firstChild) && animationStart(label.firstChild, true)
        })
    }
});

onBeforeUnmount(() => {
    const id = document.querySelector('#modalBackground')
    if (id) {
        id.removeEventListener('mousemove', handleMouseMove);
    }
});

const updateElementClass = (element: HTMLInputElement, isValid: boolean) => {
    if (isValid) {
        element.classList.remove('input-invalid');
        element.classList.add('input-correct');
    } else {
        element.classList.remove('input-correct');
        element.classList.add('input-invalid');
    }
};
const checkInputAndSetClass = (element: HTMLInputElement, isValid: boolean) => {
    if (element.value.length === 0) {
        updateElementClass(element, false);
    } else {
        updateElementClass(element, isValid);
    }
};
const closeModalWindow = (event: Event) => {
    if (isEvent(event) && event.target == event.currentTarget) {
        if (isButtonElement(event.target) && event.target.textContent?.toLowerCase() === 'удалить клиента' && props.id) {
            Person.toDelete(props.id)
        }
        emits('closeModalWindow', false)
    }
}
const toggleSelect = (index: number): void => {
    if (!isNumber(index)) return;

    const button = document.querySelector(`button[data-index="${index}"]`);
    if (!button) return;

    if (isOpenSelect.value == null) {
        isOpenSelect.value = index;
        toggleButtonVisibility(index, 'visible', 'unvisible');
        return;
    }
    if (isOpenSelect.value != null && isOpenSelect.value == index) {
        button?.classList.contains('unvisible') ? toggleButtonVisibility(index, 'visible', 'unvisible') : toggleButtonVisibility(index, 'unvisible', 'visible');
        return;
    }
    if (isOpenSelect.value != null && isOpenSelect.value != index) {
        toggleButtonVisibility(isOpenSelect.value, 'unvisible', 'visible');
        toggleButtonVisibility(index, 'visible', 'unvisible');
        isOpenSelect.value = index;
        return;
    }
}
const toggleButtonVisibility = (index: number, addClassName: string, removeClassName: string) => {
    if (!isNumber(index)) return;

    const button = document.querySelector(`button[data-index="${index}"]`);
    if (!button) return;

    button.classList.remove(removeClassName)
    button.classList.add(addClassName)
}
function checkCountContacts(incrementOrDecrement: string, event?: HTMLButtonElement) {
    const limitContact = 10
    if (incrementOrDecrement == 'increment') {
        countContacts.value += 1;
    } else if (incrementOrDecrement == 'decrement') {
        countContacts.value -= 1;
    }
    if (event && countContacts.value >= limitContact) {
        event.disabled = true;
    } else if (event && countContacts.value < limitContact && limitContact >= 0) {
        event.disabled = false;
    }
}
const deleteContact = () => {
    const btn = document.querySelector('button[data-newContact="new-contact"]')
    if (btn && isButtonElement(btn)) {
        checkCountContacts('decrement', btn)
    }
}
const addContactOfPerson = (event: Event) => {
    isOpenSelect.value != null && toggleButtonVisibility(isOpenSelect.value, 'unvisible', 'visible');
    if (isEvent(event) && event.target && isButtonElement(event.target)) {
        checkCountContacts('increment', event.target);
        countPersonContactData.value += 1
    }
}
const checkingValue = (event: Event) => {
    if (isInputEvent(event.target) && event.target.dataset.name) {
        const string = event.target.value
        const type = event.target.dataset.name
        event.target.value = streamCheck(string, type)
    }
}
const sendForm = async (event: Event): Promise<any> => {
    const toContacts: Contacts = [];
    const contacts: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[data-contact]');

    if (isButtonElement(event.target)) { event.target.disabled = true }

    if (inputLastname.value && inputName.value && inputSecondname.value) {
        checkInputAndSetClass(inputLastname.value, true);
        checkInputAndSetClass(inputName.value, true);
        inputSecondname.value.value.length > 0 && checkInputAndSetClass(inputSecondname.value, true);
    }

    contacts.forEach(contact => {
        switch (contact.dataset.contact) {
            case 'tel':
                updateElementClass(contact, validatePhoneNumber(contact.value));
                break;
            case 'adttel':
                updateElementClass(contact, validatePhoneNumber(contact.value));
                break;
            case 'email':
                updateElementClass(contact, validEmail(contact.value));
                break;
            case 'vk':
                updateElementClass(contact, validateSocialWeb(contact.value, 'vk.com/', 7));
                break;
            case 'facebook':
                updateElementClass(contact, validateSocialWeb(contact.value, 'facebook.com/', 13));
                break;
            default:
                break;
        }
    });

    const emptyFields: Array<HTMLInputElement> = Array.from(document.querySelectorAll<HTMLInputElement>('input.input-invalid'));
    if (emptyFields.length > 0) { return }

    contacts.forEach(element => {
        if (element?.dataset.contact && element.value) toContacts.push({ 'type': element.dataset.contact, 'value': element.value });
    })

    if (inputName.value != null && inputSecondname.value != null && inputLastname.value != null) {
        const mistakes = Person.checkPersonData([inputName.value, inputSecondname.value, inputLastname.value], toContacts);

        if (mistakes && mistakes.length == 0) {
            toContacts.forEach(contact => {
                if (contact.type == 'tel' || contact.type == 'adttel') {
                    contact.value = formattedPhoneNumber(contact.value)
                }
            })

            const person = new Person(inputName.value.value, inputSecondname.value.value, inputLastname.value.value, toContacts);

            if (props.id == null) {
                await Person.toPost(person);
                sentForm([inputName.value, inputSecondname.value, inputLastname.value])
            } else {
                await Person.toPatch(props.id, person);
                emits('closeModalWindow');
                return
            }
            inputName.value.value = '';
            inputName.value.classList.remove('input-correct');
            inputSecondname.value.value = '';
            inputSecondname.value.classList.remove('input-correct');
            inputLastname.value.value = '';
            inputLastname.value.classList.remove('input-correct');

            contacts.forEach(element => {
                element.value = '';
                element.classList.remove('input-correct');
            })

            if (isButtonElement(event.target)) { event.target.disabled = false }
        } else if (mistakes && mistakes.length >= 0) {

            mistakes.forEach((element: HTMLInputElement | Contact) => {
                if (element instanceof HTMLInputElement) {
                    element.classList.remove('input-correct');
                    element.classList.add('input-invalid');

                } else {
                    const input = document.querySelector(`input[data-contact="${element.type}"][value="${element.value}"]`);

                    if (input) {
                        input.classList.remove('input-correct');
                        input.classList.add('input-invalid');
                    }
                }
            })
            if (isButtonElement(event.target)) { event.target.disabled = false }
        }
    }
}
const animationStart = (event: Event | HTMLElement, mount?: boolean) => {
    if (isHtmlElement(event) && mount) { animationSpanStart(event.nextSibling, event, true); return }
    if (event instanceof Event && isHtmlElement(event.target)) { animationSpanStart(event.target.nextSibling, event.target); return }
}
const animationFinish = (event: Event, inputRef: HTMLInputElement | null) => {
    if (isInputEvent(event.target) && inputRef) { animationSpanFinish(event.target.nextSibling, inputRef.value); return }
}
</script>