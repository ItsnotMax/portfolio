<template>
	<div>
		<button @click="prevPage" :disabled="pagination.currentPage === 1">Previous</button>
		<button v-for="page in pagination.totalPages" :key="page" @click="goToPage(page)"
			:class="{ 'active': pagination.currentPage === page }">
			{{ page }}
		</button>
		<button @click="nextPage" :disabled="pagination.currentPage === pagination.totalPages">Next</button>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	pagination: {
		totalPages: number,
		currentPage: number
	}
}>();


const emit = defineEmits(["update:current-page"])

const prevPage = () => {
	if (props.pagination.currentPage > 1) {
		goToPage(props.pagination.currentPage - 1)
	}
};

const nextPage = () => {
	if (props.pagination.currentPage < props.pagination.totalPages) {
		goToPage(props.pagination.currentPage + 1)
	}
};

const goToPage = (page: number) => {
	emit("update:current-page", page)
};
</script>

<style scoped>
.active {
	background-color: #007bff;
	color: white;
}
</style>
