<template>
	<TextSlot>
		<template v-slot:text>
			<h1>НАЙДИ МЕНЯ!</h1>
			<h2 class="no-select findme unvisible">СЮДА</h2>
			<div class="no-select">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta excepturi
				corporis vero autem, ipsam eaque natus mollitia aut eligendi fuga ipsum doloribus nostrum tenetur
				necessitatibus cumque deserunt molestiae eveniet? Consequatur. Lorem ipsum dolor sit amet consectetur,
				adipisicing elit. Soluta excepturi
				corporis vero autem, ipsam eaque natus mollitia aut eligendi fuga ipsum doloribus nostrum tenetur
				necessitatibus cumque deserunt molestiae eveniet? Consequatur.
			</div>
			<div class="no-select simpletext">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta excepturi
				corporis vero autem, ipsam eaque natus mollitia aut eligendi fuga ipsum doloribus nostrum tenetur
				necessitatibus cumque deserunt molestiae eveniet? Consequatur.
			</div>
		</template>
		<template v-slot:figure>
			<div id="draggableItem" class="figure">
				<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
							<stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0" />
							<stop offset="50%" style="stop-color:rgb(255,255,255);stop-opacity:0" />
							<stop offset="51%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
							<stop offset="90%" style="stop-color:rgb(100,100,255);stop-opacity:1" />
						</radialGradient>
					</defs>
					<circle class="draggable" cx="100" cy="100" r="80" fill="url(#grad1)" />
				</svg>
				<div ref="buttonRef" class="reset-btn figure draggable-btn no-select unvisible">Нажми</div>
				<button ref="btnFoundMe" type="button" class="reset-btn figure hidden-btn no-select"></button>
			</div>
		</template>
	</TextSlot>
</template>

<script setup lang="ts">
import TextSlot from './components/TextSlot.vue';
import { onMounted, ref } from 'vue';

const draggableItem = ref<HTMLElement | null>(null);
const mouseButtonPushed = ref<number>(0);
const newX = ref<number>(0), newY = ref<number>(0), startX = ref<number>(0), startY = ref<number>(0);
const findMe = ref<{ Top: number, Left: number, Right: number, Down: number } | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const buttonLoupe = ref<{ Top: number, Left: number, Right: number, Down: number } | null>(null);
const btnFoundMe = ref<HTMLElement | null>(null);
const switchBtn = ref<boolean>(false);

function getRect(element: HTMLElement | null): { Top: number, Left: number, Right: number, Down: number } | null {
	if (!element) return null;
	const rect = element.getBoundingClientRect();
	return { Top: rect.top, Left: rect.left, Right: rect.right, Down: rect.bottom };
}

function startLongPress(event: MouseEvent, callback: (event: MouseEvent) => void) {
	setTimeout(() => {
		if (mouseButtonPushed.value === 1 && (event.target as HTMLElement).classList.contains('draggable')) {
			callback(event);
		}
	}, 100);
}

function handleMouseDown(event: MouseEvent) {
	mouseButtonPushed.value = event.buttons;
	startLongPress(event, () => {
		draggableItem.value = document.querySelector('#draggableItem');
		if (draggableItem.value) {
			startX.value = event.clientX;
			startY.value = event.clientY;
		}
	});
}

function handleMouseUp() {
	mouseButtonPushed.value = 0;
	draggableItem.value = null;
}

function handleMouseMove(event: MouseEvent) {
	if (draggableItem.value && mouseButtonPushed.value === 1) {
		newX.value = event.clientX - startX.value;
		newY.value = event.clientY - startY.value;
		startX.value = event.clientX;
		startY.value = event.clientY;

		draggableItem.value.style.top = `${draggableItem.value.offsetTop + newY.value}px`;
		draggableItem.value.style.left = `${draggableItem.value.offsetLeft + newX.value}px`;

		const buttonRect = getRect(buttonRef.value);
		if (!buttonRect || !findMe.value || !buttonRef.value) return;

		if (findMe.value.Top > buttonRect.Top && buttonRect.Down > findMe.value.Down &&
			findMe.value.Left > buttonRect.Left && buttonRect.Right > findMe.value.Right) {
			buttonRef.value.style.opacity = '1';
			btnFoundMe.value!.style.cursor = 'pointer';
			setTimeout(() => {
				switchBtn.value = true;
			}, 100);
		} else {
			buttonRef.value.style.opacity = '0';
			btnFoundMe.value!.style.cursor = 'initial';
			setTimeout(() => {
				switchBtn.value = false;
			}, 100);
		}
	}
}

function handleClick() {
	if (switchBtn.value) {
		alert('Поздравляю, ты нашел меня');
	}
}

onMounted(() => {
	document.addEventListener('mousedown', handleMouseDown);
	document.addEventListener('mouseup', handleMouseUp);
	document.addEventListener('mousemove', handleMouseMove);
	btnFoundMe.value?.addEventListener('click', handleClick);

	const h2Element = document.querySelector('.findme') as HTMLElement;
	if (h2Element && buttonRef.value) {
		buttonRef.value.addEventListener('click', () => {
			console.log('hi');
		});

		findMe.value = getRect(h2Element);
		buttonLoupe.value = getRect(buttonRef.value);
	}
});
</script>