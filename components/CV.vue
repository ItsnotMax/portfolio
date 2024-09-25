<template lang="html">
    <div class="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg absolute inset-0 m-auto">
        <header class="text-center mb-8">
            <h1 ref="header" class="text-4xl font-bold text-gray-800">Привет, я Макс – Frontend-разработчик</h1>
        </header>
        <main>
            <section ref="section1" class="mb-8">
                <h2 class="text-3xl font-semibold text-gray-700 mb-4">Обо мне</h2>
                <p class="text-lg text-gray-600 mb-4">Я специализируюсь на фронтенд-разработке и активно интересуюсь
                    современными технологиями. Мне нравится создавать эффективные и инновационные веб-приложения, и я
                    мне нравится быть частью команды.</p>
                <ul class="list-disc list-inside text-lg text-gray-600">
                    <li class="mb-3"><strong class="font-semibold">В данный момент:</strong> Углубляю свои знания в Vue
                        3 и TypeScript.</li>
                    <li><strong class="font-semibold">Навыки:</strong></li>
                    <li>Vue 3 (компоненты, роутинг, директивы) + Pinia</li>
                    <li>JavaScript ES6+ (классы, промисы, модули)</li>
                    <li>TypeScript</li>
                    <li>HTML5, CSS3, SCSS (Flexbox, Grid, анимации)</li>
                    <li>Библиотеки JS (JQuery, GSAP)</li>
                    <li>RESTful API (fetch, Axios)</li>
                    <li>Системы контроля версий (Git)</li>
                    <li>Figma (макеты)</li>
                    <li>Local Storage, IndexedDB</li>
                    <li>Python</li>
                </ul>
            </section>

            <section ref="section2" class="mb-8">
                <h2 class="text-3xl font-semibold text-gray-700 mb-4">Мои проекты</h2>
                <ul class="list-disc list-inside text-lg text-gray-600">
                    <li><strong class="font-semibold">Bookshelf App:</strong> SPA на базе Vue 3 и Pinia для отслеживания
                        книг.</li>
                    <li><strong class="font-semibold">CRM-система:</strong> Vue 3 с интеграцией RESTful API.</li>
                    <li><strong class="font-semibold">React SPA:</strong> Разработано с использованием FakeAPI.</li>
                    <li><strong class="font-semibold">Адаптивный дизайн:</strong> Реализованы сложные анимации на CSS и
                        JavaScript.</li>
                </ul>
                <p class="mt-4 text-lg text-gray-600">Посмотрите мой GitHub: <a
                        href="https://github.com/ItsnotMax/portfolio" target="_blank"
                        class="text-blue-500 hover:underline">Портфолио</a></p>
            </section>

            <section ref="section3">
                <h2 class="text-3xl font-semibold text-gray-700 mb-4">Цели</h2>
                <ul class="list-disc list-inside text-lg text-gray-600 mb-6">
                    <li><strong class="font-semibold">Профессиональный рост:</strong> Стремлюсь развиваться в
                        веб-разработке, применяя знания JavaScript, TypeScript, Vue.js и других современных технологий
                        для создания качественных веб-проектов.</li>
                    <li><strong class="font-semibold">Командная работа:</strong> Готов внести вклад в интересные проекты
                        и работать в динамичной команде.</li>
                    <li><strong class="font-semibold">Непрерывное обучение:</strong> Стремлюсь учиться у опытных коллег
                        и расти профессионально.</li>
                </ul>
            </section>

            <section ref="section4">
                <h2 class="text-3xl font-semibold text-gray-700 mb-4">Контакты</h2>
                <ul class="flex justify-evenly text-lg text-gray-600 mb-8">
                    <li>📧 Email: <a href="mailto:makc.9393@gmail.com"
                            class="text-blue-500 hover:underline">makc.9393@gmail.com</a></li>
                    <li>📱 Telegram: <a href="https://t.me/UshiLolika" target="_blank"
                            class="text-blue-500 hover:underline">@UshiLolika</a></li>
                </ul>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'

const sections = ref<HTMLElement[]>([]);

const props = defineProps<{
    isShowCV: boolean;
}>();

onMounted(() => {
    if (process.client) {
        sections.value = Array.from(document.querySelectorAll('section')) as HTMLElement[];

        if (!props.isShowCV) {
            sections.value.forEach((section, index) => {
                const isEven = (index + 1) % 2 === 0;
                gsap.set(section, { x: isEven ? -400 : 400 });
            });
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = sections.value.indexOf(entry.target as HTMLElement);
                const isEven = (index + 1) % 2 === 0;
                if (entry.isIntersecting) {
                    gsap.set(entry.target as HTMLElement, { x: isEven ? -400 : 400 });
                    gsap.to(entry.target as HTMLElement, {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out'
                    });
                }
            });
        });

        sections.value.forEach((section) => {
            observer.observe(section);
        });
    }
});
</script>
