<template>
	<div class="content no-select">
		<button class="bubble button no-select"></button>
		<div class="hole no-select">
			<slot name="bublik"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

type Nullable<T> = T | null;

const clicked = ref<boolean>(false);
const countClicked = ref<number>(0);
const timeoutId = ref<Nullable<number>>(null);

const handleClick = (event: MouseEvent): void => {
  countClicked.value += 1;

  if (countClicked.value >= 2) {
    if (timeoutId.value !== null) {
      clearTimeout(timeoutId.value);
    }
    timeoutId.value = setTimeout(() => {
      const clickedBtn = document.querySelector('.clicked-btn');
      if (clickedBtn) {
        clickedBtn.remove();
      }
      clicked.value = false;
      countClicked.value = 0;
    }, 1000);
  }
  
  if (
    event.target instanceof HTMLElement &&
    event.currentTarget instanceof HTMLElement &&
    !clicked.value &&
    event.target === event.currentTarget
  ) {
    clicked.value = true;
    const newItem = document.createElement('div');
    newItem.textContent = 'Кнопка нажата';
    newItem.classList.add('clicked-btn', 'no-select');
    const content = document.querySelector('.content');
    if (content) {
      content.appendChild(newItem);
      setTimeout(() => {
        newItem.classList.add('visible');
      }, 10);

      timeoutId.value = setTimeout(() => {
        newItem.remove();
        clicked.value = false;
        countClicked.value = 0;
      }, 1000);
    }
  }
};

onMounted(() => {
  const button = document.querySelector('.button');
  if (button) {
    button.addEventListener('click', handleClick);
  }
});

onUnmounted(() => {
  const button = document.querySelector('.button');
  if (button) {
    button.removeEventListener('click', handleClick);
  }
});
</script>

<style></style>
