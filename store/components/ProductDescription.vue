<template lang="html">
	<div>{{ data }}</div>
</template>
<script setup lang="js">
const { data } = defineProps({
	data: { type: String },
});
</script>
