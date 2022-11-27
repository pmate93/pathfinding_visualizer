import { ActionContext, Module, MutationTree } from "vuex";
import { getCellById, setCellsWithIds } from "./tableHelpers";
import { ACTIONS, GETTERS, MUTATIONS } from "./TableStore.const";
import { Cell, CellState, TableStoreGetters, TableStoreInnerState, TableStoreInjectedGetter, Mutations } from "./types";

const state: TableStoreInnerState = {
    table: [],
};

const getters: TableStoreGetters = {
    [GETTERS.GET_TABLE](innerState: TableStoreInnerState): Cell[][] {
        return innerState.table;
    },
    [GETTERS.GET_CELL_BY_ID]: (innerState: TableStoreInnerState) =>
        (cellId: number): Cell | null => getCellById(innerState.table, cellId)
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
    [MUTATIONS.PUT_WALL](
        innerState,
        selectedCell: Cell,
    ): void {
        selectedCell.state = CellState.WALL;
    },
    [MUTATIONS.REMOVE_WALL](
        innerState,
        selectedCell: Cell,
    ): void {
        selectedCell.state = CellState.EMPTY;
    },
};

const actions = {
    [ACTIONS.SET_TABLE](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: { rows: number; cols: number }
    ): void {
        context.commit(MUTATIONS.SET_TABLE, { rows: payload.rows, cols: payload.cols });
    },
    [ACTIONS.CHANGE_WALL](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        cellId: number,
    ): void {
        const getCellById: TableStoreInjectedGetter<GETTERS.GET_CELL_BY_ID> = context.getters[GETTERS.GET_CELL_BY_ID];
        const selectedCell = getCellById(cellId);

        if (selectedCell){
            selectedCell.state === CellState.WALL ?
                context.commit(MUTATIONS.REMOVE_WALL, selectedCell) :
                context.commit(MUTATIONS.PUT_WALL, selectedCell);
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
