<template>
    <div class="wrapper mx-auto" ref="wrapper">
        <ul class="container mx-auto border-[1rem]" ref="container">
            <li
                v-for="(link, index) in props.imagesList"
                class="wrapper__item"
                :key="index"
            >
                <img :src="link" alt="there is cute" />
            </li>
        </ul>
    </div>
    <nuxt-link class="fixed top-0 left-0 text-[2rem]" to="/">Back</nuxt-link>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wrapper = ref(null);
const container = ref(null);
const wrapperItem = ref([]);

const props = defineProps({
    imagesList: Array,
})

onMounted(async () => {
    wrapperItem.value = Array.from(document.querySelectorAll('.wrapper__item'));


    const xValue = `${100 * (wrapperItem.value.length - 0)}`;
    const duration = 1;
    const initialPosition = '50%';
    const finalPosition = '-50%';

    const t1 = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper.value,
            scrub: 0.5,
            pin: container.value,
            toggleActions: 'play none play none',
            start: '-2% 2%',
            end: `+=${xValue}%`,
            // markers: true,
        }
    });

    wrapperItem.value.forEach((box, index) => {
        if (index === 0) {
            t1.to(box, { opacity:0,left: finalPosition, rotate: -45, duration });
        } else if (index === (wrapperItem.value.length - 1)) {
            t1.fromTo(
                box,
                { opacity:0, left: initialPosition, rotate: 45, duration },
                { opacity:1, left: '-0%', rotate: 0, duration }
            )
        }
        else {
            t1.fromTo(
                box,
                { opacity:0, left: initialPosition, rotate: 45, duration },
                { opacity:1, left: '-0%', rotate: 0, duration }
            ).to(box, { opacity:0, left: finalPosition, rotate: -45, duration });
        }
    });
});
</script>

<style scoped lang="scss">
.wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.container {
    position: relative;
    display: flex;
    height: 90vh;
    overflow: hidden;
    justify-content: flex-start;
    border: 1rem solid #e5e7eb;
    box-shadow: 0 0 0 -200px rgba(255, 255, 255, 0.1);
}

.wrapper__item {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    height: 90vh;
    align-items: center;
    justify-content: center;
    color: white;
}

.wrapper__item > img {
    min-width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
}

.wrapper__item:first-of-type img {
    object-fit: contain;
}
</style>
