<template lang="html">
    <div id="table-container" class="container pt-40">
        <h3 class="table-title">Клиенты</h3>
        <ul class="pl-20 table-head table-grid" role="table">
            <li class=""><button @click="(event) => sort(event, 'id')" type="button" aria-label="ID"
                    class="reset-btn head-item">ID</button>
            </li>
            <li class=""><button @click="(event) => sort(event, 'surname')" type="button"
                    aria-label="Фамилия Имя Отчество" class="reset-btn head-item">Фамилия Имя
                    Отчество</button></li>
            <li class=""><button @click="(event) => sort(event, 'createdAt')" type="button"
                    aria-label="Дата и время создания" class="reset-btn head-item data-create">Дата и
                    время
                    создания</button></li>
            <li class=""><button @click="(event) => sort(event, 'updatedAt')" type="button"
                    aria-label="Последние изменения" class="reset-btn head-item data-change">Последние
                    изменения</button>
            </li>
            <li class=""><button type="button" aria-label="Контакты"
                    class="reset-btn head-item cursor-auto">Контакты</button>
            </li>
            <li class=""><button type="button" aria-label="Действия"
                    class="reset-btn head-item cursor-auto">Действия</button>
            </li>
        </ul>

        <div class="flex flex-col table-body">
            <div v-if="props.toTable == null" class="loader">
                <div class="spinner"></div>
            </div>
            <ul v-else v-for="(person, index) in props.toTable" :key="index" class="flex table-grid pl-20">
                <li class="body-id row">{{ person.id.substring(person.id.length - 6) }}</li>
                <li class="row body-li-color">{{ person.surname }} {{ person.name }} {{ person.lastName }}</li>
                <li class="row body-li-color">{{ createYear(person.createdAt) }}
                    <span class="created-time">{{ createdTime(person) }}</span>
                </li>
                <li class="row body-li-color">{{ updateYear(person.updatedAt) }}
                    <span class="created-time">{{ updatedTime(person) }}</span>
                </li>
                <li class="table-contacts">
                    <ul v-if="person.contacts && person.contacts.length > 0" class="flex flex-wrap contacts-list"
                        :class="index in showContactsList && showContactsList[index] ? 'contacts-list' : 'p-tb-20'"
                        @click="(event) => toggleContact(event, index)">
                        <li v-for="(contact, indexContact) in person.contacts" :key="indexContact"
                            class="reset-btn svg-contact not-selectable"
                            @mouseover="(event) => showTooltip(event, indexContact, index)"
                            @mouseout="(event) => closeTooltip(event, indexContact)">
                            <div
                                v-html="index in showContactsList && showContactsList[index] ? contactIcon(contact) : contactIcon(contact, indexContact, person.contacts.length)">
                            </div>
                            <span class="tooltip hidden" :data-index="indexContact">
                                <div class="tooltip-block">
                                    {{ contact.value }}
                                </div>
                            </span>
                        </li>
                    </ul>
                </li>
                <li class="flex table-actions-button">
                    <button @click="() => changePerson(person)"
                        class="block reset-btn action-btn change-btn mr-30 change-svg not-selectable body-li-color">Изменить</button>
                    <button @click="() => deletePerson(person)"
                        class="block reset-btn action-btn delete-btn delete-svg not-selectable body-li-color">Удалить</button>
                </li>
            </ul>
        </div>
    </div>
    <ModalWindow v-if="showModal" :title="'Изменить данные'" :cancel="'Удалить клиента'" :id="idPerson"
        :person="personInfo" @closeModalWindow="closeModalWindow" />
    <ModalWindowDeletePerson v-if="deletePersonBool" :person="personInfo" @closeModalWindow="closeModalWindow" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { GetPerson } from '@/types/classes/Person';
import { sortByKeyAscending, sortByKeyDescending } from '@/ts_modules/sortAscAndDesc';
import { getYear } from '@/ts_modules/getFullYear';
import ModalWindow from './ModalWindow.vue';
import ModalWindowDeletePerson from './ModalWindowDeletePerson.vue';
import type { Contact } from '@/types/types';
import { isButtonElement, isHtmlElement } from '@/types/typeguard';
import { appearTable } from '@/ts_modules/animationGSAP';


onMounted(() => {
    appearTable()
});


type ButtonIndexMap = { [index: number]: HTMLButtonElement };
const switchDirection = ref<ButtonIndexMap>({});
const showContactsList = ref<boolean[]>([]);
const showModal = ref<boolean>(false);
const idPerson = ref<string | null>(null);
const personInfo = ref<GetPerson | null>(null);
const keyForSort = ref<string | null>(null);
const keyForSortOldValue = ref<string | null>(null);
const ascOrDesc = ref<string>('asc');
const deletePersonBool = ref<boolean>(false);
const props = defineProps({
    toTable: {
        type: Array as () => GetPerson[] | null,
        default: null
    }
});
const emits = defineEmits(['sort', 'updateTable'])

const createYear = (receivedDate: string): string => {
    return getYear(receivedDate)
};
const updateYear = (receivedDate: string): string => {
    return getYear(receivedDate)
};
const sort = (event: Event, key: any): void => {
    keyForSort.value = key;

    if (keyForSortOldValue.value !== keyForSort.value) {
        keyForSortOldValue.value = keyForSort.value;
        ascOrDesc.value = 'asc';
    } else {
        ascOrDesc.value = ascOrDesc.value === 'desc' ? 'asc' : 'desc';
    }

    if (props.toTable !== null && isButtonElement(event.target) && event.target != null) {
        let sortedArray: GetPerson[] = [];

        if (ascOrDesc.value === 'asc') {
            sortedArray = sortByKeyAscending([...props.toTable], key);

            Object.values(switchDirection.value).map((btn: HTMLButtonElement) => {
                btn.classList.remove('arrow-down');
                btn.classList.remove('arrow-up');
            });
            Object.keys(switchDirection.value).length = 0

            switchDirection.value[0] = event.target
            event.target.classList.add('arrow-up')

        } else {
            sortedArray = sortByKeyDescending([...props.toTable], key);
            Object.values(switchDirection.value).map((btn: HTMLButtonElement) => {
                btn.classList.remove('arrow-down');
                btn.classList.remove('arrow-up');
            });
            Object.keys(switchDirection.value).length = 0

            switchDirection.value[0] = event.target
            event.target.classList.add('arrow-down')
        }
        emits('sort', sortedArray);
    }
}
const changePerson = (person: GetPerson): void => {
    showModal.value = true;
    idPerson.value = person.id;
    personInfo.value = person;
}
const closeModalWindow = (): void => {
    showModal.value = false;
    deletePersonBool.value = false;
    emits('updateTable')
}
const deletePerson = (person: GetPerson): void => {
    deletePersonBool.value = true;
    personInfo.value = person;
}
const getTime = (data: string): string => {
    const date = new Date(data);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
const createdTime = (person: GetPerson): string => {
    return getTime(person.createdAt)
}
const updatedTime = (person: GetPerson): string => {
    return getTime(person.createdAt)
}
const contactIcon = (contact: Contact, index?: number, countContacts?: number): string => {
    const limit = 4;
    const svgIcons: { [key: string]: string } = {
        vk: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/></svg>',
        facebook: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/></svg>',
        tel: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></g></svg>',
        email: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/></svg>'
    };

    if (index && (index > limit)) { return '' }

    if (index && (index == limit) && countContacts) {
        const contactsLeft = countContacts - index;
        svgIcons['empty'] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7.5" stroke="#9873FF"/></svg><span class="circle-parent">+${contactsLeft}</span>`
        return svgIcons.empty
    }
    if (contact.type == 'tel' || contact.type == 'adttel' && contact.type in svgIcons) { return svgIcons.tel }
    if (contact.type in svgIcons) { return svgIcons[contact.type] }
    return '';
}
const toggleContact = (event: Event, index: number): void => {
    if (event.currentTarget && isHtmlElement(event.currentTarget) && event.currentTarget.children.length < 5) { return }
    if (!(index in showContactsList.value)) showContactsList.value.length = 0;
    showContactsList.value[index] = !showContactsList.value[index];
    closeTooltip(event)
};

const showTooltip = (event: Event, indexContact: number, index: number): void => {
    function liParent(li: HTMLElement) {
        const tooltip = li.querySelector(`span[data-index="${indexContact}"]`);
        tooltip?.classList.remove('hidden')
    }
    const li = event.currentTarget
    if (li != null && isHtmlElement(li)) {
        if (!showContactsList.value[index] && indexContact < 4) {
            liParent(li)
            return
        } else if (showContactsList.value[index]) {
            liParent(li)
            return
        }
    }
};

const closeTooltip = (event: Event, indexContact?: number) => {
    const li = event.currentTarget
    if (!indexContact && li != null && isHtmlElement(li)) {
        const tooltip = li.querySelectorAll(`span[data-index]`);
        tooltip && tooltip.forEach(span => {
            span?.classList.add('hidden')
        });
    }
    if (li != null && isHtmlElement(li)) {
        const tooltip = li.querySelector(`span[data-index="${indexContact}"]`);
        tooltip?.classList.add('hidden');
    }
}

</script>