<template lang="html">
    <div class="flex header">
        <nuxt-link to="/" class="header__logo">Жилфонд</nuxt-link>
        <div class="header__user">{{ userName }}</div>
    </div>
</template>

<script setup lang="ts">
import type { userNameContext } from '~/types/types';

const { $userName }: userNameContext = useNuxtApp()
const userName = $userName
</script>

<style scoped lang="scss">
@import '~/assets/styles/_mixins.scss';

.header {
    padding-top: 50px;
    margin-bottom: 26px;
    justify-content: space-between;
}

.header__logo {
    @include font-mixin(normal, 700, 32px);
    color: #E31F24;
}

.header__user {
    @include font-mixin(normal, 400, 16px);
    color: #333333;
}
</style>
