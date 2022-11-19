import { GETTERS } from "./TableStore.const";

export type TableStoreInnerState = {
    table: string[][];
};

export type TableStoreGetters = {
    [GETTERS.GET_TABLE]: (innerState: TableStoreInnerState) => string[][];
}

export enum cellState {
    EMPTY = 'empty',
}