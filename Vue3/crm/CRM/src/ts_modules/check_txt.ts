import { isEmail, isId, isName } from '@/types/typeguard';
import type { filteringType } from '@/types/types';

function checkText(string: string): filteringType {
    if (isName(string)) {
        return { bool: true, type: 'name' }
    } else if (isId(string)) {
        return { bool: true, type: 'id' }
    } else if (isEmail(string)) {
        return { bool: true, type: 'email' }
    } else {
        return { bool: false }
    }
}

function streamCheck(string: string, type: string): string {
    if (type === 'tel') {
        if (string.length < 3) {
            return '+7'
        }
        if (string.replace(/-/g, '').length >= 12) {
            const count = (string.match(/-/g) || []).length;
            return string.slice(0, 12 + count)
        }
        const regexp = /[^0-9-+]/g
        return string.replace(regexp, '')
    } else if (type === 'email') {
        const emailRegex = /[^a-zA-Z0-9._%+-@]/g;
        return string.replace(emailRegex, '')
    } else if (type === 'vk') {
        if (string.length < 8) {
            return 'vk.com/'
        }
        const regexp = /[^a-zA-z0-9]/g;
        const parts = string.split(/(?<=\/)/);
        const values = parts[1].replace(regexp, '');
        return parts[0] + values
    } else if (type === 'facebook') {
        if (string.length < 8) {
            return 'facebook.com/'
        }
        const regexp = /[^a-zA-z0-9]/g;
        const parts = string.split(/(?<=\/)/);
        const values = parts[1].replace(regexp, '');
        return parts[0] + values
    } else if (type === 'name') {
        const regexp = /[^a-zа-я-\s]/gi
        return string.replace(regexp, '')
    }
    return 'smth was wrong'
}

function isValidString(string: string): boolean {
    const maxLength = 20;
    const regex = /^([a-zA-Zа-яА-Я]+[-\s]?)+$/;
    return regex.test(string) && string.length <= maxLength
}

function validatePhoneNumber(phoneNumber: string): boolean {
    const delSpace = phoneNumber.replace(/\s+/g, '');
    const regex_1 = /^\+\d{1}\(\d{3}\)-\d{3}-\d{4}$/;
    const regex_2 = /^\+\d{1}-\d{3}-\d{3}-\d{4}$/;
    const regex_3 = /^\+\d{11,}/;
    return regex_1.test(delSpace) || regex_2.test(delSpace) || regex_3.test(phoneNumber)
}

function validateSocialWeb(string: string, url: string, length: number) {
    if (string.startsWith(url)) {
        const restOfUrl = string.slice(length);
        const regexp = /^[a-zA-Z0-9]+$/;
        return regexp.test(restOfUrl);
    }
    return false;
}

function formattedPhoneNumber(phoneNumber: string) {
    const formattedPhoneNumber = phoneNumber.replace(/^\+(\d{1})(\d{3})(\d{3})(\d{4})$/, '+$1($2)-$3-$4');
    return formattedPhoneNumber;
}

export { checkText, streamCheck, isValidString, validatePhoneNumber, validateSocialWeb, formattedPhoneNumber }
