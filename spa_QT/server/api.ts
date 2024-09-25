import { API_URL, ARTICLES_PER_PAGE } from '../config'

export async function sendRequest(id: string | null = null): Promise<any | null> {
    try {
        const url = id ? `${API_URL}${id}` : API_URL
        const data = await $fetch(url)
        return data

    } catch (error) {
        return null;
    }
}
