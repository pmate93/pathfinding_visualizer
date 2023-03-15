import { Cell, CellState, TableIndexes } from "./types";

// TODO: rename function
export function setCellsWithIds(table: Cell[][]): void {
    let uniqueId = 0;
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            table[i][j] = {
                id: uniqueId++,
                state: CellState.EMPTY,
            };
        }
    }
}
export function getCellById(table: Cell[][], cellId: number): Cell | null {
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            if (cellId === table[i][j].id) {
                return table[i][j];
            }
        }
    }
    return null;
}

export function getCellIndexesById(table: Cell[][], cellId: number): TableIndexes | null {
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            if (cellId === table[i][j].id) {
                return {
                    rowIdx: i,
                    colIdx: j,
                };
            }
        }
    }
    return null;
}
export function getFirstCellByState(table: Cell[][], cellstate: CellState): Cell | null {
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            if (cellstate === table[i][j].state) {
                return table[i][j];
            }
        }
    }
    return null;
}
export function isStartCellSelected(selectedCell: Cell): boolean {
    return selectedCell.state === CellState.START;
}