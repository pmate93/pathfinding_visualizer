import { defineStore } from 'pinia';
import { ACTIONS, GETTERS, NAMESPACE } from './TableStore.const';
import { Cell, CellState, TableIndexes, TableStoreInnerState } from './types';
import { getCellById, getCellIndexesById, getFirstCellByState, getRandomBorderStyle, setCellsWithIds } from './tableHelpers';
import { dijkstra } from '@/commonHelpers/helpers';
import { useUtilityStore } from '../UtilityStore';

export const useTableStore = defineStore({
    id: NAMESPACE,
    state: (): TableStoreInnerState => ({
        table: [],
        hasWaypoint: false,
        borderStyles: [],
    }),
    getters: {
        [GETTERS.GET_TABLE](): Cell[][] {
            return this.table;
        },
        [GETTERS.GET_CELL_BY_ID]: (state: TableStoreInnerState) =>
            (id: number): Cell | null => getCellById(state.table, id),

        [GETTERS.GET_STARTING_CELL]: (state: TableStoreInnerState) =>
            (): Cell | null => getFirstCellByState(state.table, CellState.START),

        [GETTERS.GET_WAYPOINT]: (state: TableStoreInnerState) =>
            (): Cell | null => getFirstCellByState(state.table, CellState.WAYPOINT),

        [GETTERS.GET_END_CELL]: (state: TableStoreInnerState) =>
            (): Cell | null => getFirstCellByState(state.table, CellState.END),

        [GETTERS.GET_CELL_BY_INDEX]: (state: TableStoreInnerState) =>
            (rowIdx: number, colIdx: number): Cell | null => {
                if (state.table.length > rowIdx && state.table[rowIdx].length > colIdx){
                    return state.table[rowIdx][colIdx];
                }
                return null;
            },

        [GETTERS.GET_SHORTEST_PATH_WITH_DIJKSTRA]: (state: TableStoreInnerState) =>
            (startCellId: number, endCellId: number): { path: TableIndexes[]; visitOrder: TableIndexes[]; } | null => {
                const startCell = getCellIndexesById(state.table, startCellId);
                const endCell = getCellIndexesById(state.table, endCellId);

                if (startCell && endCell){
                    return dijkstra(state.table, startCell, endCell);
                }

                return null;
            },

        [GETTERS.HAS_WAYPOINT]: (state: TableStoreInnerState) => state.hasWaypoint,
        [GETTERS.GET_BORDER_STYLES]: (state: TableStoreInnerState) => state.borderStyles,
    },
    actions: {
        [ACTIONS.SET_TABLE](rows: number, cols: number): void {
            this.table = [];
            for (let i = 0; i < rows; i++) {
                this.table.push(Array(cols));
            }
            setCellsWithIds(this.table);
        },
        [ACTIONS.SET_STARTING_CELL](
            payload: TableIndexes,
        ): void {
            this.table[payload.rowIdx][payload.colIdx].state = CellState.START;
        },
        [ACTIONS.SET_END_CELL](
            payload: TableIndexes,
        ): void {
            this.table[payload.rowIdx][payload.colIdx].state = CellState.END;
        },
        [ACTIONS.SET_WAYPOINT](
            payload: TableIndexes,
        ): void {
            const borderStyles = this[GETTERS.GET_BORDER_STYLES];

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
        [ACTIONS.CHANGE_WALL](
            payload: TableIndexes,
        ): void {
            const selectedCell = this.getCellByIndex(payload.rowIdx, payload.colIdx);

            if (
                selectedCell?.state === CellState.WALL ||
                selectedCell?.state === CellState.EMPTY
            )
            {
                selectedCell.state === CellState.WALL ?
                    this.table[payload.rowIdx][payload.colIdx].state = CellState.EMPTY :
                    this.table[payload.rowIdx][payload.colIdx].state = CellState.WALL;
            }
        },
        [ACTIONS.MOVE_STARTING_CELL](
            payload: TableIndexes,
        ): void {
            const startCell = this.getStartingCell();

            if (startCell) {
                startCell.state = CellState.EMPTY;
                this.table[payload.rowIdx][payload.colIdx].state = CellState.START;
            }
        },
        [ACTIONS.MOVE_WAYPOINT_CELL](
            payload: {
                rowIdx: number;
                colIdx: number;
                cellId: number;
            },
        ): void {
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
        [ACTIONS.MOVE_END_CELL](
            payload: TableIndexes,
        ): void {
            const endCell = this.getEndCell();

            if (endCell) {
                endCell.state = CellState.EMPTY;
                this.table[payload.rowIdx][payload.colIdx].state = CellState.END;
            }
        },
        async [ACTIONS.VISUALIZE_PATH_AND_VISIT_ORDER](
            path: TableIndexes[], visitOrder: TableIndexes[],
        ): Promise<void> {
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
                await new Promise((resolve) => setTimeout(resolve, 5));

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
        async [ACTIONS.VISUALIZE_DIJKSTRA](
            payload: { startCellId: number, endCellId: number },
        ): Promise<void> {
            const result = this.getShortestPathWithDijkstra(payload.startCellId, payload.endCellId);

            if (result) {
                this.visualizePathAndVisitOrder(result.path, result.visitOrder);
            }
        },
    }
});

export type TableStore = ReturnType<typeof useTableStore>;
