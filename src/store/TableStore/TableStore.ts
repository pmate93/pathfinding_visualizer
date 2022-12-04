import { ActionContext, Module, MutationTree } from "vuex";
import { getCellById, getFirstCellByState, setCellsWithIds } from "./tableHelpers";
import { ACTIONS, GETTERS, MUTATIONS } from "./TableStore.const";
import { Cell, CellState, TableStoreGetters, TableStoreInnerState, TableStoreInjectedGetter, Mutations, TableIndexes } from "./types";

const state: TableStoreInnerState = {
    table: [],
};

const getters: TableStoreGetters = {
    [GETTERS.GET_TABLE](innerState: TableStoreInnerState): Cell[][] {
        return innerState.table;
    },

    [GETTERS.GET_CELL_BY_ID]: (innerState: TableStoreInnerState) =>
        (cellId: number): Cell | null => getCellById(innerState.table, cellId),

    [GETTERS.GET_STARTING_CELL]: (innerState: TableStoreInnerState) =>
        (): Cell | null => getFirstCellByState(innerState.table, CellState.START),

    [GETTERS.GET_CELL_BY_INDEX]: (innerState: TableStoreInnerState) =>
        (rowIdx: number, colIdx: number): Cell | null => {
            if (innerState.table.length > rowIdx && innerState.table[rowIdx].length > colIdx){
                return innerState.table[rowIdx][colIdx];
            }
            return null;
        }
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
    [ACTIONS.CHANGE_WALL](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: TableIndexes,
    ): void {
        const getCellByIndex: TableStoreInjectedGetter<GETTERS.GET_CELL_BY_INDEX> = context.getters[GETTERS.GET_CELL_BY_INDEX];
        const selectedCell = getCellByIndex(payload.rowIdx, payload.colIdx);

        if (selectedCell?.state !== CellState.START){
            const tableIndexes = { rowIdx: payload.rowIdx, colIdx: payload.colIdx };
            selectedCell?.state === CellState.WALL ?
                context.commit(MUTATIONS.REMOVE_WALL, tableIndexes) :
                context.commit(MUTATIONS.PUT_WALL, tableIndexes);
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
