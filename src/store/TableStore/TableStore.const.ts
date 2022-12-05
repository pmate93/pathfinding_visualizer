export const NAMESPACE = 'tableStore';

export enum GETTERS {
    GET_TABLE = 'getTable',
    GET_CELL_BY_ID = 'getCellById',
    GET_STARTING_CELL = 'getStartingCell',
    GET_END_CELL = 'getEndCell',
    GET_CELL_BY_INDEX = 'getCellByIndex',
}

export const ACTIONS = {
    SET_TABLE: 'setTable',
    CHANGE_WALL: 'changeWall',
    SET_STARTING_CELL: 'setStartingCell',
    MOVE_STARTING_CELL: 'moveStartingCell',
    MOVE_END_CELL: 'moveEndCell',
    SET_END_CELL: 'setEndCell',
};

export enum MUTATIONS {
    SET_TABLE = 'setTable',
    PUT_WALL = 'putWall',
    REMOVE_WALL = 'removeWall',
    SET_STARTING_CELL = 'setStartingCell',
    SET_END_CELL = 'setEndCell',
}