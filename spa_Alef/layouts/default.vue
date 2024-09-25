<template lang="html">
    <header class="header__container">
        <div class="container horizon__center flex">
            <Header />
        </div>
    </header>
    <main class="container horizon__center">
        <slot />
    </main>
    <footer class="container horizon__center">
        <Footer />
    </footer>
</template>
<script setup lang="ts">
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
</script>
