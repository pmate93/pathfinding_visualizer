
export function filterTwoDArray<T>(arr: T[][], predicateFn: (element: T) => boolean): T[] {
    const returnArr = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (predicateFn(arr[i][j])) {
                returnArr.push(arr[i][j]);
            }
        }
    }
    return returnArr;
}