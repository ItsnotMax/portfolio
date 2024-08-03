export function validEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email) || email.length > 254) {
        return false;
    }

    const atIndex = email.indexOf('@');
    if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
        return false;
    }

    const domainPart = email.substring(atIndex + 1);
    if (domainPart.indexOf('.') === -1) {
        return false;
    }

    const domainParts = domainPart.split('.');
    if (domainParts.some(part => part.length === 0)) {
        return false;
    }

    const localPart = email.substring(0, atIndex);
    if (localPart.length === 0) {
        return false;
    }

    const popularDomains = ['ru', 'com', 'net', 'org', 'gov', 'edu', 'info'];
    const topLevelDomain = domainParts[domainParts.length - 1].toLowerCase();
    if (!popularDomains.includes(topLevelDomain)) {
        return false;
    }

    return true;
}