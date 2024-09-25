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
    runtimeConfig: {
        public: {
            minAge: process.env.NUXT_MIN_AGE,
            maxAge: process.env.NUXT_MAX_AGE,
            maxChild: process.env.NUXT_MAX_CHILD,
            message: process.env.NUXT_MESSAGE,
        }
    },
    plugins: [
        '~/plugins/validator.ts',
        '~/plugins/declensionDigits.ts',
    ],
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
})
