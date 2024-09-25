<template lang="html">
    <Cuteness :imagesList="imagesList" />
</template>

<script setup lang="js">
definePageMeta({
    layout: 'welcome'
});

useHead({
    title: 'Cuteness time'
});

import Cuteness from '~/components/Cuteness.vue';

const { data: imagesList} = await useFetch('/api/cuteness')
</script>
