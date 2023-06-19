import { expect, test } from 'vitest';
import { filterTwoDArray } from './helpers';

const isEven = (n: number) => n % 2 === 0;

test('filterTwoDArray should filter elements correctly', () => {
    const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];

    const filteredArr = filterTwoDArray(arr, isEven);

    expect(filteredArr).toEqual([2, 4, 6, 8]);
});

test('filterTwoDArray should handle empty arrays', () => {
    const arr: number[][] = [];

    const filteredArr = filterTwoDArray(arr, isEven);

    expect(filteredArr).toEqual([]);
});