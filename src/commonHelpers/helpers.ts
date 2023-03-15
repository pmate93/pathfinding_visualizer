import { Cell, CellState, TableIndexes } from "@/store/TableStore/types";

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

type Predecessor = { [key: string]: TableIndexes | null };

export function dijkstra(grid: Cell[][], start: TableIndexes, end: TableIndexes): { path: TableIndexes[], visitOrder: TableIndexes[] } | null {
    const visited: { [key: string]: boolean } = {};
    const distances: { [key: string]: number } = {};
    const predecessors: Predecessor = {};
    const queue: TableIndexes[] = [];
    const visitOrder: TableIndexes[] = [];

    const getKey = ({ rowIdx, colIdx }: TableIndexes) => `${rowIdx},${colIdx}`;

    // Initialize the distances with Infinity and the start cell with 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell: TableIndexes = { rowIdx: i, colIdx: j };
            const key = getKey(cell);
            distances[key] = Infinity;
            predecessors[key] = null;
            visited[key] = false;
            if (i === start.rowIdx && j === start.colIdx) {
                distances[key] = 0;
                queue.unshift(cell);
            }
        }
    }

    while (queue.length > 0) {
        const current = queue.pop()!;

        if (!visited[getKey(current)]) {
            visited[getKey(current)] = true;
            visitOrder.push(current);

            const neighbors = getNeighbors(current, grid);
            for (const neighbor of neighbors) {
                const key = getKey(neighbor);
                if (!visited[key]) {
                    const newDistance = distances[getKey(current)] + /* grid[neighbor.rowIdx][neighbor.colIdx] */ 1; // weighting
                    if (newDistance < distances[key]) {
                        distances[key] = newDistance;
                        predecessors[key] = current;
                        if (neighbor.rowIdx === end.rowIdx && neighbor.colIdx === end.colIdx) {
                            return { path: getPath(predecessors, start, end), visitOrder };
                        }
                    }
                    if (!queue.includes(neighbor)) {
                        queue.unshift(neighbor);
                    }
                }
            }
        }
    }

    return null;
}

function getNeighbors(cell: TableIndexes, grid: Cell[][]): TableIndexes[] {
    const neighbors: TableIndexes[] = [];
    const { rowIdx, colIdx } = cell;
    const numRows = grid.length;
    const numCols = grid[0].length;
    if (rowIdx > 0) {
        neighbors.push({ rowIdx: rowIdx - 1, colIdx });
    }
    if (rowIdx < numRows - 1) {
        neighbors.push({ rowIdx: rowIdx + 1, colIdx });
    }
    if (colIdx > 0) {
        neighbors.push({ rowIdx, colIdx: colIdx - 1 });
    }
    if (colIdx < numCols - 1) {
        neighbors.push({ rowIdx, colIdx: colIdx + 1 });
    }
    return neighbors;
}

function getPath(predecessors: Predecessor, start: TableIndexes, end: TableIndexes): TableIndexes[] {
    const path: TableIndexes[] = [];
    let current: TableIndexes | null = end;
    while (current) {
        path.unshift(current);
        current = predecessors[getKey(current)];
    }
    return path;
}

function getKey(cell: TableIndexes): string {
    return `${cell.rowIdx},${cell.colIdx}`;
}