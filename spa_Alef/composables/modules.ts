import { useRuntimeConfig } from '#app';
import { isNull } from '~/types/typeguards';
import type { Child } from '~/types/types';

export const validator = () => {
    const config = useRuntimeConfig()
    const minAge = Number(config.public.minAge)
    const maxAge = Number(config.public.maxAge)

    const name = (name: string): String | null => {
        const pattern = /[^A-Za-zА-Яа-яЁё ]+/g
        const clearString = name.replace(pattern, '')
        return clearString.length > 0 ? name.replace(pattern, '').charAt(0).toUpperCase() + name.replace(pattern, '').slice(1) : null
    };

    const age = (age: string): String | null => {
        const pattern = /[^0-9]+/g

        if (age.length === 0 || pattern.test(age)) {
            return age.replace(pattern, '') || null
        }

        const ageNumber = Number(age.replace(pattern, ''))

        if (ageNumber > maxAge) {
            return String(ageNumber).slice(0, 2)
        } else if (ageNumber < minAge) {
            return String(minAge)
        } else {
            return String(ageNumber)
        }
    };
    return { name, age }
}

export const declension = () => {
    const age = (age: string): String => {
        const lastDigit = Number(age) % 10;
        const lastTwoDigits = Number(age) % 100;

        if (lastDigit === 1 && lastTwoDigits !== 11) {
            return `${age} год`;
        } else if ((lastDigit >= 2 && lastDigit <= 4) && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
            return `${age} года`;
        } else {
            return `${age} лет`;
        }
    };

    return { age };
};

export const updateField = (children: Child[], index: number, field: 'name' | 'age', errorKey: 'errorName' | 'errorAge', placeholderKey: 'placeholderName' | 'placeholderAge', placeholderText: string, requiredText: string): void => {
    const isEmptyValue = isNull(children[index][field]);
    const currentPlaceholder = children[index][placeholderKey].includes(requiredText);

    if (isEmptyValue && !currentPlaceholder) {
        children[index][errorKey] = true;
        children[index][placeholderKey] += requiredText;
    } else if (!isEmptyValue && currentPlaceholder) {
        children[index][errorKey] = false;
        children[index][placeholderKey] = children[index][placeholderKey].replace(requiredText, '');
    }
};
