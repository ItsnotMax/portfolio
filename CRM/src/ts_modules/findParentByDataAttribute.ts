export function findParentByDataAttribute(element: Element, dataAttribute: string, step: number = 0): Element | null {
    if (step && step > 5) return null;
    if (element.parentElement && element.parentElement.getAttribute('data-parent') === dataAttribute) {
        return element.parentElement;
    } else if (element.parentElement) {
        return findParentByDataAttribute(element.parentElement, dataAttribute, step + 1);
    }
    return null;
}