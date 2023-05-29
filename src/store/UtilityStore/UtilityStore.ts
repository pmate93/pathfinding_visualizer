import { defineStore } from 'pinia';
import { ACTIONS, GETTERS, NAMESPACE } from './UtilityStore.const';
import { UtilityStoreInnerState } from './types';

export const useUtilityStore = defineStore({
    id: NAMESPACE,
    state: (): UtilityStoreInnerState => ({
        isResetPressed: false,
    }),
    getters: {
        [GETTERS.IS_RESET_PRESSED]: (state: UtilityStoreInnerState): boolean => state.isResetPressed
    },
    actions: {
        [ACTIONS.SET_RESET_VALUE](value: boolean): void {
            this.isResetPressed = value;
        },
    }
});

export type UtilityStore = ReturnType<typeof useUtilityStore>;
