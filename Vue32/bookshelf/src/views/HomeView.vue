<template lang="html">
    <div class="container">
        <div class="wrapper">
            <router-link @click="look" to="/bookshelf" class="block reset-btn just-look">Just look</router-link>
            <router-link @click="login" :to="'bookshelf'" class="block reset-btn log-in">Log in</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { checkAuthStore } from '@/stores/authenticationStore'

const authentication = checkAuthStore();
const login = () => {
    authentication.login();
}
const look = () => {
    authentication.justLookLink()
}

</script>