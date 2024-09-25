// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    ssr: true,
    css: [
        '@/assets/styles/main.scss'
    ],
    build: {
        transpile: ['@pinia/nuxt']
    },
    modules: [
        '@pinia/nuxt'
    ],
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    plugins: [
        '~/plugins/auth.ts'
    ],
})
