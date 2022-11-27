export const NAMESPACE = 'tableStore';

export enum GETTERS {
    GET_TABLE = 'getTable',
    GET_CELL_BY_ID = 'getCellById',
}

export const ACTIONS = {
    SET_TABLE: 'setTable',
    CHANGE_WALL: 'changeWall',
};

export enum MUTATIONS {
    SET_TABLE = 'setTable',
    PUT_WALL = 'putWall',
    REMOVE_WALL = 'removeWall',
}