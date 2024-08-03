function checkText(text: string): string {
    return text.replace(/[^а-яa-z0-9\s?]/g, '');
}
export { checkText }