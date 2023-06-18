export type TableIndexes = {
    rowIdx: number;
    colIdx: number;
};

export type TableStoreInnerState = {
    table: Cell[][];
    hasWaypoint: boolean;
    borderStyles: BorderStyle[];
};

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