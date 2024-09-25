<template>
    <button @click="handleClick" class="reset-btn pulse-button hvr-bounce-to-bottom ">
        {{ props.btnText }}
    </button>
</template>

<script setup lang="js">
const emit = defineEmits(['update:isModalOpen'])

const handleClick = () => {
    emit('update:isModalOpen', true)
}

const props = defineProps({
    btnText: String
})

</script>

<style scoped lang="scss">
@keyframes bounce {
    0% {
        transform: scaleY(0);
    }

    15% {
        transform: scaleY(1);
    }

    30% {
        transform: scaleY(0.8);
    }

    45% {
        transform: scaleY(1);
    }

    60% {
        transform: scaleY(0.9);
    }

    75% {
        transform: scaleY(1);
    }

    90% {
        transform: scaleY(0.95);
    }

    100% {
        transform: scaleY(1);
    }
}

@keyframes pulse {
    0% {
        transform: scale(0.95);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(0.95);
    }
}

.pulse-button {
    background: linear-gradient(45deg, #D6A5C0, #A1C4FD);
    color: white;
    padding: 2.5rem 5rem;
    border-radius: 3rem;
    font-weight: 600;
    position: relative;
    animation: pulse 1.5s ease infinite;
    transform: perspective(1px) translateZ(0);
    transition: transform 0.2s linear, color 0.5s;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.pulse-button:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2.5rem 5rem;
    border-radius: 3rem;
    background: #2098D1;
    transform: scaleY(0);
    transform-origin: 50% 0;
    transition: transform 0.2s ease;
}

.pulse-button:hover:before {
    transform: scaleY(1);
    animation: bounce 1s cubic-bezier(0.42, 0, 0.58, 1.2);
}
</style>
