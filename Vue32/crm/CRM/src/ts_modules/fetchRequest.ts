async function fetchGET(url: string): Promise<JSON> {
    const fullUrl = new URL(url);
    const response = await fetch(fullUrl.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }
    const json = await response.json();
    return json
}


async function fetchPOST(url: string, data: any): Promise<void> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': data.name,
                'surname': data.surname,
                'lastName': data.lastName,
                'contacts': data.contacts
            })
        })
        if (!response.ok) { throw new Error('Network response was not ok') }
    } catch (error: any) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            console.error('Request was aborted');
        } else if (error instanceof SyntaxError) {
            console.error('Failed to parse response as JSON');
        } else {
            console.error('Error:', error);
        }
    }
}

async function fetchDELETE(url: string): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            let errorMessage = `Ошибка при выполнении запроса: ${response.status}`;
            try {
                const errorResponse = await response.json();
                if (errorResponse.message) {
                    errorMessage += ` - ${errorResponse.message}`;
                }
            } catch (e) {
                console.error('Ошибка при обработке JSON', e);
            }
            throw new Error(errorMessage);
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Произошла ошибка:', error);
        return { error: error.message };
    }
}

async function fetchPATCH(url: string, data: any): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': data.name,
                'surname': data.surname,
                'lastName': data.lastname,
                'contacts': data.contacts
            })
        });

        if (response.status !== 200) {
            let errorMessage = `Ошибка при выполнении запроса: ${response.status}`;
            const errorText = await response.text();
            if (errorText) {
                errorMessage += ` - ${errorText}`;
            }
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            return result;
        } else {
            return { message: 'Успешно выполнено' };
        }
    } catch (error: any) {
        console.error('Произошла ошибка:', error);
        return { error: error.message };
    }
}

export { fetchGET, fetchPOST, fetchDELETE, fetchPATCH };