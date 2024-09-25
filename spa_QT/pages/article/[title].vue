<template lang="html">
    <div v-if="!pending && !error && article">
        <h1 class="article__title">{{ article.title }}</h1>
        <img :src="article.image" :alt="article.title" class="article__img" />
        <h5 class="article__about">About</h5>
        <div class="article__description">{{ article.description }}</div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { useAsyncData } from '#app'
import { sendRequest } from '~/server/api'
import type { Article, UseAsyncDataResult } from '~/types/types'
import { isString } from '~/types/typeguards'

const route = useRoute()
const id = route.query.id;
const title = ref < string > ('')
const description = ref < string > ('')

if (!isString(id)) {
    throw new Error('Invalid ID');
}

const { data: article, error, pending }: UseAsyncDataResult<Article> = await useAsyncData(
    `article-${id}`,
    async () => {
        if (isString(id)) {
            return await sendRequest(id);
        }
    },
)

watchEffect(() => {
    if (article.value) {
        title.value = article.value.title
        description.value = article.value.preview
    }
})

useHead({
    title: title.value,
    meta: [
        { name: 'description', content: description.value },
        { name: 'keywords', content: 'keywords, for, page' },
    ]
})
</script>
