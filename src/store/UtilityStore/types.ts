import { GETTERS } from "./UtilityStore.const";

export type UtilityStoreInnerState = {
    isResetPressed: boolean;
};

export type UtilityStoreGetters = {
    [GETTERS.IS_RESET_PRESSED]: () => boolean;
}

export type UtilityStoreInjectedGetter<T extends GETTERS> = ReturnType<UtilityStoreGetters[T]>;
