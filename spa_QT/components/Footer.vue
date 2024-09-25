<template>
    <div class="footer">
        <h5 class="footer__title">Is there a project?</h5>
        <section class="grid grid__container">
            <div class="grid__item">
                <h5 class="item--first-column"><span class="underline item__underline">Let’s work</span> <span
                        class="underline item__underline--left item__underline--right">together</span></h5>
            </div>
            <article class="grid__item">
                <h5>For all questions</h5>
                <address>
                    <div><a href="tel:+79202780068">+7 (920) 278—00—68</a></div>
                    <div><a href="mailto:qtim@agency.com">qtim@agency.com</a></div>
                </address>
            </article>
            <article class="grid__item">
                <h5>Office in Russia</h5>
                <address>
                    <div>139 Ruben Station Lake Drew, NM 52678</div>
                </address>
            </article>
            <article class="grid__item">
                <h5>Office in Dubai</h5>
                <address>
                    <div>139 Ruben Station Lake Drew, NM 52678</div>
                </address>
            </article>
        </section>
        <nav>
            <div class="flex footer__button-link">
                <ul class="flex footer__button-link--left footer__link--animation">
                    <li>
                        <nuxt-link class="underline underline-text" to="/">Facebook</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="underline underline-text" to="/">Instagram</nuxt-link>
                    </li>
                    <li>
                        <a class="underline underline-text" href="https://t.me/UshiLolika" target="_blank"
                            rel="noopener noreferrer">Telegram</a>
                    </li>
                </ul>
                <ul class="flex footer__button-link--right footer__link--animation">
                    <li><nuxt-link class="underline underline-text" to="/">Behance</nuxt-link></li>
                    <li><nuxt-link class="underline underline-text" to="/">Linkedn</nuxt-link></li>
                    <li><nuxt-link class="underline underline-text" to="/privacy-policy">Privacy Policy</nuxt-link></li>
                </ul>
            </div>
        </nav>
        <nuxt-link to="/about" class="footer--go-btn">
            <img src="/assets/img/go_btn.svg" alt="go_btn">
        </nuxt-link>
    </div>
</template>
<script setup lang="ts"></script>
