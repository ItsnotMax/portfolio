<template lang="html">
    <div v-show="isOpenCutaway" ref="cutawayContainer" @click="openCutaway"
        class="reset-btn py-[0.5rem] px-[2rem] border border-black rounded-[1.5rem] flex flex-col items-start bg-white z-10">
        <Cutaway :class="{ 'opacity-0': isOpenCutaway }" />
        <CV class="overflow-scroll not-scrollbar not-allocated" :class="{ 'opacity-0': !isOpenCutaway }" v-show="showCV"
            :isShowCV="showCV" />
    </div>
    <div @mouseenter="showClickMeBtn" @mouseleave="hiddenClickMebtn" @click="openCutaway"
        class="py-[0.5rem] px-[2rem] border border-black rounded-[1.5rem] flex flex-col items-start bg-white box">
        <Cutaway :class="{ 'opacity-0': isOpenCutaway }" />
        <div class="reset-btn btn flex items-center justify-center">
            <div v-for="(letter, index) in props.CVText" :key="index" class="char opacity-0">{{ letter }}</div>
        </div>
    </div>
</template>

<script setup lang="js">
import Cutaway from '~/components/Cutaway.vue';
import CV from '~/components/CV.vue';
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap';

const btnAnimationSpans = ref([]);
const isOpenCutaway = ref(false);
const cutawayContainer = ref();
const showCV = ref(false);

const props = defineProps({
    CVText: String
});

onMounted(() => {
    btnAnimationSpans.value = document.querySelectorAll('.char');
});

const showClickMeBtn = () => {
    btnAnimationSpans.value.forEach((letter, index) => {
        if (letter.textContent.trim() === '') return
        gsap.fromTo(letter,
            { opacity: 0, left: '-100%', rotate: -720 },
            {
                opacity: 1,
                left: 0,
                rotate: 0,
                fontSize: '5rem',
                duration: 0.5,
                delay: index * 0.1,
                ease: 'linear',
                onComplete: () => {
                    letter.classList.add('bounce');
                }
            }
        );
    });
};

const hiddenClickMebtn = () => {
    btnAnimationSpans.value.forEach((letter, index) => {
        gsap.to(letter, {
            opacity: 0,
            left: '100%',
            rotate: -720,
            fontSize: '3rem',
            duration: 0.5,
            delay: index * 0.1,
            ease: 'linear',
            onComplete: () => {
                letter.classList.remove('bounce');
            }
        });
    });
};

const openCutaway = async () => {
    const siblingRect = cutawayContainer.value.nextElementSibling.getBoundingClientRect();
    const siblingTop = siblingRect.top;
    const siblingLeft = siblingRect.left;

    if (!isOpenCutaway.value) {
        isOpenCutaway.value = true;

        gsap.set(cutawayContainer.value, {
            position: 'fixed',
            width: 'auto',
            height: 'auto',
        });

        gsap.to(cutawayContainer.value, {
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'linear',
            onComplete: () => {
                showCV.value = true;
            }
        });
    } else {
        gsap.to(cutawayContainer.value, {
            width: 'auto',
            height: 'auto',
            top: siblingTop,
            left: siblingLeft,
            duration: 0.3,
            ease: 'linear',
            opacity: 0.4,
            onComplete: () => {
                gsap.set(cutawayContainer.value, {
                    position: 'relative',
                    top: 'auto',
                    left: 'auto',
                });
                isOpenCutaway.value = false;
                showCV.value = false;
            }
        });
    }
};
</script>

<style lang="scss">
@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-30px);
    }

    60% {
        transform: translateY(-15px);
    }
}

.bounce {
    animation: bounce 3s infinite;
}

.char {
    display: inline-block;
    position: relative;
    color: green;
    width: fit-content;
}

.btn {
    position: absolute;
    inset: 0;
    z-index: 1;
}

.box {
    width: inherit;
    height: inherit;
    position: relative;
    overflow: hidden;
    justify-content: center;
}

.box::before {
    content: '';
    position: absolute;
    top: -50%;
    left: 50%;
    width: 0;
    height: 200%;
    background: white;
    transition: width 0.5s linear;
    transform: translateX(-50%) rotate(350deg);
    z-index: 1;
}

.box:hover::before {
    width: 200%;
}
</style>
