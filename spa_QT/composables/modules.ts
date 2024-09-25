import { gsap } from 'gsap'
import type { GsapAnimationEvent } from '../types/types';

export function toKebabCase(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-')
}

export function show(element: HTMLElement, deleteClass: string): void {
    const target = element.querySelector<HTMLElement>('.' + deleteClass)
    if (target) {
        target.classList.remove(deleteClass)
    }
}

export function hide(element: HTMLElement, lookingForClass: string, addClass: string): void {
    const target = element.querySelector<HTMLElement>('.' + lookingForClass)
    if (target) {
        target.classList.add(addClass)
    }
}

export function itemUp(event: GsapAnimationEvent): void {
    const parent = event.currentTarget
    gsap.to(parent, { y: -20, duration: 0.3 })
    show(parent, 'invisible')
}

export function itemDown(event: GsapAnimationEvent): void {
    const parent = event.currentTarget
    gsap.to(parent, { y: 0, duration: 0.3 })
    hide(parent, 'button__read-more', 'invisible')
}
