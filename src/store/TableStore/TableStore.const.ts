export const NAMESPACE = 'tableStore';

export enum GETTERS {
    GET_TABLE = 'getTable',
    GET_CELL_BY_ID = 'getCellById',
    GET_STARTING_CELL = 'getStartingCell',
    GET_END_CELL = 'getEndCell',
    GET_CELL_BY_INDEX = 'getCellByIndex',
    GET_SHORTEST_PATH_WITH_DIJKSTRA = 'getShortestPathWithDijkstra',
    HAS_WAYPOINT = 'hasWaypoint',
    GET_WAYPOINT = 'getWaypoint',
    GET_BORDER_STYLES = 'getBorderStyles',
}

export const ACTIONS = {
    SET_TABLE: 'setTable',
    CHANGE_WALL: 'changeWall',
    SET_STARTING_CELL: 'setStartingCell',
    MOVE_STARTING_CELL: 'moveStartingCell',
    MOVE_WAYPOINT_CELL: 'moveWaypointCell',
    MOVE_END_CELL: 'moveEndCell',
    SET_END_CELL: 'setEndCell',
    SET_WAYPOINT: 'setWaypoint',
    VISUALIZE_DIJKSTRA: 'visualizeDijkstra',
    VISUALIZE_PATH_AND_VISIT_ORDER: 'visualizePathAndVisitOrder',
};

export enum MUTATIONS {
    SET_TABLE = 'setTable',
    PUT_WALL = 'putWall',
    REMOVE_WALL = 'removeWall',
    SET_STARTING_CELL = 'setStartingCell',
    SET_END_CELL = 'setEndCell',
    SET_CELL_VISITED = 'setCellVisited',
    SET_PATH = 'setPath',
    SET_WAYPOINT = 'setWaypoint',
    ADD_BORDER_STYLE = 'addBorderStyle',
}