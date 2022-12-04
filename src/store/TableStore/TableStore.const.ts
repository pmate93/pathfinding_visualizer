export const NAMESPACE = 'tableStore';

export enum GETTERS {
    GET_TABLE = 'getTable',
    GET_CELL_BY_ID = 'getCellById',
    GET_STARTING_CELL = 'getStartingCell',
    GET_CELL_BY_INDEX = 'getCellByIndex',
}

export const ACTIONS = {
    SET_TABLE: 'setTable',
    CHANGE_WALL: 'changeWall',
    SET_STARTING_CELL: 'setStartingCell',
    MOVE_STARTING_CELL: 'moveStartingCell',
};

export enum MUTATIONS {
    SET_TABLE = 'setTable',
    PUT_WALL = 'putWall',
    REMOVE_WALL = 'removeWall',
    SET_STARTING_CELL = 'setStartingCell',
}