import { GETTERS } from "./TableStore.const";

export type TableStoreInnerState = {
    table: Cell[][];
};

export type TableStoreGetters = {
    [GETTERS.GET_TABLE]: (innerState: TableStoreInnerState) => Cell[][];
    [GETTERS.GET_CELL_BY_ID]: (innerState: TableStoreInnerState) => (cellId: number) => Cell | null;
}

export type TableStoreInjectedGetter<T extends GETTERS> = ReturnType<TableStoreGetters[T]>

export type Cell = {
    id: number;
    state: cellState;
}

export enum cellState {
    EMPTY = 'empty',
    WALL = 'wall',
}