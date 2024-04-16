import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const checkAuthStore = defineStore('authentication', () => {
  const router = useRouter()
  const isAuthenticated = ref(false)
  const justLook = ref(false);

  const login = () => {
    isAuthenticated.value = !isAuthenticated.value
    if (!isAuthenticated.value) {
      router.replace({ name: 'home' });
    }
  }

  const justLookLink = () => {
    justLook.value = true
  }

  return { isAuthenticated, justLook, justLookLink, login }
})
