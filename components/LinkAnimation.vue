<template lang="html">
    <nuxt-link href="/time-for-cuteness" @mouseenter="showCutenessTime" @mouseleave="hiddenCutenessTime"
        class="overflow-hidden border border-none rounded-[1.5rem] flex items-start relative">
        <ul class="flex min-w-full h-full max-h-[inherit]">
            <li class="flex-1 transition-all duration-500 hover:flex-grow-[4] max-h-[inherit]"
                v-for="(path, index) in props.imagesList" :key="index">
                <img :src="path" alt="cuteness" class="w-full h-full object-cover max-h-[inherit]">
            </li>
        </ul>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none xl:gap-x-8 ">
            <div v-for="letter in props.CutenessTimeText" class="cute-char opacity-0 text-orange-500 relative">
                {{ letter }}
            </div>
        </div>
    </nuxt-link>
</template>
<script setup lang="js">
import { ref } from 'vue'
import { gsap } from 'gsap'

const CutenessTimeTextAnimation = ref()
const timelineShow = gsap.timeline({ paused: true })
const timelineHidden = gsap.timeline({ paused: true })

const props = defineProps({
    imagesList: Array,
    CutenessTimeText: String
})

onMounted(async () => {
    CutenessTimeTextAnimation.value = document.querySelectorAll('.cute-char');
})

const showCutenessTime = () => {
    timelineShow.clear()
    timelineHidden.clear()

    timelineShow.play()

    CutenessTimeTextAnimation.value.forEach((letter, index) => {
        if (letter.textContent == ' ') return
        timelineShow.fromTo(
            letter,
            { opacity: 0, top: '-50%', rotation: -180 },
            { opacity: 1, top: 0, rotation: 0, scale: 3, duration: 0.2, delay: 0.01, ease: 'linear' },

        );
    });

};

const hiddenCutenessTime = () => {
    const reversedArray = [...CutenessTimeTextAnimation.value].reverse();
    let delayIndex = 0;

    timelineShow.clear()
    timelineHidden.clear()

    reversedArray.forEach((letter, index) => {
        const opacity = parseFloat(letter.style.opacity);
        if (opacity >= 0.3) {
            timelineHidden.to(letter, { opacity: 0, top: '50%', rotate: 70, scale: 1, duration: 0.2, delay: 0.01, ease: 'linear' })
        }
    });
    timelineHidden.play()
};



</script>
<style lang="">

</style>
