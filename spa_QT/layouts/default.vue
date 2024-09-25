<template lang="html">
    <div id="div-app">
        <header class="container container--centering">
            <Header @isModalWindow="openModalWindow" />
        </header>
        <main class="container container--centering container__padding">
            <slot />
        </main>
        <footer class="container container--centering container__padding container__color">
            <Footer />
        </footer>
        <ModalWindow v-if="isModalWindow" @isModalWindow="openModalWindow" />
    </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import ModalWindow from '~/components/ModalWindow.vue';
import { ref } from 'vue';

const isModalWindow = ref<boolean>(false);

function openModalWindow(): void {
    isModalWindow.value = !isModalWindow.value;
}
</script>
