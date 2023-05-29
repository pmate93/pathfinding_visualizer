import { GETTERS } from "./TableStore.const";

export type TableIndexes = {
    rowIdx: number;
    colIdx: number;
};

export type TableStoreInnerState = {
    table: Cell[][];
    hasWaypoint: boolean;
    borderStyles: BorderStyle[];
};

export type TableStoreGetters = {
    [GETTERS.GET_TABLE]: () => Cell[][];
    [GETTERS.GET_CELL_BY_ID]: (innerState: TableStoreInnerState) => (cellId: number) => Cell | null;
    [GETTERS.HAS_WAYPOINT]: (innerState: TableStoreInnerState) => boolean;
    [GETTERS.GET_WAYPOINT]: (innerState: TableStoreInnerState) => () => Cell | null;
    [GETTERS.GET_STARTING_CELL]: (innerState: TableStoreInnerState) => () => Cell | null;
    [GETTERS.GET_END_CELL]: (innerState: TableStoreInnerState) => () => Cell | null;
    [GETTERS.GET_CELL_BY_INDEX]: (innerState: TableStoreInnerState) => (rowIdx: number, colIdx: number) => Cell | null;
    [GETTERS.GET_SHORTEST_PATH_WITH_DIJKSTRA]: (innerState: TableStoreInnerState) => (startCellId: number, endCellId: number) => { path: TableIndexes[]; visitOrder: TableIndexes[]; } | null;
    [GETTERS.GET_BORDER_STYLES]: (innerState: TableStoreInnerState) => BorderStyle[];
}

export type TableStoreInjectedGetter<T extends GETTERS> = ReturnType<TableStoreGetters[T]>;

export type Cell = {
    id: number;
    state: CellState;
    borderStyleId?: number,
}

export type BorderStyle = {
    id: number;
    style: string;
}

export enum CellState {
    EMPTY = 'empty',
    WALL = 'wall',
    START = 'start',
    END = 'end',
    VISITED = 'visited',
    PATH = 'path',
    WAYPOINT = 'waypoint',
}