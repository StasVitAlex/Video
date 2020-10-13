export function updateObject<T> (oldObject: T, newValues: any) {
    return { ...oldObject, ...newValues } as T;
}

export function updateItemInArray2<T> (array: Array<T>, itemId: any,updateItemCallback: (item: T) => T, idField = 'id'): Array<T> {
    const updatedItems = array.map((item: any) => {
        if (item[idField] !== itemId) {
            return item;
        }

        const updatedItem = updateItemCallback(item);
        return updatedItem;
    });

    return updatedItems;
};


export function addItemInArray<T>(array: Array<T>, item: T, begin = false): Array<T> {
    return begin ?
        [item, ...array] :
        [...array, item];
};

export function deleteItemFromArray<T extends { id: any }> (array: Array<T>, itemId: any): Array<T> {
    return array.filter((item) => item.id !== itemId);
}