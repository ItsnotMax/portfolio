<template lang="html">
    <div
        class="grid bg-white border border-black rounded-[1.5rem] shadow-[0px_0px_0.75rem_0.25rem_rgba(0,_0,_0,_0.5)] p-[2vw] gap-[2rem] text-[2rem] md:p-[1vw] md:gap-[1rem] md:text-[1rem] lg:p-[1.5vw] lg:gap-[1.5rem] lg:text-[1.5rem] xl:p-[2vw] xl:gap-[2rem] xl:text-[2rem] 2xl:p-[3vw] 2xl:gap-[3rem] 2xl:text-[2.5rem] bg-[linear-gradient(to_top,_#8C5A77,_#4A6DAF)]"
    >
        <div class="flex justify-center items-center relative">
            <MainBtn
                :btnText="'Список работ'"
                v-model:isModalOpen="isModalOpen"
            />
        </div>
        <div
            class="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[2rem] text-[1.333rem] md:text-[1rem] lg:text-[1.25rem] xl:text-[1.5rem] xl:grid-rows-[441px] 2xl:text-[1.75rem] 2xl:grid-cols-[repeat(2,_minmax(200px,_1fr))] 3xl:grid-rows-[500px]"
        >
            <CutawayAnimation :CVText="'Резюме'" />
            <LinkAnimation
                :CutenessTimeText="'Милаха'"
                :imagesList="imagesList"
            />
        </div>

        <teleport to="body" v-if="isModalOpen">
            <ModalWindow v-model:isModalOpen="isModalOpen">
                <Carousel :carouselData="carouselData" />
            </ModalWindow>
        </teleport>
    </div>
</template>
<script setup lang="js">
definePageMeta({
    layout: 'welcome'
});

useHead({
    title: 'Визитка'
})

import { ref } from 'vue'
import LinkAnimation from '~/components/LinkAnimation.vue';
import CutawayAnimation from '~/components/CutawayAnimation.vue';
import MainBtn from '~/components/MainBtn.vue';
import Carousel from '~/components/Carousel.vue';

const imagesList = ref()
const isModalOpen = ref(false)

const { data: carouselData} = await useFetch(`/api/links`);
const { } = await useAsyncData('items', async () => {
    try {
        const response = await fetch('/api/cuteness');
        const data = await response.json();
        imagesList.value = Array.from(data).slice(1, 4);
    } catch (error) {
        imagesList.value = [];
    }
    return
});
</script>

<style scoped lang="scss"></style>
