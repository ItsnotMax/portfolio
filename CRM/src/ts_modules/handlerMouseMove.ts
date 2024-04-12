import { isHTMLElementWithId } from '@/types/typeguard';
import { ref } from 'vue';

export const cursorPosition = ref<boolean>(false);


export const handleMouseMove = (event: Event) => {
    if (event.target && isHTMLElementWithId(event.target) && event.target.id == 'modalBackground') {
        cursorPosition.value = true
    } else {
        cursorPosition.value = false
    }
};