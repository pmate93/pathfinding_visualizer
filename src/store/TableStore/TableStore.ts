import { ActionContext, Module, MutationTree } from "vuex";
import { ACTIONS, GETTERS, MUTATIONS } from "./TableStore.const";
import { cellState, TableStoreGetters, TableStoreInnerState } from "./types";

const state: TableStoreInnerState = {
    table: [],
};

const getters: TableStoreGetters = {
    [GETTERS.GET_TABLE](innerState: TableStoreInnerState): string[][] {
        return innerState.table;
    },
};

const mutations: MutationTree<TableStoreInnerState> = {
    [MUTATIONS.SET_TABLE](
        innerState: TableStoreInnerState,
        payload: { rows: number; cols: number }
    ): void {
        innerState.table = Array(payload.rows).fill(Array(payload.cols).fill(cellState.EMPTY));
    },
};

const actions = {
    [ACTIONS.SET_TABLE](
        context: ActionContext<TableStoreInnerState, TableStoreInnerState>,
        payload: { rows: number; cols: number }
    ): void {
        context.commit(MUTATIONS.SET_TABLE, { rows: payload.rows, cols: payload.cols });
    },
};

export const tableStore: Module<TableStoreInnerState, TableStoreInnerState> = {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
};
