import { defineStore } from 'pinia';
import { type Cell, CellState, type TableIndexes, type TableStoreInnerState } from './types';
import {
    getCellById,
    getCellIndexesById,
    getFirstCellByState,
    getRandomBorderStyle,
    setCellsWithIds,
} from './tableHelpers';
import { dijkstra } from '@/commonHelpers/helpers';
import { useUtilityStore } from '../UtilityStore';

export const useTableStore = defineStore({
    id: 'table',
    state: (): TableStoreInnerState => ({
        table: [],
        hasWaypoint: false,
        borderStyles: [],
    }),
    getters: {
        getTable(): Cell[][] {
            return this.table;
        },
        getCellById:
            (state: TableStoreInnerState) =>
                (id: number): Cell | null =>
                    getCellById(state.table, id),

        getStartingCell: (state: TableStoreInnerState) => (): Cell | null =>
            getFirstCellByState(state.table, CellState.START),

        getWaypoint: (state: TableStoreInnerState) => (): Cell | null =>
            getFirstCellByState(state.table, CellState.WAYPOINT),

        getEndCell: (state: TableStoreInnerState) => (): Cell | null => getFirstCellByState(state.table, CellState.END),

        getCellByIndex:
            (state: TableStoreInnerState) =>
                (rowIdx: number, colIdx: number): Cell | null => {
                    if (state.table.length > rowIdx && state.table[rowIdx].length > colIdx) {
                        return state.table[rowIdx][colIdx];
                    }
                    return null;
                },

        getShortestPathWithDijkstra:
            (state: TableStoreInnerState) =>
                (startCellId: number, endCellId: number): { path: TableIndexes[]; visitOrder: TableIndexes[] } | null => {
                    const startCell = getCellIndexesById(state.table, startCellId);
                    const endCell = getCellIndexesById(state.table, endCellId);

                    if (startCell && endCell) {
                        return dijkstra(state.table, startCell, endCell);
                    }

                    return null;
                },

        getHasWaypoint: (state: TableStoreInnerState) => state.hasWaypoint,
        getBorderStyles: (state: TableStoreInnerState) => state.borderStyles,
    },
    actions: {
        setTable(rows: number, cols: number): void {
            this.table = [];
            for (let i = 0; i < rows; i++) {
                this.table.push(Array(cols));
            }
            setCellsWithIds(this.table);
        },
        setStartingCell(payload: TableIndexes): void {
            this.table[payload.rowIdx][payload.colIdx].state = CellState.START;
        },
        setEndCell(payload: TableIndexes): void {
            this.table[payload.rowIdx][payload.colIdx].state = CellState.END;
        },
        setWaypoint(payload: TableIndexes): void {
            const borderStyles = this.getBorderStyles;

            let uniqueId = 0;
            let randomBorderStyle = getRandomBorderStyle();
            if (borderStyles.length) {
                const idFromLastElement = borderStyles[borderStyles.length - 1].id;
                uniqueId = idFromLastElement + 1;
            }

            while (borderStyles.length && borderStyles.filter(element => element.style === randomBorderStyle).length) {
                randomBorderStyle = getRandomBorderStyle();
            }

            this.borderStyles.push({ id: uniqueId, style: randomBorderStyle });

            // set waypoint
            if (this.table[payload.rowIdx][payload.colIdx].state !== CellState.START && !this.hasWaypoint) {
                this.table[payload.rowIdx][payload.colIdx].state = CellState.WAYPOINT;
                this.table[payload.rowIdx][payload.colIdx].borderStyleId = uniqueId;
            }
        },
        changeWall(payload: TableIndexes): void {
            const selectedCell = this.getCellByIndex(payload.rowIdx, payload.colIdx);

            if (selectedCell?.state === CellState.WALL || selectedCell?.state === CellState.EMPTY) {
                selectedCell.state === CellState.WALL
                    ? (this.table[payload.rowIdx][payload.colIdx].state = CellState.EMPTY)
                    : (this.table[payload.rowIdx][payload.colIdx].state = CellState.WALL);
            }
        },
        moveStartingCell(payload: TableIndexes): void {
            const startCell = this.getStartingCell();

            if (startCell) {
                startCell.state = CellState.EMPTY;
                this.table[payload.rowIdx][payload.colIdx].state = CellState.START;
            }
        },
        moveWaypointCell(payload: { rowIdx: number; colIdx: number; cellId: number }): void {
            const waypointCell = this.getCellById(payload.cellId);

            if (waypointCell) {
                waypointCell.state = CellState.EMPTY;
                if (this.table[payload.rowIdx][payload.colIdx].state !== CellState.START && !this.hasWaypoint) {
                    this.table[payload.rowIdx][payload.colIdx].state = CellState.WAYPOINT;
                    this.table[payload.rowIdx][payload.colIdx].borderStyleId = waypointCell.borderStyleId;
                }
                delete waypointCell.borderStyleId;
            }
        },
        moveEndCell(payload: TableIndexes): void {
            const endCell = this.getEndCell();

            if (endCell) {
                endCell.state = CellState.EMPTY;
                this.table[payload.rowIdx][payload.colIdx].state = CellState.END;
            }
        },
        async visualizePathAndVisitOrder(path: TableIndexes[], visitOrder: TableIndexes[]): Promise<void> {
            const utilityStore = useUtilityStore();
            async function visualizeVisitOrder(visitOrder: TableIndexes[], table: Cell[][]): Promise<boolean> {
                if (utilityStore.getIsResetPressed) {
                    return false;
                }
                if (visitOrder.length === 0) {
                    return true;
                }

                const currentCell = visitOrder.pop();
                if (currentCell && table[currentCell.rowIdx][currentCell.colIdx].state !== CellState.START) {
                    table[currentCell.rowIdx][currentCell.colIdx].state = CellState.VISITED;
                }
                await new Promise(resolve => setTimeout(resolve, 5));

                return visualizeVisitOrder(visitOrder, table);
            }
            function visualizePath(path: TableIndexes[], table: Cell[][]): void {
                setTimeout(() => {
                    if (utilityStore.getIsResetPressed) {
                        return;
                    }

                    const currentCell = path.pop();
                    if (currentCell && table[currentCell.rowIdx][currentCell.colIdx].state !== CellState.START) {
                        table[currentCell.rowIdx][currentCell.colIdx].state = CellState.PATH;
                    }

                    if (path.length > 0) visualizePath(path, table);
                }, 10);
            }

            const isResetNotPressed = await visualizeVisitOrder(visitOrder.reverse(), this.table);
            if (isResetNotPressed) {
                visualizePath(path.reverse(), this.table);
            }
        },
        async visualizeDijkstra(payload: { startCellId: number; endCellId: number }): Promise<void> {
            const result = this.getShortestPathWithDijkstra(payload.startCellId, payload.endCellId);

            if (result) {
                this.visualizePathAndVisitOrder(result.path, result.visitOrder);
            }
        },
    },
});

export type TableStore = ReturnType<typeof useTableStore>;
