export const genericFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 409) {
                throw new Error("Такой email уже существует");
            } else {
                throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
            }
        }
        const data = await response.json();
        return data as T;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
