<template lang="html">
    <div class="flex w-[100%] h-[100%] relative cursor-default">
        <ul
            ref="carousel"
            class="flex justify-start relative w-[100%] h-[100%] overflow-x-hidden overflow-y-scroll not-scrollbar"
        >
            <li
                v-for="(element, index) in carouselData"
                :key="index"
                ref="carouselItems"
                class="min-w-[100%] bg-slate-50 relative p-4"
            >
                <h5 class="text-[3rem] font-semibold text-gray-800 mb-2">
                    {{ element.title }}
                </h5>
                <p class="mb-8 text-[1.5rem] text-gray-600">
                    {{ element.description }}
                </p>
                <nuxt-link
                    :to="element.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[1.5rem] inline-block bg-blue-500 text-white border border-blue-700 rounded px-4 py-2 hover:bg-blue-600"
                >
                    Ссылка
                </nuxt-link>
            </li>
        </ul>
        <button
            v-if="start != 1"
            type="button"
            class="reset-btn absolute arrow--left"
            @click="shiftLeft"
        ></button>
        <button
            v-if="start != finish"
            type="button"
            class="reset-btn absolute arrow--right"
            @click="shiftRight"
        ></button>
    </div>
</template>
<script setup lang="js">
import { ref } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
    carouselData: Array
})

const start = ref(1)
const finish = ref(props.carouselData.length)
const carousel = ref(null)
const carouselItems = ref([])

const shiftRight = () => {
    if (start.value < finish.value) {
        [...carouselItems.value].forEach((element, index) => {

            gsap.to(element, { left: `-${start.value * 100}%`, duration: 0.5 })
        })
        start.value += 1
    }
}

const shiftLeft = () => {
    if (start.value <= finish.value && start.value > 0) {
        start.value -= 1;
        [...carouselItems.value].forEach((element) => {
            gsap.to(element, { left: `${-start.value * 100 + 100}%`, duration: 0.5 })
        })

    }
}
</script>
<style scoped lang="scss">
@keyframes shake {
    0% {
        transform: translateX(0) translateY(-50%);
    }

    25% {
        transform: translateX(-5px) translateY(-50%);
    }

    50% {
        transform: translateX(15px) translateY(-50%);
    }

    75% {
        transform: translateX(-5px) translateY(-50%);
    }

    100% {
        transform: translateX(0) translateY(-50%);
    }
}

.arrow--left,
.arrow--right {
    width: 80px;
    height: 100px;
}

.arrow--left {
    top: 50%;
    left: -120px;
    transform: translateY(-50%);
    background-image: url("/arrow_left.svg");
    background-position: left;
    background-repeat: no-repeat;
}

.arrow--right {
    top: 50%;
    right: -120px;
    transform: translateY(-50%);
    background-image: url("/arrow_right.svg");
    background-position: right;
    background-repeat: no-repeat;
}

.arrow--left:hover,
.arrow--right:hover {
    animation: shake 1s ease infinite;
}
</style>
