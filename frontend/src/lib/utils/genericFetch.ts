export const genericFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data as T;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
