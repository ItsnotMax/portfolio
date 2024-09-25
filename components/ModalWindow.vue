<template lang="html">
    <div
        @click="close"
        class="reset-btn flex justify-center items-center z-[9999] inset-0 bg-[rgba(0,0,0,0.3)] fixed"
    >
        <div
            @click.stop
            class="w-[40vw] h-[50vh] bg-[rgb(255,255,255)] p-[1vw] border-8 border-gray-500 rounded-[1rem] shadow-[0_0_15px_10px_rgba(255,255,255,0.3)]"
        >
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="js">
const emit = defineEmits(['update:isModalOpen']);
const close = () => {
  emit('update:isModalOpen', false);
};
</script>
