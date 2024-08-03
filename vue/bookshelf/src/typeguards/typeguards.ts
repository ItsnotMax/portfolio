export function isElement(target: EventTarget | null): target is Element {
    return target instanceof Element;
}

export function isModalWindow(target: EventTarget | null): target is HTMLElement {
    return target instanceof HTMLElement && target.id === 'modalWindow';
}