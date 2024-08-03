<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { fetchGET } from '@/ts_modules/fetchRequest'
import NavPanel from '@/components/NavPanel.vue';
import AddClient from '@/components/AddClient.vue';
import PersonsTable from '@/components/PersonsTable.vue';
import type { MatchCoef } from '@/types/types';
import { GetPerson, Person } from '@/types/classes/Person';
import { isGetPersonArray } from '@/types/typeguard';
import { sortByKeyDescending } from '@/ts_modules/sortAscAndDesc';

const temp = ref()
const query = ref<string>('');
const fullName = ref<string>('');
const gotPersons = ref<GetPerson[] | null>(null);
const filterById = ref<string>('');

const webRequest = () => {
    try {
        gotPersons.value = null
        setTimeout(async () => {
            const url = 'http://localhost:3000/api/clients';
            const data = await fetchGET(url);
            if (data) {
                const personsData = isGetPersonArray(data);
                if (personsData) { gotPersons.value = data as GetPerson[]; temp.value = data }
            }
        }, 100);

    } catch (error) {
        console.error('Произошла ошибка при получении данных:', error);
    }
}

onMounted(() => {
    webRequest()
});

const calculateJaccardCoefficient = (value: string, query: string): number => {
    const formattedValue: string[] = value.replace(/\s+/g, '').toLowerCase().split('');
    const formattedQuery: string[] = query.replace(/\s+/g, '').toLowerCase().split('');
    const setValue: Set<string> = new Set(formattedValue);
    const setQuery: Set<string> = new Set(formattedQuery);
    return setQuery.intersection(setValue).size / setQuery.size;
};

const jaccardCoefficient = computed(() => {
    if (fullName.value.length > 0) {
        return calculateJaccardCoefficient(fullName.value, query.value);
    } else if (filterById.value.length > 0) {
        return calculateJaccardCoefficient(filterById.value, query.value);
    }
    return '';
});

const filteringArray = (filtered: ({ matchCoef: string | number, person: Person } | null)[]) => {
    const validFiltered = filtered.filter(item => item !== null);

    if (validFiltered.length > 0) {
        const filteredNonNull = validFiltered.filter(item => item !== null) as MatchCoef[];
        if (filteredNonNull.length > 0) {
            const sorted = sortByKeyDescending(filteredNonNull, 'matchCoef');
            const persons: GetPerson[] = sorted.map((person: MatchCoef) => person.person);
            gotPersons.value = persons;
        }
    }
};

const filtration = async (queryPerson: { query: string; type: string }): Promise<void> => {
    const treshhold: number = 0.6;
    const key: string = queryPerson.type;
    query.value = queryPerson.query;

    if (query.value.length <= 1) {
        gotPersons.value = temp.value;
        return;
    }

    if (!gotPersons.value) return;

    const filterValue = key === 'name' ? fullName : filterById;

    const filtered: ({ matchCoef: string | number, person: Person } | null)[] = await Promise.all([...gotPersons.value].map(async (person: GetPerson) => {
        filterValue.value = key === 'name' ? `${person.surname} ${person.name} ${person.lastName}` : person.id;
        const matchCoef = jaccardCoefficient.value;
        if (typeof matchCoef === 'number' && matchCoef > treshhold) {
            return { matchCoef, person };
        } else {
            return null;
        }
    }));
    filteringArray(filtered);
};

const sort = (sort: GetPerson[]) => {
    gotPersons.value = sort
}
</script>

<template>
    <header>
        <NavPanel @queryPerson='filtration' />
    </header>
    <main>
        <PersonsTable :toTable="gotPersons" @sort="sort" @updateTable="webRequest" />
        <AddClient @updateTable="webRequest" />
    </main>
</template>