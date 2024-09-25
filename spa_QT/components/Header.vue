<template>
    <div class="flex header">
        <nuxt-link to="/" id="logo"><img src="/assets/img/logo.png" alt="QTIM"></nuxt-link>
        <nav>
            <ul class="flex nav__link-group">
                <li><nuxt-link to="/works">Works</nuxt-link></li>
                <li><nuxt-link to="/about">About</nuxt-link></li>
            </ul>
        </nav>
        <ul class="flex nav__button-group">
            <li class="switch-language__group">
                <button class="reset-btn button--switch-language" type="button" @click="toggleLanguageMenu">
                    <img v-if="choosen_language.current == 'en'" src="/assets/img/english_flag.svg"
                        alt="English Flag" />
                    <img v-else src="/assets/img/russian_flag.svg" alt="Russian Flag" />
                </button>
                <ul ref="languageMenu" class="flex button-group__choose-language"
                    :class="{ invisible: !isLanguageMenuVisible }">
                    <li>
                        <button type="button" class="reset-btn" @click="changeLanguage('en')">
                            <img src="/assets/img/english_flag.svg" alt="English Flag" />
                        </button>
                    </li>
                    <li>
                        <button type="button" class="reset-btn" @click="changeLanguage('ru')">
                            <img src="/assets/img/russian_flag.svg" alt="Russian Flag" />
                        </button>
                    </li>
                </ul>
            </li>
            <li>
                <button class="reset-btn button--lets-work" @click="openModalWindow">Let`s work</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import type { Language, ChoosenLanguage } from '~/types/types';

const emit = defineEmits < (event: 'isModalWindow', value: boolean) => void> ();
const isLanguageMenuVisible = ref < boolean > (false);
const languageMenu = ref < HTMLElement | null > (null);
const choosen_language = ref < ChoosenLanguage > ({
    current: 'en',
    last: null
});

function toggleLanguageMenu(): void {
    if (!isLanguageMenuVisible.value) {
        isLanguageMenuVisible.value = true;
        gsap.fromTo(
            languageMenu.value,
            { opacity: 0, y: -30 },
            { duration: 0.2, opacity: 1, y: 0 }
        );
    } else {
        gsap.to(
            languageMenu.value,
            {
                duration: 0.4,
                opacity: 0,
                y: -20,
                onComplete: () => {
                    isLanguageMenuVisible.value = false;
                }
            }
        );
    }
}

function changeLanguage(language: Language): void {
    toggleLanguageMenu();
    choosen_language.value.current = language;
}

function openModalWindow(): void {
    emit('isModalWindow', true);
}
</script>
