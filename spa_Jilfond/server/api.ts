import { API_URL } from '~/config/config';
import type { EmployeeProfile } from '~/types/types';

export async function sendRequest(id?: string): Promise<EmployeeProfile[] | null> {
    try {
        const url = id ? `${API_URL}${id}` : API_URL;
        const data: EmployeeProfile[] = await $fetch(url);
        return data;
    } catch (error) {
        alert(`Something went wrong\n${error}`);
        return null;
    }
}
