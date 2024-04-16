<script setup lang="ts">
import { RouterView } from 'vue-router'
import { checkAuthStore } from '@/stores/authenticationStore'

const authentication = checkAuthStore();
</script>

<template>
  <router-view v-if="authentication.isAuthenticated" />
  <router-view v-else />
</template>