<template lang="html">
	<ul class="relative flex flex-col gap-y-4 z-0">
		<li
			class="flex flex-col relative overflow-x-scroll whitespace-nowrap text-ellipsis not-scrollbar z-0 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
			v-for="(essence, index) in props.essencesList"
			:key="index"
		>
			<div class="text-gray-800 font-semibold mb-2">
				Сущность: {{ essence.essence }}
			</div>
			<div class="text-gray-600 mb-2">ID: {{ essence.id }}</div>
			<a
				target="_blank"
				:href="essence.link"
				rel="noopener noreferrer"
				class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
			>
				Ссылка: {{ essence.link }}
			</a>
		</li>
	</ul>
</template>

<script setup lang="ts">
import type { CreatedEssence } from "~/types/types";

const props = defineProps<{
	essencesList: CreatedEssence[];
}>();
</script>

<style scoped lang="scss"></style>
