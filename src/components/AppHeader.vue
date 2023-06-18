<template>
    <nav>
        Pathfinding Visualizer
        <header-button label="Start" @click="start" />
        <header-button label="Add waypoint" @click="addWaypoint" />
        <header-button label="Reset" @click="$emit('OnReset')" />
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useTableStore, useUtilityStore } from '@/store';
import HeaderButton from './HeaderButton.vue';

export default defineComponent({
    components: { HeaderButton },
    name: 'app-header',

    computed: {
        ...mapStores(useTableStore, useUtilityStore),
    },

    methods: {
        start(): void {
            this.utilityStore.setResetValue(false);

            const startCellId = this.tableStore.getStartingCell()?.id;
            const endCellId = this.tableStore.getEndCell()?.id;
            if (startCellId && endCellId) {
                this.tableStore.visualizeDijkstra({ startCellId, endCellId });
            }
        },
        addWaypoint(): void {
            this.tableStore.setWaypoint({ rowIdx: 25, colIdx: 25 });
        },
    },
});
</script>

<style scoped>
nav {
    padding: 20px;
    background-color: #2c3e50;
    color: white;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
