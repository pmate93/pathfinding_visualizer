<template>
    <app-header @on-reset="onReset" />
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import TABLE from "@/store/UserStore";
import { useTableStore } from '@/store/UserStore/TableStore';
import { mapActions, mapState } from 'pinia';
import { useUtilityStore, UTILITY } from "./store";

const defaultRows = 35;
const defaultCols = 50;

export default defineComponent({
    name: 'app',
    components: { AppHeader },

    computed: {
        ...mapState(useTableStore, {
            getTable: TABLE.GETTERS.GET_TABLE,
        }),
    },
    methods: {
        ...mapActions(useTableStore, {
            setTable: TABLE.ACTIONS.SET_TABLE,
            setStartingCell: TABLE.ACTIONS.SET_STARTING_CELL,
            setEndCell: TABLE.ACTIONS.SET_END_CELL,
        }),
        ...mapActions(useUtilityStore, {
            setResetValue: UTILITY.ACTIONS.SET_RESET_VALUE,
        }),

        setInitialState(): void {
            this.setTable(defaultRows, defaultCols);
            this.setStartingCell({ rowIdx: 20, colIdx: 20 });
            this.setEndCell({ rowIdx: 30, colIdx: 30 });
        },
        onReset(): void {
            this.setResetValue(true);
            this.setInitialState();
        }
    },

    created() {
        this.setInitialState();
    },
});
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body {
    margin: 0px;
}
</style>
