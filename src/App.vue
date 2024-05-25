<script setup lang="ts">
import Bublik from './components/Bublik.vue'
</script>

<template>
	<div>
		<Bublik>
			<template v-slot:bublik>
				Нажми меня
			</template>
		</Bublik>
	</div>
</template>

<style scoped></style>
