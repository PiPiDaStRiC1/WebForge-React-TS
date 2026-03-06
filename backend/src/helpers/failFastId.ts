export const getIdOrThrow = <T>(id: string | number, record: Record<string, T>): T => {
    const item = record[id];

    if (!item) {
        throw new Error(`Item with ID ${id} not found`);
    }

    return item;
};
