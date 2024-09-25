import levenshtein from 'fast-levenshtein';
import { MIN_MATCH_PERCENTAGE, ALLOWED_MAX, ALLOWED_MIN, CACHE } from '~/config/config';

export const calculateMatchPercentage = (stringToCompare: string, str: string): boolean => {
    const [key1, key2] = [stringToCompare, str].sort();
    const cacheKey = `${key1}-${key2}`;

    if (CACHE.has(cacheKey)) {
        return CACHE.get(cacheKey) as boolean;
    }

    const lengthRatio = stringToCompare.length / str.length;

    if (lengthRatio < ALLOWED_MIN || lengthRatio > ALLOWED_MAX) {
        return false;
    }

    const distance = levenshtein.get(stringToCompare, str);
    const maxLength = Math.max(stringToCompare.length, str.length);
    const percentage = (1 - distance / maxLength) * 100;
    const result = percentage >= MIN_MATCH_PERCENTAGE;
    CACHE.set(cacheKey, result);
    return result;
};

export const userAuth = () => {
    const checkAuth = async (): Promise<{ user: string }> => {
        return { user: 'Пользователь' };
    };

    return {
        checkAuth
    };
};
