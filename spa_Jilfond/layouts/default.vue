<template lang="html">
    <header class="container horizon__center">
        <Header />
    </header>
    <main class="container horizon__center">
        <slot />
    </main>
</template>
<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>

<style scoped lang="scss">
@media (min-width: 1366px) {
    .container {
        max-width: 1366px;
        padding-left: 50px;
        padding-right: 50px;
    }
}
</style>
