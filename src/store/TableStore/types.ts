import { GETTERS, MUTATIONS } from "./TableStore.const";

export type TableIndexes = {
    rowIdx: number;
    colIdx: number;
};

export type TableStoreInnerState = {
    table: Cell[][];
};

export type TableStoreGetters = {
    [GETTERS.GET_TABLE]: (innerState: TableStoreInnerState) => Cell[][];
    [GETTERS.GET_CELL_BY_ID]: (innerState: TableStoreInnerState) => (cellId: number) => Cell | null;
    [GETTERS.GET_STARTING_CELL]: (innerState: TableStoreInnerState) => () => Cell | null;
    [GETTERS.GET_CELL_BY_INDEX]: (innerState: TableStoreInnerState) => (rowIdx: number, colIdx: number) => Cell | null;
}

export type TableStoreInjectedGetter<T extends GETTERS> = ReturnType<TableStoreGetters[T]>;

export type Mutations<S = TableStoreInnerState> = {
    [MUTATIONS.SET_TABLE](state: S, payload: { rows: number; cols: number }): void;
    [MUTATIONS.PUT_WALL](state: S, payload: TableIndexes): void;
    [MUTATIONS.REMOVE_WALL](state: S, payload: TableIndexes): void;
    [MUTATIONS.SET_STARTING_CELL](state: S, payload: TableIndexes): void;
}

export type Cell = {
    id: number;
    state: CellState;
}

export enum CellState {
    EMPTY = 'empty',
    WALL = 'wall',
    START = 'start',
}