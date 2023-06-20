<template>
    <app-header @on-reset="onReset" />
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import { mapStores } from 'pinia';
import { useUtilityStore } from './store';
import { useTableStore } from './store/TableStore';

const defaultRows = 35;
const defaultCols = 50;

export default defineComponent({
    name: 'app',
    components: { AppHeader },

    computed: {
        ...mapStores(useTableStore, useUtilityStore),
    },
    methods: {
        setInitialState(): void {
            this.tableStore.setTable(defaultRows, defaultCols);
            this.tableStore.setStartingCell({ rowIdx: 20, colIdx: 20 });
            this.tableStore.setEndCell({ rowIdx: 30, colIdx: 30 });
        },
        onReset(): void {
            this.utilityStore.setResetValue(true);
            this.setInitialState();
        },
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
    display: inline;
}
body {
    margin: 0px;
}
</style>
