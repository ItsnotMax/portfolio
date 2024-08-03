export async function fetchGET(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const reader = response.body.getReader();
        let result = '';

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            result += new TextDecoder('utf-8').decode(value);
        }
        const data = JSON.parse(result);

        return data;
    } catch (error) {
        console.error('An error occurred while fetching the data', error);
        alert('Failed to fetch data');
    }
}
