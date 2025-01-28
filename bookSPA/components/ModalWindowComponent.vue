<template lang="html">
	<div
		@click.stop="emit('isOpen', false)"
		class="fixed h-full z-[9999] inset-0 bg-[rgba(15,23,42,0.1)] overflow-scroll not-scrollbar cursor-pointer sm:py-10"
	>
		<div class="relative h-[inherit] flex justify-center items-center">
			<div
				@click.stop
				class="bg-[rgb(255,255,255)] w-[464px] cursor-auto h-[inherit] sm:h-[555px] sm:rounded-[1rem]"
			>
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script setup lang="js">
const emit = defineEmits(["isOpen"]);
</script>
