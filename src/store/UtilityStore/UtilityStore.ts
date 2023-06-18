import { defineStore } from 'pinia';
import { type UtilityStoreInnerState } from './types';

export const useUtilityStore = defineStore({
    id: 'utility',
    state: (): UtilityStoreInnerState => ({
        isResetPressed: false,
    }),
    getters: {
        getIsResetPressed: (state: UtilityStoreInnerState): boolean => state.isResetPressed,
    },
    actions: {
        setResetValue(value: boolean): void {
            this.isResetPressed = value;
        },
    },
});

export type UtilityStore = ReturnType<typeof useUtilityStore>;
