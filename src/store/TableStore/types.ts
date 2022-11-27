import { GETTERS, MUTATIONS } from "./TableStore.const";

export type TableStoreInnerState = {
    table: Cell[][];
};

export type TableStoreGetters = {
    [GETTERS.GET_TABLE]: (innerState: TableStoreInnerState) => Cell[][];
    [GETTERS.GET_CELL_BY_ID]: (innerState: TableStoreInnerState) => (cellId: number) => Cell | null;
}

export type TableStoreInjectedGetter<T extends GETTERS> = ReturnType<TableStoreGetters[T]>;

export type Mutations<S = TableStoreInnerState> = {
    [MUTATIONS.SET_TABLE](state: S, payload: { rows: number; cols: number }): void;
    [MUTATIONS.PUT_WALL](state: S, payload: Cell): void;
    [MUTATIONS.REMOVE_WALL](state: S, payload: Cell): void;
}

export type Cell = {
    id: number;
    state: CellState;
}

export enum CellState {
    EMPTY = 'empty',
    WALL = 'wall',
}