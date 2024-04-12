import type { Email } from '@/types/types'
import type { GetPerson } from './classes/Person';



export function isGetPersonArray(data: any): data is GetPerson[] {
    const invalidData: any[] = [];
    data.forEach((item: any) => {
        if (!('id' in item) || !('surname' in item) || !('lastName' in item) || !('contacts' in item) || !('updatedAt' in item) || !('createdAt' in item)) {
            invalidData.push(item);
        }
    });
    return invalidData.length === 0 && Array.isArray(data);
}


export function isEmail(value: any): value is Email {
    const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/;
    return typeof value === 'string' && value.match(regexp) !== null;
}

export function isId(value: any): boolean {
    return isFinite(value);
}

export function isName(value: string): boolean {
    const regex = /^[a-zA-ZА-Яа-я\s+]+$/;
    return regex.test(value);
}

export function isEvent(value: any): value is Event {
    return value instanceof Event
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function isHtmlElement(value: any): value is HTMLElement {
    return value instanceof HTMLElement;
}

export function isButtonElement(element: EventTarget | null): element is HTMLButtonElement {
    return element instanceof HTMLButtonElement;
}

export function isInputEvent(value: any): value is HTMLInputElement {
    return value instanceof HTMLInputElement
}

export function isFormElement(node: Node): node is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLLIElement {
    return (node instanceof HTMLInputElement ||
        node instanceof HTMLSelectElement ||
        node instanceof HTMLTextAreaElement ||
        node instanceof HTMLLIElement);
}

export function isHTMLElementWithId(target: EventTarget): target is HTMLElement {
    return (target instanceof HTMLElement) && (typeof target.id === 'string');
}