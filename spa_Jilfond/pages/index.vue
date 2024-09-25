<template lang="html">
    <div class="grid spa">
        <div class="grid-item__sidebar grid-item__container">
            <Sidebar @employee="employeeHandler" />
        </div>
        <div class="grid-item__profile grid-item__container">
            <Profile :employee="employeeRef" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '~/components/Sidebar.vue';
import Profile from '~/components/Profile.vue';
import type { EmployeeProfile } from '~/types/types';

definePageMeta({
    middleware: ['fetch-data', 'auth'],
});

useHead({
    title: 'Search employee',
    meta: [
        { name: 'description', content: 'Some description' },
        { name: 'keywords', content: 'some, description' },
    ]
})

const employeeRef = ref<EmployeeProfile | {}>({});

const employeeHandler = (employee: EmployeeProfile | {}): void => {
    employeeRef.value = employee;
};
</script>

<style scoped lang="scss">
@media (min-width: 1366px) {
    .spa {
        height: 575px;
        padding-left: 20px;
        padding-right: 30px;
        background: #FDFDFD;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        grid-template-columns: 293px 969px;
        overflow: hidden;
        margin-bottom: 58px;
    }

    .grid-item__sidebar {
        padding-left: 14px;
        padding-right: 26px;
    }

    .grid-item__profile {
        width: 100%;
        height: 100%;
        padding-left: 21px;
        padding-right: 30px;
        border-left: 1px solid #DEDEDD;
        border-radius: 0px 10px 10px 0px;
    }

    .grid-item__container {
        height: inherit;
        padding-top: 30px;
        padding-bottom: 30px;
    }
}
</style>
