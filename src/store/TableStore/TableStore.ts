import { ActionContext, Module, MutationTree } from "vuex";
import { getCellById, getCellIndexesById, getFirstCellByState, getRandomBorderStyle, setCellsWithIds } from "./tableHelpers";
import { ACTIONS, GETTERS, MUTATIONS } from "./TableStore.const";
import { Cell, CellState, TableStoreGetters, TableStoreInnerState, TableStoreInjectedGetter, Mutations, TableIndexes, BorderStyle } from "./types";
import { dijkstra } from "../../commonHelpers/helpers";

const state: TableStoreInnerState = {
    table: [],
    hasWaypoint: false,
    borderStyles: [],
};

const getters: TableStoreGetters = {
    [GETTERS.GET_TABLE](innerState: TableStoreInnerState): Cell[][] {
        return innerState.table;
    },
    [GETTERS.GET_CELL_BY_ID]: (innerState: TableStoreInnerState) =>
        (cellId: number): Cell | null => getCellById(innerState.table, cellId),

    [GETTERS.GET_STARTING_CELL]: (innerState: TableStoreInnerState) =>
        (): Cell | null => getFirstCellByState(innerState.table, CellState.START),

    [GETTERS.GET_WAYPOINT]: (innerState: TableStoreInnerState) =>
        (): Cell | null => getFirstCellByState(innerState.table, CellState.WAYPOINT),

    [GETTERS.GET_END_CELL]: (innerState: TableStoreInnerState) =>
        (): Cell | null => getFirstCellByState(innerState.table, CellState.END),

    [GETTERS.GET_CELL_BY_INDEX]: (innerState: TableStoreInnerState) =>
        (rowIdx: number, colIdx: number): Cell | null => {
            if (innerState.table.length > rowIdx && innerState.table[rowIdx].length > colIdx){
                return innerState.table[rowIdx][colIdx];
            }
            return null;
        },
    [GETTERS.GET_SHORTEST_PATH_WITH_DIJKSTRA]: (innerState: TableStoreInnerState) =>
        (startCellId: number, endCellId: number): { path: TableIndexes[]; visitOrder: TableIndexes[]; } | null => {
            const startCell = getCellIndexesById(innerState.table, startCellId);
            const endCell = getCellIndexesById(innerState.table, endCellId);

            if (startCell && endCell){
                return dijkstra(innerState.table, startCell, endCell);
            }

            return null;
        },
    [GETTERS.HAS_WAYPOINT]: (innerState: TableStoreInnerState) => innerState.hasWaypoint,
    [GETTERS.GET_BORDER_STYLES]: (innerState: TableStoreInnerState) => innerState.borderStyles,
};

const mutations: MutationTree<TableStoreInnerState> & Mutations = {
    [MUTATIONS.SET_TABLE](
        innerState: TableStoreInnerState,
        payload: { rows: number; cols: number }
    ): void {
        for (let i = 0; i < payload.rows; i++) {
            innerState.table.push(Array(payload.cols));
        }
        setCellsWithIds(innerState.table);
    },
    [MUTATIONS.SET_STARTING_CELL](
        innerState,
        payload: TableIndexes,
    ): void {
        innerState.table[payload.rowIdx][payload.colIdx].state = CellState.START;
    },
    [MUTATIONS.SET_END_CELL](
        innerState,
        payload: TableIndexes,
    ): void {
        innerState.table[payload.rowIdx][payload.colIdx].state = CellState.END;
    },
    [MUTATIONS.PUT_WALL](
        innerState,
        payload: TableIndexes,
    ): void {
        innerState.table[payload.rowIdx][payload.colIdx].state = CellState.WALL;
    },
    [MUTATIONS.REMOVE_WALL](
        innerState,
        payload: TableIndexes,
    ): void {
        innerState.table[payload.rowIdx][payload.colIdx].state = CellState.EMPTY;
    },
    [MUTATIONS.SET_CELL_VISITED](
        innerState,
        payload: TableIndexes,
    ): void {
        if (innerState.table[payload.rowIdx][payload.colIdx].state !== CellState.START) {
            innerState.table[payload.rowIdx][payload.colIdx].state = CellState.VISITED;
        }
    },
    [MUTATIONS.SET_PATH](
        innerState,
        payload: TableIndexes,
    ): void {
        if (innerState.table[payload.rowIdx][payload.colIdx].state !== CellState.START) {
            innerState.table[payload.rowIdx][payload.colIdx].state = CellState.PATH;
        }
    },
    [MUTATIONS.SET_WAYPOINT](
        innerState,
        payload: {
            rowIdx: number;
            colIdx: number;
            borderStyleId: number;
        },
    ): void {
        if (innerState.table[payload.rowIdx][payload.colIdx].state !== CellState.START && !innerState.hasWaypoint) {
            innerState.table[payload.rowIdx][payload.colIdx].state = CellState.WAYPOINT;
            innerState.table[payload.rowIdx][payload.colIdx].borderStyleId = payload.borderStyleId;
        }
    },
    [MUTATIONS.ADD_BORDER_STYLE](
        innerState,
        payload: BorderStyle,
    ): void {
        innerState.borderStyles.push(payload);
    },
};

const actions = {
    [ACTIONS.SET_TABLE](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: { rows: number; cols: number }
    ): void {
        context.commit(MUTATIONS.SET_TABLE, { rows: payload.rows, cols: payload.cols });
    },
    [ACTIONS.SET_STARTING_CELL](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: TableIndexes,
    ): void {
        context.commit(MUTATIONS.SET_STARTING_CELL, { rowIdx: payload.rowIdx, colIdx: payload.colIdx });
    },
    [ACTIONS.SET_END_CELL](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: TableIndexes,
    ): void {
        context.commit(MUTATIONS.SET_END_CELL, { rowIdx: payload.rowIdx, colIdx: payload.colIdx });
    },
    [ACTIONS.SET_WAYPOINT](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: TableIndexes,
    ): void {
        const borderStyles: TableStoreInjectedGetter<GETTERS.GET_BORDER_STYLES> = context.getters[GETTERS.GET_BORDER_STYLES];

        let uniqueId = 0;
        let randomBorderStyle = getRandomBorderStyle();
        if (borderStyles.length) {
            const idFromLastElement = borderStyles[borderStyles.length - 1].id;
            uniqueId = idFromLastElement + 1;
        }

        while (borderStyles.length && borderStyles.filter(element => element.style === randomBorderStyle).length) {
            randomBorderStyle = getRandomBorderStyle();
        }

        context.commit(MUTATIONS.ADD_BORDER_STYLE, { id: uniqueId, style: randomBorderStyle });
        context.commit(MUTATIONS.SET_WAYPOINT, { rowIdx: payload.rowIdx, colIdx: payload.colIdx, borderStyleId: uniqueId });
    },
    [ACTIONS.CHANGE_WALL](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: TableIndexes,
    ): void {
        const getCellByIndex: TableStoreInjectedGetter<GETTERS.GET_CELL_BY_INDEX> = context.getters[GETTERS.GET_CELL_BY_INDEX];
        const selectedCell = getCellByIndex(payload.rowIdx, payload.colIdx);

        if (
            selectedCell?.state === CellState.WALL ||
            selectedCell?.state === CellState.EMPTY
        )
        {
            const tableIndexes = { rowIdx: payload.rowIdx, colIdx: payload.colIdx };
            selectedCell?.state === CellState.WALL ?
                context.commit(MUTATIONS.REMOVE_WALL, tableIndexes) :
                context.commit(MUTATIONS.PUT_WALL, tableIndexes);
        }
    },
    [ACTIONS.MOVE_STARTING_CELL](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: TableIndexes,
    ): void {
        const getStartCell: TableStoreInjectedGetter<GETTERS.GET_STARTING_CELL> = context.getters[GETTERS.GET_STARTING_CELL];
        const startCell = getStartCell();

        if (startCell) {
            startCell.state = CellState.EMPTY;
            context.dispatch(ACTIONS.SET_STARTING_CELL, payload);
        }
    },
    [ACTIONS.MOVE_WAYPOINT_CELL](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: {
            rowIdx: number;
            colIdx: number;
            cellId: number;
        },
    ): void {
        const getWaypointCellById: TableStoreInjectedGetter<GETTERS.GET_CELL_BY_ID> = context.getters[GETTERS.GET_CELL_BY_ID];
        const waypointCell = getWaypointCellById(payload.cellId);

        if (waypointCell) {
            waypointCell.state = CellState.EMPTY;
            context.commit(MUTATIONS.SET_WAYPOINT, { ...payload, borderStyleId: waypointCell.borderStyleId });
            delete waypointCell.borderStyleId;
        }
    },
    [ACTIONS.MOVE_END_CELL](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: TableIndexes,
    ): void {
        const getEndCell: TableStoreInjectedGetter<GETTERS.GET_END_CELL> = context.getters[GETTERS.GET_END_CELL];
        const endCell = getEndCell();

        if (endCell) {
            endCell.state = CellState.EMPTY;
            context.dispatch(ACTIONS.SET_END_CELL, payload);
        }
    },
    async [ACTIONS.VISUALIZE_PATH_AND_VISIT_ORDER](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: { path: TableIndexes[], visitOrder: TableIndexes[]},
    ): Promise<void> {
        async function visualizeVisitOrder(visitOrder: TableIndexes[]): Promise<void> {
            if (visitOrder.length === 0) {
                return Promise.resolve();
            }

            const currentCell = visitOrder.pop();
            context.commit(MUTATIONS.SET_CELL_VISITED, currentCell);
            await new Promise((resolve) => setTimeout(resolve, 10));

            return visualizeVisitOrder(visitOrder);
        }
        function visualizePath(path: TableIndexes[]): void {
            setTimeout(() => {
                const currentCell = path.pop();
                context.commit(MUTATIONS.SET_PATH, currentCell);

                if (path.length > 0) visualizePath(path);
            }, 10);
        }

        await visualizeVisitOrder(payload.visitOrder.reverse());
        visualizePath(payload.path.reverse());
    },
    async [ACTIONS.VISUALIZE_DIJKSTRA](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: { startCellId: number, endCellId: number },
    ): Promise<void> {
        const getShortestPathWithDijkstra: TableStoreInjectedGetter<GETTERS.GET_SHORTEST_PATH_WITH_DIJKSTRA> = context.getters[GETTERS.GET_SHORTEST_PATH_WITH_DIJKSTRA];
        const result = getShortestPathWithDijkstra(payload.startCellId, payload.endCellId);

        if (result) {
            context.dispatch(ACTIONS.VISUALIZE_PATH_AND_VISIT_ORDER, result);
        }
    },
};

export const tableStore: Module<TableStoreInnerState, TableStoreInnerState> = {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
};
